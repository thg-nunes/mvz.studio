export class AppError extends Error {
  message: string
  status?: number

  constructor(message: string, status?: number) {
    super()
    this.status = status
    this.message = message
  }
}
