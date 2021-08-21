import server from './server/index.mjs';

const { HTTP_PORT: port = 3000 } = process.env;

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
