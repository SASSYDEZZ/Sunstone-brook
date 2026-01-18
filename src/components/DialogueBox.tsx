import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { DialogueNode, DialogueChoice } from '../types';

interface DialogueBoxProps {
  visible: boolean;
  currentNode: DialogueNode | null;
  onChoice: (nextId: string, affinityChange?: number) => void;
  onClose: () => void;
}

export function DialogueBox({ visible, currentNode, onChoice, onClose }: DialogueBoxProps) {
  if (!currentNode) return null;

  const hasChoices = currentNode.choices && currentNode.choices.length > 0;

  const handleChoice = (choice: DialogueChoice) => {
    onChoice(choice.nextId, choice.affinityChange);
  };

  const handleContinue = () => {
    if (currentNode.nextId) {
      onChoice(currentNode.nextId);
    } else {
      onClose();
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.dialogueContainer}>
          <View style={styles.header}>
            <Text style={styles.speaker}>{currentNode.speaker}</Text>
          </View>
          
          <Text style={styles.dialogueText}>{currentNode.text}</Text>
          
          {hasChoices ? (
            <View style={styles.choicesContainer}>
              {currentNode.choices!.map((choice, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.choiceButton}
                  onPress={() => handleChoice(choice)}
                >
                  <Text style={styles.choiceText}>{choice.text}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
              <Text style={styles.continueText}>
                {currentNode.nextId ? 'Continue →' : 'Close'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  dialogueContainer: {
    width: '100%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  header: {
    marginBottom: 12,
    borderBottomWidth: 2,
    borderBottomColor: '#4a90e2',
    paddingBottom: 8,
  },
  speaker: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4a90e2',
  },
  dialogueText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    marginBottom: 20,
  },
  choicesContainer: {
    gap: 10,
  },
  choiceButton: {
    backgroundColor: '#4a90e2',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  choiceText: {
    fontSize: 15,
    color: '#fff',
    fontWeight: '600',
  },
  continueButton: {
    backgroundColor: '#e8f4f8',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  continueText: {
    fontSize: 15,
    color: '#4a90e2',
    fontWeight: '600',
  },
});
