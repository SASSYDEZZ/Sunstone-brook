import { useState, useEffect, useCallback } from 'react';
import { GameState, Position, InventorySlot, Quest, NPC, QuestObjective } from '../types';
import { ITEMS } from '../data/items';
import { NPCS } from '../data/npcs';
import { QUESTS } from '../data/quests';
import { saveGame, loadGame } from '../utils/storage';
import { findPath } from '../utils/pathfinding';

const INITIAL_STATE: GameState = {
  player: {
    position: { x: 100, y: 100 },
    inventory: [],
    maxInventorySize: 20,
  },
  npcs: NPCS.map(npc => ({ ...npc })),
  quests: QUESTS.map(quest => ({ ...quest })),
  time: {
    hour: 8,
    day: 1,
    season: 'spring',
  },
};

export function useGameState() {
  const [gameState, setGameState] = useState<GameState>(INITIAL_STATE);
  const [loaded, setLoaded] = useState(false);

  // Load game on mount
  useEffect(() => {
    async function loadSavedGame() {
      const savedState = await loadGame();
      if (savedState) {
        setGameState(savedState);
      }
      setLoaded(true);
    }
    loadSavedGame();
  }, []);

  // Auto-save every 30 seconds
  useEffect(() => {
    if (!loaded) return;

    const interval = setInterval(() => {
      saveGame(gameState);
    }, 30000);

    return () => clearInterval(interval);
  }, [gameState, loaded]);

  // Move player
  const movePlayer = useCallback((position: Position) => {
    setGameState((prev) => ({
      ...prev,
      player: { ...prev.player, position },
    }));
  }, []);

  // Add item to inventory
  const addItem = useCallback((itemId: string, quantity: number = 1) => {
    setGameState((prev) => {
      const item = ITEMS[itemId];
      if (!item) return prev;

      const inventory = [...prev.player.inventory];
      const existingSlot = inventory.find((slot) => slot.item.id === itemId);

      if (existingSlot && item.stackable) {
        existingSlot.quantity += quantity;
      } else if (inventory.length < prev.player.maxInventorySize) {
        inventory.push({ item, quantity });
      } else {
        return prev; // Inventory full
      }

      // Update quest objectives
      const updatedQuests = prev.quests.map((quest) => {
        if (quest.completed) return quest;
        const updatedObjectives = quest.objectives.map((obj) => {
          if (obj.type === 'collect' && obj.target === itemId) {
            return { ...obj, current: Math.min(obj.current + quantity, obj.required) };
          }
          return obj;
        });
        const completed = updatedObjectives.every((obj) => obj.current >= obj.required);
        return { ...quest, objectives: updatedObjectives, completed };
      });

      return {
        ...prev,
        player: { ...prev.player, inventory },
        quests: updatedQuests,
      };
    });
  }, []);

  // Remove item from inventory
  const removeItem = useCallback((itemId: string, quantity: number = 1) => {
    setGameState((prev) => {
      const inventory = [...prev.player.inventory];
      const slotIndex = inventory.findIndex((slot) => slot.item.id === itemId);

      if (slotIndex === -1) return prev;

      inventory[slotIndex].quantity -= quantity;
      if (inventory[slotIndex].quantity <= 0) {
        inventory.splice(slotIndex, 1);
      }

      return {
        ...prev,
        player: { ...prev.player, inventory },
      };
    });
  }, []);

  // Talk to NPC
  const talkToNPC = useCallback((npcId: string) => {
    setGameState((prev) => {
      const updatedQuests = prev.quests.map((quest) => {
        if (quest.completed) return quest;
        const updatedObjectives = quest.objectives.map((obj) => {
          if (obj.type === 'talk' && obj.target === npcId) {
            return { ...obj, current: 1 };
          }
          return obj;
        });
        const completed = updatedObjectives.every((obj) => obj.current >= obj.required);
        return { ...quest, objectives: updatedObjectives, completed };
      });

      return { ...prev, quests: updatedQuests };
    });
  }, []);

  // Update NPC affinity
  const updateAffinity = useCallback((npcId: string, change: number) => {
    setGameState((prev) => ({
      ...prev,
      npcs: prev.npcs.map((npc) =>
        npc.id === npcId ? { ...npc, affinity: npc.affinity + change } : npc
      ),
    }));
  }, []);

  // Start quest
  const startQuest = useCallback((questId: string) => {
    // Quest is already in the list, just mark it as active
    console.log(`Quest ${questId} started`);
  }, []);

  // Advance time
  const advanceTime = useCallback(() => {
    setGameState((prev) => {
      const newHour = (prev.time.hour + 1) % 24;
      const newDay = newHour === 0 ? prev.time.day + 1 : prev.time.day;

      // Update NPC positions based on schedule
      const updatedNPCs = prev.npcs.map((npc) => {
        if (!npc.schedule) return npc;
        
        const currentSchedule = [...npc.schedule]
          .reverse()
          .find((s) => newHour >= s.time);
        
        if (currentSchedule && currentSchedule.destination) {
          // Generate path to destination
          const path = findPath(npc.position, currentSchedule.destination);
          return { ...npc, path };
        }
        
        return npc;
      });

      return {
        ...prev,
        time: { ...prev.time, hour: newHour, day: newDay },
        npcs: updatedNPCs,
      };
    });
  }, []);

  // Update NPC positions along their paths
  const updateNPCPositions = useCallback(() => {
    setGameState((prev) => ({
      ...prev,
      npcs: prev.npcs.map((npc) => {
        if (!npc.path || npc.path.length === 0) return npc;
        
        const nextPosition = npc.path[0];
        const remainingPath = npc.path.slice(1);
        
        return {
          ...npc,
          position: nextPosition,
          path: remainingPath,
        };
      }),
    }));
  }, []);

  // Manual save
  const save = useCallback(() => {
    return saveGame(gameState);
  }, [gameState]);

  return {
    gameState,
    loaded,
    movePlayer,
    addItem,
    removeItem,
    talkToNPC,
    updateAffinity,
    startQuest,
    advanceTime,
    updateNPCPositions,
    save,
  };
}
