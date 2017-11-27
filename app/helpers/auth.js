import { ref, firebaseAuth } from 'config/constants'

export default function auth () {
  return firebaseAuth().signInWithPopup(new firebaseAuth.FacebookAuthProvider())
}

export function logout () {
  return firebaseAuth().signOut()
}

export function saveUser (user) {
  return ref
    .child(`users/${user.uid}`)
    .set(user)
    .then(() => user)
}

export function redirectBasedOnAuth (props) {
  if (props.isFetching === true) {
    return
  }
  const nextPathName = props.location.pathname
  if (nextPathName === '/' || nextPathName === '/auth') {
    if (props.isAuthed === true) {
      props.history.replace('feed')
    }
  } else {
    if (props.isAuthed !== true) {
      props.history.replace('auth')
    }
  }
}
