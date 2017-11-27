import firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyBbSolJ7aKCEZV7SmFULmtmTsMEF4ahm2Q',
  authDomain: 'duckr-react.firebaseapp.com',
  databaseURL: 'https://duckr-react.firebaseio.com',
  projectId: 'duckr-react',
  storageBucket: 'duckr-react.appspot.com',
  messagingSenderId: '143301725562',
}

firebase.initializeApp(config)

export const ref = firebase.database().ref()
export const firebaseAuth = firebase.auth
