export const logger = {
    debug: (message, data = {}) => {
        console.log(`🔍 DEBUG: ${message}`, data);
    },
    info: (message, data = {}) => {
        console.log(`ℹ️ INFO: ${message}`, data);
    },
    error: (message, error = null) => {
        console.error(`❌ ERROR: ${message}`, error);
    }
}; 