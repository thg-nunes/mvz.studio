import { Zoom, toast } from 'react-toastify'

export const myToast = ({
  type,
  message,
}: {
  type: 'info' | 'success' | 'warning' | 'error'
  message: string
}) => {
  return toast[type](message, {
    position: 'top-right',
    autoClose: 5000,
    transition: Zoom,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  })
}
