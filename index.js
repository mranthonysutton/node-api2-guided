// This imports the server, but we also need to export it out of server.js
const server = require('./api/server');

const port = 4000;

server.listen(port, () => {
  console.log(`\n*** Server Running on http://localhost:${port} ***\n`);
});
