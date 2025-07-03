const os = require('os');
const path = require('path');

function showSystemInfo() {
  console.log('🖥 System Info');
  console.log('---------------------');
  console.log('OS Platform:', os.platform());
  console.log('CPU Architecture:', os.arch());
  console.log('Number of CPUs:', os.cpus().length);
  console.log('Home Directory:', os.homedir());
  console.log('Uptime (s):', os.uptime());
  console.log('Free Memory (MB):', (os.freemem() / 1024 / 1024).toFixed(2));
  console.log('Total Memory (MB):', (os.totalmem() / 1024 / 1024).toFixed(2));

  const filePath = path.join(__dirname, 'systemInfo.log');
  console.log('Log file path:', filePath);
}

module.exports = showSystemInfo;
