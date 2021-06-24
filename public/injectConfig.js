const baseUrl = {
  baseUrl: 'http://'
}

if (process.env.NODE_ENV === 'development') {
  window.localStorage.setItem('baseUrl', JSON.stringify(baseUrl))
} else {
  fetch('../config/config.json')
    .then(v => v.json())
    .then(baseUrl => {
      console.log('baseUrl', baseUrl)
      window.localStorage.setItem('baseUrl', JSON.stringify(baseUrl))
    })
}
