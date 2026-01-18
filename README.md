# Sunstone Brook

Sunstone Brook — Web‑first Expo prototype of a cozy village life sim (inventory, quests, dialogue, NPCs, pathfinding, save/load).

## Features

- **Inventory System**: Collect and manage items with a visual inventory interface
- **Quest & Dialogue System**: Interact with NPCs through branching dialogues and complete quests
- **NPC System**: Three unique villagers with individual personalities and schedules
- **A* Pathfinding**: NPCs navigate the world intelligently using A* pathfinding algorithm
- **Time-of-Day System**: Dynamic time progression with visual indicators (morning, afternoon, evening, night)
- **Affinity System**: Build relationships with villagers through conversations and quest completion
- **Auto-Save/Load**: Automatic save every 30 seconds with persistent game state

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/SASSYDEZZ/Sunstone-brook.git
cd Sunstone-brook
```

2. Install dependencies:
```bash
npm install
```

### Running the Game

#### Web (Recommended)
```bash
npm run web
```
This will start the development server and open the game in your browser.

#### iOS
```bash
npm run ios
```
Requires macOS with Xcode installed, or use Expo Go app on your device.

#### Android
```bash
npm run android
```
Requires Android Studio or use Expo Go app on your device.

## How to Play

1. **Movement**: Tap anywhere on the game world to move your character
2. **Collect Items**: Tap on items (🍎 apples, 🌸 flowers, 🪵 wood) to add them to your inventory
3. **Talk to NPCs**: Tap on villagers to start conversations and receive quests
4. **View Inventory**: Tap the "🎒 Inventory" button to see collected items
5. **Check Quests**: Tap the "📋 Quests" button to view active and completed quests
6. **Manual Save**: Tap the 💾 button to manually save your progress (auto-saves every 30 seconds)

## Game Mechanics

### NPCs
- **Mayor Hazel**: The village mayor who gives you quests
- **Farmer Jack**: A hardworking farmer tending to his fields
- **Fisherman Luna**: A skilled fisher by the river

Each NPC has:
- A daily schedule that moves them around the village
- Unique dialogue trees
- An affinity level that increases as you interact with them

### Time System
- Time advances every 20 seconds (game hour)
- NPCs follow their schedules based on time of day
- Visual time indicator changes color:
  - 🌅 Morning (6 AM - 12 PM): Gold
  - ☀️ Afternoon (12 PM - 6 PM): Sky Blue
  - 🌆 Evening (6 PM - 8 PM): Tomato Red
  - 🌙 Night (8 PM - 6 AM): Midnight Blue

### Quests
- **Meet the Villagers**: Talk to all NPCs in the village
- **Apple Collection**: Gather 5 apples for the village festival

## Technical Details

### Architecture
- **React Native + Expo**: Cross-platform mobile framework
- **TypeScript**: Type-safe development
- **AsyncStorage**: Persistent game state storage
- **Custom Hooks**: `useGameState` for centralized state management

### Project Structure
```
src/
├── components/       # UI components (Inventory, DialogueBox, QuestLog, GameHUD)
├── data/            # Game data (items, NPCs, quests)
├── hooks/           # Custom React hooks
├── screens/         # Game screens
├── types/           # TypeScript type definitions
└── utils/           # Utilities (pathfinding, storage)
```

## Development

Built with rapid iteration in mind:
- Hot reloading for instant updates
- Web-first approach for easy testing
- Mobile testing via Expo Go app (no native build required)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Credits

Created as a demonstration of Expo's capabilities for rapid game prototyping.
