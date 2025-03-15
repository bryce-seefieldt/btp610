# Running React Native with Expo on Emulators in WSL2 Ubuntu

Running emulators with WSL2 requires a specific setup because WSL2 doesn't natively support GUI applications like Android emulators. Here's a comprehensive guide for your environment:

## Setup WSL2 Ubuntu Development Environment

### 1. Install Node.js in WSL2

```bash
# Update your package list
sudo apt update

# Install Node.js and npm
sudo apt install nodejs npm

# Install NVM for better Node.js version management
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
source ~/.bashrc

# Install and use a newer Node.js version
nvm install 16
nvm use 16

# Verify installation
node -v
npm -v
```

### 2. Install Expo CLI in WSL2

```bash
npm install -g expo-cli
```

## Android Emulator Setup (Windows Host)

Since running Android emulators directly in WSL2 is challenging, you'll install the emulator on the Windows host and connect to it from WSL2.

### 1. Install Android Studio on Windows
1. Download Android Studio from [developer.android.com](https://developer.android.com/studio)
2. Run the installer and follow the setup wizard
3. During installation, ensure "Android Virtual Device" is selected

### 2. Create an Android Virtual Device
1. Open Android Studio
2. Click on "More Actions" > "Virtual Device Manager" (or Tools > AVD Manager)
3. Click "Create Device"
4. Select a phone definition (e.g., Pixel 4)
5. Select a system image (recommend API 30 or newer)
   - If you need to download an image, click "Download" next to the image name
6. Name your AVD and click "Finish"

### 3. Test the Emulator on Windows
1. In Android Virtual Device Manager, click the play button next to your AVD
2. The emulator should start up successfully

## Connecting WSL2 to Windows Android Emulator

### 1. Configure WSL2 to Connect to Windows Services

```bash
# Add this to your ~/.bashrc or ~/.zshrc
export ADB_SERVER_SOCKET=tcp:127.0.0.1:5037
export ANDROID_SDK_ROOT=/mnt/c/Users/YourUsername/AppData/Local/Android/Sdk
export PATH=$PATH:$ANDROID_SDK_ROOT/platform-tools
```

Replace `YourUsername` with your Windows username.

### 2. Install ADB in WSL2

```bash
sudo apt update
sudo apt install adb
```

### 3. Configure Network Route

```bash
# Get WSL2 IP address
export WSL_HOST=$(hostname -I | awk '{print $1}')

# Run this in PowerShell as Administrator on Windows
powershell.exe "New-NetFirewallRule -DisplayName 'WSL' -Direction Inbound -LocalPort 19000-19006 -Action Allow -Protocol TCP"
```

## Running Your React Native App

### 1. Start the Android Emulator on Windows
Use AVD Manager in Android Studio or run this PowerShell command:

```powershell
& "C:\Program Files\Android\Android Studio\emulator\emulator.exe" -avd YourAVDName
```

Replace `YourAVDName` with the name of your Android Virtual Device.

### 2. Start Your Expo App in WSL2

```bash
cd apps/wk08-api
npx expo start
```

### 3. Connect to the Emulator
You have several options:

#### Option A: Using the Metro QR Code
1. Press 'w' to open in a browser
2. In the browser interface, click "Run on Android device/emulator"

#### Option B: Direct ADB Command

```bash
adb connect 127.0.0.1:5555
adb devices  # Verify connection
```

#### Option C: Expo CLI Command

```bash
npx expo run:android
```

## Troubleshooting WSL2 and Emulator Issues

### Issue: ADB Connection Problems

```bash
# Kill any existing ADB servers on both Windows and WSL2
adb kill-server

# Start ADB server on Windows first
# Then in WSL2:
adb -a nodaemon server start
```

### Issue: Metro Bundler Not Connecting

```bash
# Ensure correct IP address
export REACT_NATIVE_PACKAGER_HOSTNAME=$(hostname -I | awk '{print $1}')
npx expo start --clear
```

### Issue: Port Forwarding
If the emulator can't connect to Metro Bundler:

```bash
# In PowerShell (as Administrator):
netsh interface portproxy add v4tov4 listenport=19000 listenaddress=127.0.0.1 connectport=19000 connectaddress=$(wsl.exe hostname -I | awk '{print $1}')
```

### Issue: Hot Reloading Not Working
Try using the Expo Go app instead:

```bash
# Enable LAN access
npx expo start --lan
```

## Note on iOS Simulation

iOS simulation is **not possible** in WSL2 or Windows as it requires macOS. If you need to test on iOS:
- Use Expo Snack for web-based testing
- Consider a Mac or Mac cloud service (like MacStadium)
- Use Expo's Preview service

## For Your Specific Project

```bash
# Navigate to your project
cd apps/wk08-api

# Start with specific connection settings
export REACT_NATIVE_PACKAGER_HOSTNAME=$(hostname -I | awk '{print $1}')
npx expo start
```

This setup gives you the best of both worlds: Linux-based development environment with WSL2 Ubuntu while leveraging Windows for emulation capabilities.