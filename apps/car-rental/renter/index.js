import { registerRootComponent } from 'expo';
import { logger } from './utils/logger';
import App from './App';

logger.info('Starting Renter Application');

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
