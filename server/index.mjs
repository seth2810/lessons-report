import express from 'express';
import knex from './storage/knex.mjs';

const server = express();

server.get('/', async (req, res) => {
  const [lesson] = await knex('lessons').where({ id: 9 });

  res.json(lesson);
});

export default server;
