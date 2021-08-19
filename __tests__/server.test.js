import codes from 'http-codes';
import supertest from 'supertest';

import server from '../server/index.mjs';

const client = supertest(server);

describe('api', () => {
  it('index', async () => {
    const res = await client.get('/');

    expect(res.statusCode).toBe(codes.OK);
    expect(res.text).toBe('Hello World!');
  });
});
