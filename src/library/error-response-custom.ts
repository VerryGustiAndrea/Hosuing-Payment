import { HttpStatus, HttpException } from '@nestjs/common';

const ErrorResponseCustom = (
  message: any,
  status: boolean,
  data: any
) => {
  if (message.message) {
    message = message.message;
  }

  return { status, message, data }
};
export default ErrorResponseCustom;
