const os = require('os');
const log = require('./logger');

log('Starting system info logging...');
log(`Platform: ${os.platform()}`);
log(`Free memory: ${os.freemem()}`);
log('Logger finished.');
