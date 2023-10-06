import { myToast } from '@utils/toast-config'

describe('myToast', () => {
  it('ensures that the myToast function recived the correct params to render one message', () => {
    myToast({
      type: 'info',
      message: 'any message',
    })
  })
})
