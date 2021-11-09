const axios = require('axios')
const express = require('express')

const app = express()
app.use(express.json())

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
app.post('/testPost', (req, res) => {

  console.log('DOING THINGS!!!')
  const cbUrl = req.get('X-Response-URL')
  if (cbUrl) {
    setTimeout(() => {
      axios.post(cbUrl, {
        data: { notification: 'Thing #1' },
        notification: 'Thing #2'
      })
    }, 5000)
  }
  res.sendStatus(202, 'Boo')
})
app.post('/testPost/:echo', (req, res) => {

  console.log('DOING MORE THINGS!!!', req.params, req.body)
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