import AsyncStorage from '@react-native-async-storage/async-storage';
import { GameState } from '../types';

const SAVE_KEY = '@sunstone_brook_save';

/**
 * Save game state to AsyncStorage
 */
export async function saveGame(gameState: GameState): Promise<void> {
  try {
    const saveData = {
      ...gameState,
      savedAt: Date.now(),
    };
    await AsyncStorage.setItem(SAVE_KEY, JSON.stringify(saveData));
    console.log('Game saved successfully');
  } catch (error) {
    console.error('Error saving game:', error);
    throw error;
  }
}

/**
 * Load game state from AsyncStorage
 */
export async function loadGame(): Promise<GameState | null> {
  try {
    const savedData = await AsyncStorage.getItem(SAVE_KEY);
    if (savedData) {
      const gameState = JSON.parse(savedData);
      console.log('Game loaded successfully');
      return gameState;
    }
    return null;
  } catch (error) {
    console.error('Error loading game:', error);
    return null;
  }
}

/**
 * Check if a save file exists
 */
export async function hasSaveData(): Promise<boolean> {
  try {
    const savedData = await AsyncStorage.getItem(SAVE_KEY);
    return savedData !== null;
  } catch (error) {
    console.error('Error checking save data:', error);
    return false;
  }
}

/**
 * Delete save data
 */
export async function deleteSaveData(): Promise<void> {
  try {
    await AsyncStorage.removeItem(SAVE_KEY);
    console.log('Save data deleted');
  } catch (error) {
    console.error('Error deleting save data:', error);
    throw error;
  }
}
