// Core game types
export interface Position {
  x: number;
  y: number;
}

export interface Item {
  id: string;
  name: string;
  description: string;
  icon: string;
  stackable: boolean;
  maxStack?: number;
}

export interface InventorySlot {
  item: Item;
  quantity: number;
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  objectives: QuestObjective[];
  rewards?: {
    items?: { itemId: string; quantity: number }[];
    affinity?: { npcId: string; amount: number }[];
  };
}

export interface QuestObjective {
  id: string;
  description: string;
  type: 'collect' | 'talk' | 'visit';
  target?: string;
  current: number;
  required: number;
}

export interface DialogueNode {
  id: string;
  text: string;
  speaker: string;
  choices?: DialogueChoice[];
  nextId?: string;
  questTrigger?: string;
}

export interface DialogueChoice {
  text: string;
  nextId: string;
  affinityChange?: number;
}

export interface NPC {
  id: string;
  name: string;
  position: Position;
  path?: Position[];
  dialogue: DialogueNode[];
  affinity: number;
  schedule?: NPCSchedule[];
}

export interface NPCSchedule {
  time: number; // Hour of day (0-23)
  destination: Position;
}

export interface GameTime {
  hour: number; // 0-23
  day: number;
  season: 'spring' | 'summer' | 'fall' | 'winter';
}

export interface Player {
  position: Position;
  inventory: InventorySlot[];
  maxInventorySize: number;
}

export interface GameState {
  player: Player;
  npcs: NPC[];
  quests: Quest[];
  time: GameTime;
  savedAt?: number;
}
