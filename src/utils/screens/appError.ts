export class AppError {
  status: string
  message: string

  constructor({ status, message }: { status: string; message: string }) {
    this.status = status
    this.message = message
  }
}
