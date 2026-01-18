import React from 'react';
import { View, Text, StyleSheet, ScrollView, Modal, TouchableOpacity } from 'react-native';
import { Quest } from '../types';

interface QuestLogProps {
  quests: Quest[];
  visible: boolean;
  onClose: () => void;
}

export function QuestLog({ quests, visible, onClose }: QuestLogProps) {
  const activeQuests = quests.filter((q) => !q.completed);
  const completedQuests = quests.filter((q) => q.completed);

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.modalOverlay}>
        <View style={styles.questContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>Quest Log</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.scrollView}>
            {activeQuests.length > 0 && (
              <>
                <Text style={styles.sectionTitle}>Active Quests</Text>
                {activeQuests.map((quest) => (
                  <View key={quest.id} style={styles.questCard}>
                    <Text style={styles.questTitle}>{quest.title}</Text>
                    <Text style={styles.questDescription}>{quest.description}</Text>
                    <View style={styles.objectivesContainer}>
                      {quest.objectives.map((obj) => (
                        <View key={obj.id} style={styles.objective}>
                          <Text style={styles.objectiveText}>
                            {obj.completed ? '✓' : '○'} {obj.description}
                          </Text>
                          <Text style={styles.progress}>
                            {obj.current}/{obj.required}
                          </Text>
                        </View>
                      ))}
                    </View>
                  </View>
                ))}
              </>
            )}
            
            {completedQuests.length > 0 && (
              <>
                <Text style={styles.sectionTitle}>Completed Quests</Text>
                {completedQuests.map((quest) => (
                  <View key={quest.id} style={[styles.questCard, styles.completedCard]}>
                    <Text style={styles.questTitle}>✓ {quest.title}</Text>
                    <Text style={styles.questDescription}>{quest.description}</Text>
                  </View>
                ))}
              </>
            )}
            
            {quests.length === 0 && (
              <Text style={styles.emptyText}>No quests yet. Talk to villagers to get started!</Text>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  questContainer: {
    width: '80%',
    maxWidth: 500,
    height: '70%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    borderBottomWidth: 2,
    borderBottomColor: '#e0e0e0',
    paddingBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    padding: 8,
  },
  closeButtonText: {
    fontSize: 24,
    color: '#666',
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555',
    marginTop: 12,
    marginBottom: 8,
  },
  questCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#4a90e2',
  },
  completedCard: {
    borderLeftColor: '#52c41a',
    opacity: 0.7,
  },
  questTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  questDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  objectivesContainer: {
    marginTop: 8,
  },
  objective: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  objectiveText: {
    fontSize: 13,
    color: '#555',
  },
  progress: {
    fontSize: 12,
    color: '#999',
    fontWeight: '600',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    color: '#999',
  },
});
