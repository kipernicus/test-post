const axios = require('axios')
const express = require('express')

const app = express()
app.use(express.json())

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
app.post('/testPostOldSchool', (req, res) => {

  const cbUrl = req.get('X-Response-URL')
  console.log('OLD SCHOOL POST!!!', JSON.stringify(req.body, null, 2))
  console.log('URL:', cbUrl)
  if (cbUrl) {
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        axios.post(cbUrl, {
          notification: 'Thing #2'
        })
      }, 5000)
    }
  }
  res.sendStatus(202, 'Boo')
})
app.post('/testPost', (req, res) => {

  console.log('BASIC POST!!!', JSON.stringify(req.body, null, 2))
  const cbUrl = req.get('X-Response-URL')
  if (cbUrl) {
    setTimeout(() => {
      axios.post(cbUrl, {
        notification: 'Thing #2'
      })
    }, 5000)
  }
  res.sendStatus(202, 'Boo')
})
app.post('/testPost/:echo', (req, res) => {

  console.log('ADVANCED POST!!!', req.params, req.body)
  const cbUrl = req.get('X-Response-URL')
  if (cbUrl) {
    setTimeout(() => {
      axios.post(cbUrl, {
        brandNewString: 'Here is your bonus String',
        echoedString: req.params.echo,
        reversedString: req.body.reverseMe.split('').reverse().join('')
      })
    }, 5000)
  }
  res.sendStatus(202, 'Yay')
})

console.log('RUNNING...')
app.listen(3000)