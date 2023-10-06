import { AppError } from '@utils/appErrorr'

describe('AppError', () => {
  it('ensures that the class AppError returns an message by default', () => {
    const appError = new AppError('any error message')
    expect(appError).toHaveProperty('message', 'any error message')
  })
})
