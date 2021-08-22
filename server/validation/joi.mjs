import JoiBase from 'joi';

const Joi = JoiBase.extend(
  (joi) => ({
    type: 'arrayComma',
    base: joi.array(),
    coerce: {
      from: 'string',
      method: (value) => ({
        value: value.split(','),
      }),
    },
  }),
);

export default Joi;
