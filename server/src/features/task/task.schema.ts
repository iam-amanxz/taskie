import { Schema } from 'express-validator'

const create: Schema = {
  title: {
    in: ['body'],
    notEmpty: { errorMessage: 'Title is required' },
  },
  dueDate: {
    in: ['body'],
    notEmpty: { errorMessage: 'Due date is required' },
  },
}

const update: Schema = {
  id: {
    in: ['params'],
    notEmpty: { errorMessage: 'Id is required' },
  },
  title: {
    in: ['body'],
    notEmpty: { errorMessage: 'Title is required' },
  },
  dueDate: {
    in: ['body'],
    notEmpty: { errorMessage: 'Due date is required' },
  },
  ownerId: {
    in: ['body'],
    notEmpty: { errorMessage: 'Owner id is required' },
  },
}

const remove: Schema = {
  id: {
    in: ['params'],
    notEmpty: { errorMessage: 'Id is required' },
  },
}

const get: Schema = {
  id: {
    in: ['params'],
    notEmpty: { errorMessage: 'Id is required' },
  },
}

export const taskSchema = { create, update, remove, get }
