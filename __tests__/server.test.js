import codes from 'http-codes';
import supertest from 'supertest';

import server from '../server/index.mjs';

const client = supertest(server);

describe('api', () => {
  it('index', async () => {
    const res = await client.get('/');

    expect(res.statusCode).toBe(codes.OK);
    expect(res.body).toEqual({
      id: 9,
      date: '2019-06-20T00:00:00.000Z',
      title: 'Yellow Color',
      status: 1,
    });
  });
});
