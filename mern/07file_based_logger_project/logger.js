const fs = require('fs');
const path = require('path');

function logMessage(message) {
  const time = new Date().toISOString();
  const log = `[${time}] ${message}\n`;
  const logPath = path.join(__dirname, 'logs.txt');

  fs.appendFile(logPath, log, (err) => {
    if (err) throw err;
    console.log('Log written.');
  });
}

module.exports = logMessage;
