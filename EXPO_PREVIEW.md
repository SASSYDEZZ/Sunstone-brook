# Expo Go Preview Guide

## Quick Start with Expo Go

This guide helps you preview Sunstone Brook on your mobile device using Expo Go.

### Step 1: Install Expo Go

Download and install Expo Go on your mobile device:

- **iOS**: [Download from App Store](https://apps.apple.com/app/expo-go/id982107779)
- **Android**: [Download from Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent)

### Step 2: Start the Development Server

On your computer, run:

```bash
npm start
```

This will:
- Start the Expo development server
- Display a QR code in the terminal
- Open Expo Dev Tools in your browser

### Step 3: Connect Your Device

Make sure your mobile device and computer are on the same Wi-Fi network.

**On iOS:**
1. Open the Camera app
2. Point it at the QR code in the terminal
3. Tap the notification that appears
4. The game will open in Expo Go

**On Android:**
1. Open the Expo Go app
2. Tap "Scan QR code"
3. Scan the QR code in the terminal
4. The game will load automatically

### Step 4: Play the Game!

Once loaded, you can:
- ✅ Tap to move your character
- ✅ Collect items by tapping on them
- ✅ Talk to NPCs
- ✅ Open inventory and quest log
- ✅ Watch time progress

### Troubleshooting

**Can't scan QR code?**
- Ensure both devices are on the same Wi-Fi network
- Try using the "exp://" URL shown in the terminal
- In Expo Go, tap "Enter URL manually" and paste the URL

**Game not loading?**
- Check that all dependencies are installed: `npm install`
- Restart the development server: `npm start`
- Clear Expo Go cache in the app settings

**Performance issues?**
- Expo Go runs in development mode, which is slower
- For better performance, try the web version: `npm run web`

### Alternative: Web Preview

For the fastest preview experience:

```bash
npm run web
```

This opens the game in your browser immediately, without needing a mobile device.

---

For more information, see the main [README.md](README.md)
