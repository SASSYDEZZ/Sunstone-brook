import { Item } from '../types';

export const ITEMS: Record<string, Item> = {
  apple: {
    id: 'apple',
    name: 'Apple',
    description: 'A crisp, red apple',
    icon: '🍎',
    stackable: true,
    maxStack: 99,
  },
  wood: {
    id: 'wood',
    name: 'Wood',
    description: 'A piece of sturdy wood',
    icon: '🪵',
    stackable: true,
    maxStack: 99,
  },
  flower: {
    id: 'flower',
    name: 'Flower',
    description: 'A beautiful wildflower',
    icon: '🌸',
    stackable: true,
    maxStack: 99,
  },
  fish: {
    id: 'fish',
    name: 'Fish',
    description: 'A fresh-caught fish',
    icon: '🐟',
    stackable: true,
    maxStack: 99,
  },
  carrot: {
    id: 'carrot',
    name: 'Carrot',
    description: 'A crunchy orange carrot',
    icon: '🥕',
    stackable: true,
    maxStack: 99,
  },
};
