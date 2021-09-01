import { store as reactNotification } from 'react-notifications-component'

export function generateSuccessNotification(message) {
  reactNotification.addNotification({
    title: 'Success!',
    message: message,
    type: 'success',
    insert: 'top',
    container: 'top-right',
    animationIn: ['animate__animated', 'animate__fadeIn'],
    animationOut: ['animate__animated', 'animate__fadeOut'],
    dismiss: {
      duration: 3000,
      onScreen: true,
    },
  })
}
export function generateFailureNotification(message) {
  reactNotification.addNotification({
    title: 'Failure!',
    message: message,
    type: 'danger',
    insert: 'top',
    container: 'top-right',
    animationIn: ['animate__animated', 'animate__fadeIn'],
    animationOut: ['animate__animated', 'animate__fadeOut'],
    dismiss: {
      duration: 3000,
      onScreen: true,
    },
  })
}
