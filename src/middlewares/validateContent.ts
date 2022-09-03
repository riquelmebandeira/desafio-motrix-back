import { Request, Response, NextFunction } from 'express'
import * as Joi from 'joi'
import StatusCode from '../utils/StatusCode'

const contentSchema = Joi.object({
  title: Joi.string().required(),
  body: Joi.string().required()
})

const validateContent = (req: Request, res: Response, next: NextFunction) => {
  const { error } = contentSchema.validate(req.body)

  if (error) return res.status(StatusCode.BAD_REQUEST).json(error.message)

  next()
}

export default validateContent
