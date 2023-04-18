import Joi from 'joi';
import Extension from '@joi/date';
const JoiExtended = Joi.extend(Extension);
export const datetimeSchema = JoiExtended.date()
  .default('now')
  .format(['YYYY/MM/DD'])
  .messages({
    'date.empty': 'Date can not be empty',
    'date.trim':
      'Date contains some whitespaces at the beginning and/or at the end of the field',
    'date.format': 'Format -> YYYY/MM/DD',
  });
export const placeSchema = JoiExtended.string()
  .min(1)
  .max(60)
  .trim()
  .strict()
  .messages({
    'string.empty': 'Place can not be empty',
    'string.min': 'Place lenght must be at least 1 characters long',
    'string.max': 'Place can not contain more than 60 characters',
    'string.trim':
      'Place contains some whitespaces at the beginning and/or at the end of the field',
  });
export const eventSchema = JoiExtended.object({
  name: JoiExtended.string()
    .required()
    .min(1)
    .max(60)
    .trim()
    .strict()
    .messages({
      'string.empty': 'Name can not be empty',
      'string.min': 'Name lenght must be at least 1 characters long',
      'string.max': 'Name can not contain more than 60 characters',
      'string.trim':
        'Name contains some whitespaces at the beginning and/or at the end of the field',
    }),
  place: placeSchema.required(),
  datetime: datetimeSchema.required(),
});
