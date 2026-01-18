import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Dimensions,
  Platform,
} from 'react-native';
import { useGameState } from '../hooks/useGameState';
import { Inventory } from '../components/Inventory';
import { DialogueBox } from '../components/DialogueBox';
import { QuestLog } from '../components/QuestLog';
import { GameHUD } from '../components/GameHUD';
import { NPC, DialogueNode, Position } from '../types';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const GAME_WIDTH = Math.min(SCREEN_WIDTH, 600);
const GAME_HEIGHT = Math.min(SCREEN_HEIGHT - 100, 500);

export function GameScreen() {
  const {
    gameState,
    loaded,
    movePlayer,
    addItem,
    talkToNPC,
    updateAffinity,
    startQuest,
    advanceTime,
    updateNPCPositions,
    save,
  } = useGameState();

  const [inventoryVisible, setInventoryVisible] = useState(false);
  const [questLogVisible, setQuestLogVisible] = useState(false);
  const [dialogueVisible, setDialogueVisible] = useState(false);
  const [currentNPC, setCurrentNPC] = useState<NPC | null>(null);
  const [currentDialogue, setCurrentDialogue] = useState<DialogueNode | null>(null);

  // Time advancement
  useEffect(() => {
    const timeInterval = setInterval(() => {
      advanceTime();
    }, 20000); // Advance 1 hour every 20 seconds

    return () => clearInterval(timeInterval);
  }, [advanceTime]);

  // NPC movement
  useEffect(() => {
    const npcInterval = setInterval(() => {
      updateNPCPositions();
    }, 500); // Update NPC positions every 500ms

    return () => clearInterval(npcInterval);
  }, [updateNPCPositions]);

  if (!loaded) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading Sunstone Brook...</Text>
      </View>
    );
  }

  const handleGameTap = (event: any) => {
    const { locationX, locationY } = event.nativeEvent;
    
    // Check if tapping on an NPC (increased radius for better mobile interaction)
    const tappedNPC = gameState.npcs.find((npc) => {
      const distance = Math.sqrt(
        Math.pow(npc.position.x - locationX, 2) + Math.pow(npc.position.y - locationY, 2)
      );
      return distance < 50;
    });

    if (tappedNPC) {
      handleNPCInteraction(tappedNPC);
    } else {
      // Move player
      movePlayer({ x: locationX, y: locationY });
    }
  };

  const handleNPCInteraction = (npc: NPC) => {
    setCurrentNPC(npc);
    setCurrentDialogue(npc.dialogue[0]);
    setDialogueVisible(true);
    talkToNPC(npc.id);
  };

  const handleDialogueChoice = (nextId: string, affinityChange?: number) => {
    if (!currentNPC) return;

    if (affinityChange && currentNPC) {
      updateAffinity(currentNPC.id, affinityChange);
    }

    if (nextId === 'end') {
      setDialogueVisible(false);
      setCurrentNPC(null);
      setCurrentDialogue(null);
      return;
    }

    const nextNode = currentNPC.dialogue.find((node) => node.id === nextId);
    if (nextNode) {
      if (nextNode.questTrigger) {
        startQuest(nextNode.questTrigger);
      }
      setCurrentDialogue(nextNode);
    }
  };

  const handleItemPickup = (itemId: string) => {
    addItem(itemId, 1);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.gameArea}
        onPress={handleGameTap}
      >
        <View style={styles.world}>
          {/* Ground */}
          <View style={styles.ground} />
          
          {/* Item spawners (simple representation) */}
          <TouchableOpacity
            style={[styles.item, { left: 250, top: 100 }]}
            onPress={() => handleItemPickup('apple')}
          >
            <Text style={styles.itemIcon}>🍎</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.item, { left: 350, top: 150 }]}
            onPress={() => handleItemPickup('flower')}
          >
            <Text style={styles.itemIcon}>🌸</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.item, { left: 450, top: 250 }]}
            onPress={() => handleItemPickup('wood')}
          >
            <Text style={styles.itemIcon}>🪵</Text>
          </TouchableOpacity>
          
          {/* NPCs */}
          {gameState.npcs.map((npc) => (
            <View
              key={npc.id}
              style={[
                styles.npc,
                { left: npc.position.x - 20, top: npc.position.y - 20 },
              ]}
            >
              <Text style={styles.npcIcon}>🧍</Text>
              <Text style={styles.npcName}>{npc.name}</Text>
              {npc.affinity > 0 && (
                <Text style={styles.affinity}>❤️ {npc.affinity}</Text>
              )}
            </View>
          ))}
          
          {/* Player */}
          <View
            style={[
              styles.player,
              {
                left: gameState.player.position.x - 15,
                top: gameState.player.position.y - 15,
              },
            ]}
          >
            <Text style={styles.playerIcon}>🧑</Text>
          </View>
        </View>
      </TouchableOpacity>
      
      <GameHUD
        time={gameState.time}
        onInventoryPress={() => setInventoryVisible(true)}
        onQuestPress={() => setQuestLogVisible(true)}
      />
      
      <Inventory
        inventory={gameState.player.inventory}
        visible={inventoryVisible}
        onClose={() => setInventoryVisible(false)}
      />
      
      <QuestLog
        quests={gameState.quests}
        visible={questLogVisible}
        onClose={() => setQuestLogVisible(false)}
      />
      
      <DialogueBox
        visible={dialogueVisible}
        currentNode={currentDialogue}
        onChoice={handleDialogueChoice}
        onClose={() => {
          setDialogueVisible(false);
          setCurrentNPC(null);
          setCurrentDialogue(null);
        }}
      />
      
      {/* Quick save button */}
      <TouchableOpacity style={styles.saveButton} onPress={save}>
        <Text style={styles.saveButtonText}>💾</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#87CEEB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#87CEEB',
  },
  loadingText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  gameArea: {
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
  },
  world: {
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
    position: 'relative',
    overflow: 'hidden',
  },
  ground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#90EE90',
  },
  player: {
    position: 'absolute',
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playerIcon: {
    fontSize: 30,
  },
  npc: {
    position: 'absolute',
    alignItems: 'center',
    width: 100,
    padding: 5,
  },
  npcIcon: {
    fontSize: 32,
  },
  npcName: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#333',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
    marginTop: 2,
  },
  affinity: {
    fontSize: 8,
    color: '#e74c3c',
  },
  item: {
    position: 'absolute',
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemIcon: {
    fontSize: 24,
  },
  saveButton: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#4a90e2',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  saveButtonText: {
    fontSize: 24,
  },
});
