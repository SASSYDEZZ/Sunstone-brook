import { Quest } from '../types';

export const QUESTS: Quest[] = [
  {
    id: 'gather_apples',
    title: 'Apple Collection',
    description: 'Gather 5 apples for the village festival',
    completed: false,
    objectives: [
      {
        id: 'collect_apples',
        description: 'Collect apples',
        type: 'collect',
        target: 'apple',
        current: 0,
        required: 5,
      },
    ],
    rewards: {
      affinity: [{ npcId: 'mayor', amount: 10 }],
    },
  },
  {
    id: 'meet_villagers',
    title: 'Meet the Villagers',
    description: 'Talk to all the villagers in Sunstone Brook',
    completed: false,
    objectives: [
      {
        id: 'talk_mayor',
        description: 'Talk to Mayor Hazel',
        type: 'talk',
        target: 'mayor',
        current: 0,
        required: 1,
      },
      {
        id: 'talk_farmer',
        description: 'Talk to Farmer Jack',
        type: 'talk',
        target: 'farmer',
        current: 0,
        required: 1,
      },
      {
        id: 'talk_fisher',
        description: 'Talk to Fisherman Luna',
        type: 'talk',
        target: 'fisher',
        current: 0,
        required: 1,
      },
    ],
  },
];
