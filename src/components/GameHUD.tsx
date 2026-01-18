import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GameTime } from '../types';

interface GameHUDProps {
  time: GameTime;
  onInventoryPress: () => void;
  onQuestPress: () => void;
}

export function GameHUD({ time, onInventoryPress, onQuestPress }: GameHUDProps) {
  const formatTime = () => {
    const period = time.hour >= 12 ? 'PM' : 'AM';
    const hour12 = time.hour % 12 || 12;
    return `${hour12}:00 ${period}`;
  };

  const getTimeOfDayColor = () => {
    if (time.hour >= 6 && time.hour < 12) return '#FFD700'; // Morning
    if (time.hour >= 12 && time.hour < 18) return '#87CEEB'; // Afternoon
    if (time.hour >= 18 && time.hour < 20) return '#FF6347'; // Evening
    return '#191970'; // Night
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <View style={[styles.timeContainer, { backgroundColor: getTimeOfDayColor() }]}>
          <Text style={styles.timeText}>{formatTime()}</Text>
          <Text style={styles.dayText}>Day {time.day} - {time.season}</Text>
        </View>
      </View>
      
      <View style={styles.bottomBar}>
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText} onPress={onInventoryPress}>
            🎒 Inventory
          </Text>
          <Text style={styles.buttonText} onPress={onQuestPress}>
            📋 Quests
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'box-none',
  },
  topBar: {
    padding: 10,
    alignItems: 'flex-end',
  },
  timeContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  timeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  dayText: {
    fontSize: 12,
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 8,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4a90e2',
    padding: 8,
  },
});
