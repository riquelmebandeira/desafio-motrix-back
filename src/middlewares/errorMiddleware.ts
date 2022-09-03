/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, ErrorRequestHandler, NextFunction } from 'express'
import CustomError from '../utils/CustomError'
import StatusCode from '../utils/StatusCode'

const errorMiddleware = (
  err: ErrorRequestHandler,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.log(err)

  if (err instanceof CustomError) {
    return res.status(err.code).json({ error: err.message })
  }

  return res.status(StatusCode.INTERNAL_SERVER_ERROR).json(
    { error: 'Internal Server Error' }
  )
}

export default errorMiddleware
