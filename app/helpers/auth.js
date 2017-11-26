export default function auth () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        name: 'Weder Ribas',
        avatar: 'https://avatars2.githubusercontent.com/u/4594849?s=460&v=4',
        uid: 'wederribas',
      })
    }, 2000)
  })
}

export function redirectBasedOnAuth ({ isAuthed, location, history }) {
  const alreadyAuthed = checkIfAuthed(isAuthed)
  const nextPathName = location.pathname
  if (nextPathName === '/' || nextPathName === '/auth') {
    if (alreadyAuthed === true) {
      history.replace('feed')
    }
  } else {
    if (alreadyAuthed !== true) {
      history.replace('auth')
    }
  }
}

export function logout () {
  console.log('Logged out!')
}

function checkIfAuthed (isAuthed) {
  return isAuthed
}
