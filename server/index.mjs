import express from 'express';
import body from 'body-parser';
import joiValidator from 'express-joi-validation';

import knex from './storage/knex.mjs';
import Joi from './validation/joi.mjs';

const server = express();
const validate = joiValidator.createValidator({});

const lessonsListSchema = Joi.object({
  date: Joi.arrayComma().min(1).max(2)
    .items(
      Joi.string().isoDate(),
    )
    .sort()
    .strict(),
  status: Joi.number().valid(0, 1),
  teacherIds: Joi.arrayComma().unique()
    .items(
      Joi.number().min(1),
    ),
  studentsCount: Joi.arrayComma().min(1).max(2)
    .items(
      Joi.number().min(1),
    ),
  page: Joi.number().min(1),
  lessonsPerPage: Joi.number().min(1).default(5),
});

const lessonCreateSchema = Joi.object({
  teacherIds: Joi.array().unique()
    .items(
      Joi.number().min(1),
    )
    .required(),
  title: Joi.string().required(),
  days: Joi.array().min(1).max(7).unique()
    .items(
      Joi.number().min(0).max(6),
    )
    .sort()
    .strict()
    .required(),
  firstDate: Joi.date().format('iso').required(),
  lastDate: Joi.date().format('iso').greater(Joi.ref('firstDate')),
  lessonsCount: Joi.number().min(1).max(300),
}).xor('lastDate', 'lessonsCount').required();

server.get('/', validate.query(lessonsListSchema), async (req, res) => {
  const [lesson] = await knex('lessons').where({ id: 9 });

  res.json(lesson);
});

server.post('/lessons', body.json(), validate.body(lessonCreateSchema), async (req, res) => {
  res.json([]);
});

export default server;
