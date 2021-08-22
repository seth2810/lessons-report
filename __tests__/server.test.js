import codes from 'http-codes';
import supertest from 'supertest';

import server from '../server/index.mjs';

const client = supertest(server);

const listValidationCases = [
  {
    name: 'date',
    query: {
      date: '1970-01-01,1970/01/01,a',
    },
    statusCode: codes.BAD_REQUEST,
    errorText: '"date[1]" must be in ISO 8601 date format. "date[2]" must be in ISO 8601 date format. "date" must contain less than or equal to 2 items.',
  },
  {
    name: 'status',
    query: {
      status: -1,
    },
    statusCode: codes.BAD_REQUEST,
    errorText: '"status" must be one of [0, 1].',
  },
  {
    name: 'teacherIds',
    query: {
      teacherIds: '0,1,1,a',
    },
    statusCode: codes.BAD_REQUEST,
    errorText: '"teacherIds[0]" must be greater than or equal to 1. "teacherIds[3]" must be a number. "teacherIds[2]" contains a duplicate value.',
  },
  {
    name: 'studentsCount',
    query: {
      studentsCount: '0,1,a',
    },
    statusCode: codes.BAD_REQUEST,
    errorText: '"studentsCount[0]" must be greater than or equal to 1. "studentsCount[2]" must be a number. "studentsCount" must contain less than or equal to 2 items.',
  },
  {
    name: 'page',
    query: {
      page: -1,
    },
    statusCode: codes.BAD_REQUEST,
    errorText: '"page" must be greater than or equal to 1.',
  },
  {
    name: 'lessonsPerPage',
    query: {
      lessonsPerPage: -1,
    },
    statusCode: codes.BAD_REQUEST,
    errorText: '"lessonsPerPage" must be greater than or equal to 1.',
  },
];

const createValidationCases = [
  {
    name: 'empty body',
    body: {},
    statusCode: codes.BAD_REQUEST,
    errorText: '"teacherIds" is required. "title" is required. "days" is required. "firstDate" is required. "value" must contain at least one of [lastDate, lessonsCount].',
  },
  {
    name: 'teacherIds',
    body: {
      teacherIds: [0, 1, 'a'],
      title: 'Blue Ocean',
      days: [0, 1, 3, 6],
      firstDate: '2019-09-10',
      lastDate: '2019-12-31',
    },
    statusCode: codes.BAD_REQUEST,
    errorText: '"teacherIds[0]" must be greater than or equal to 1. "teacherIds[2]" must be a number.',
  },
];

describe('/lessons', () => {
  describe('list', () => {
    test.each(listValidationCases)('validation:$name', async ({ query, statusCode, errorText }) => {
      const res = await client.get('/').query(query);

      expect(res.statusCode).toBe(statusCode);
      expect(res.text).toEqual(`Error validating request query. ${errorText}`);
    });

    test('empty filter', async () => {
      const res = await client.get('/');

      expect(res.statusCode).toBe(codes.OK);
      expect(res.body).toEqual({
        id: 9,
        date: new Date(2019, 5, 20).toISOString(),
        title: 'Yellow Color',
        status: 1,
      });
    });
  });

  describe('create', () => {
    test.each(createValidationCases)('validation:$name', async ({ body, statusCode, errorText }) => {
      const res = await client.post('/lessons').send(body);

      expect(res.statusCode).toBe(statusCode);
      expect(res.text).toEqual(`Error validating request body. ${errorText}`);
    });
  });
});
