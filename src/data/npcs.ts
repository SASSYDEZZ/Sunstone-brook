import { NPC, DialogueNode } from '../types';

const mayorDialogue: DialogueNode[] = [
  {
    id: 'greeting',
    text: "Welcome to Sunstone Brook! I'm Mayor Hazel. How can I help you today?",
    speaker: 'Mayor Hazel',
    choices: [
      { text: 'Tell me about the village', nextId: 'about_village' },
      { text: 'Any tasks for me?', nextId: 'quest_intro' },
      { text: 'Goodbye', nextId: 'end' },
    ],
  },
  {
    id: 'about_village',
    text: 'Sunstone Brook is a peaceful village. We have farms, a river for fishing, and friendly neighbors. Feel free to explore!',
    speaker: 'Mayor Hazel',
    nextId: 'greeting',
  },
  {
    id: 'quest_intro',
    text: 'Actually, yes! Could you help gather some apples? We need 5 for the village festival.',
    speaker: 'Mayor Hazel',
    questTrigger: 'gather_apples',
    nextId: 'end',
  },
  {
    id: 'end',
    text: 'Have a wonderful day!',
    speaker: 'Mayor Hazel',
  },
];

const farmerDialogue: DialogueNode[] = [
  {
    id: 'greeting',
    text: "Howdy! I'm Farmer Jack. These fields don't tend themselves!",
    speaker: 'Farmer Jack',
    choices: [
      { text: 'How are the crops?', nextId: 'crops' },
      { text: 'Goodbye', nextId: 'end' },
    ],
  },
  {
    id: 'crops',
    text: 'Growing well! The soil here is rich and the weather has been kind.',
    speaker: 'Farmer Jack',
    nextId: 'greeting',
  },
  {
    id: 'end',
    text: 'Back to work! Take care now.',
    speaker: 'Farmer Jack',
  },
];

const fisherDialogue: DialogueNode[] = [
  {
    id: 'greeting',
    text: "Hello there! I'm Fisherman Luna. The river's been good to me today!",
    speaker: 'Fisherman Luna',
    choices: [
      { text: 'Catch anything good?', nextId: 'fishing' },
      { text: 'Goodbye', nextId: 'end' },
    ],
  },
  {
    id: 'fishing',
    text: 'Oh yes! The fish are biting today. You should try your luck sometime!',
    speaker: 'Fisherman Luna',
    nextId: 'greeting',
  },
  {
    id: 'end',
    text: 'May your nets always be full!',
    speaker: 'Fisherman Luna',
  },
];

export const NPCS: NPC[] = [
  {
    id: 'mayor',
    name: 'Mayor Hazel',
    position: { x: 150, y: 150 },
    dialogue: mayorDialogue,
    affinity: 0,
    schedule: [
      { time: 8, destination: { x: 150, y: 150 } },
      { time: 12, destination: { x: 200, y: 200 } },
      { time: 18, destination: { x: 150, y: 150 } },
    ],
  },
  {
    id: 'farmer',
    name: 'Farmer Jack',
    position: { x: 300, y: 200 },
    dialogue: farmerDialogue,
    affinity: 0,
    schedule: [
      { time: 6, destination: { x: 300, y: 200 } },
      { time: 12, destination: { x: 280, y: 220 } },
      { time: 20, destination: { x: 320, y: 180 } },
    ],
  },
  {
    id: 'fisher',
    name: 'Fisherman Luna',
    position: { x: 400, y: 300 },
    dialogue: fisherDialogue,
    affinity: 0,
    schedule: [
      { time: 5, destination: { x: 400, y: 300 } },
      { time: 18, destination: { x: 380, y: 320 } },
    ],
  },
];
