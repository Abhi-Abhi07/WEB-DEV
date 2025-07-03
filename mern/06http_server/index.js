// const http = require('http');

// const server = http.createServer((req, res) => {
//   console.log(`Request received: ${req.method} ${req.url}`);

//   res.writeHead(200, { 'Content-Type': 'text/plain' });
//   res.end('Hello from Node.js server!');
// });

// server.listen(3000, () => {
//   console.log('Server running at http://localhost:3000');
// });


// const http = require('http');
// const fs = require('fs');

// const server = http.createServer((req, res) => {
//   if (req.url === '/') {
//     fs.readFile('./index.html', (err, data) => {
//       if (err) {
//         res.writeHead(500);
//         res.end('Error loading HTML');
//       } else {
//         res.writeHead(200, { 'Content-Type': 'text/html' });
//         res.end(data);
//       }
//     });
//   } else {
//     res.writeHead(404);
//     res.end('Page not found');
//   }
// });

// server.listen(3000, () => {
//   console.log('Server running at http://localhost:3000');
// });






// const http = require('http');

// const server = http.createServer((req, res) => {
//   if (req.url === '/api') {
//     const data = { name: 'Abhi', learning: 'Node.js', day: 6 };
//     res.writeHead(200, { 'Content-Type': 'application/json' });
//     res.end(JSON.stringify(data));
//   } else {
//     res.writeHead(404);
//     res.end('Not Found');
//   }
// });

// server.listen(3000, () => {
//   console.log('API server running at http://localhost:3000/api');
// });
