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
