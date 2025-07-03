const path = require('path');

// console.log(__dirname);
// console.log(__filename)

// console.log(path.join(__dirname, 'folder', 'file.txt'));
// // Safely joins paths => platform independent

// console.log(path.resolve('folder', 'file.txt'));
// // Resolves to an absolute path


const os = require('os');

// console.log('Platform:', os.platform());
// console.log('Architecture:', os.arch());
// console.log('Free memory:', os.freemem());
// console.log('Total memory:', os.totalmem());
// console.log('CPU info:', os.cpus());
// console.log('Home dir:', os.homedir());


const showSystemInfo = require('./systemInfo');

showSystemInfo();
