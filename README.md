# btp610
Mobile application development

## Cross PLatform Mobile with `Expo`

Build Expo app:
`npx create-expo-app --template`

Build app from source code: 
- (Remove exisitng `node-modules`):

`npm install`

### Update Expo version
`npx expo install expo@latest`

Update dependencies to work with newest Expo version

`npx expo install --fix`

### Run Expo app (from app root folder):
`npx expo start --tunnel`

#### Auto-Set Default on Terminal Start
To ensure a speciffic `node` version is automatically used whenever you open PowerShell, add this command to your PowerShell profile:

```powershell
Add-Content $PROFILE "nvm use 18.20.7" -Force
```

To check if it worked, restart PowerShell and run:
```powershell
node -v
```
Expected output:
```powershell
v18.20.7
```
## Emulator Start
```powershell
PS C:\Users\bryce\AppData\Local\Android\Sdk\emulator> ./emulator -avd Pixel_8 -no-snapshot
```

`ctrl + m` Dev menu in emulator

## Firebase


