const axios = require('axios')
const express = require('express')

const app = express()
app.use(express.json())

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
app.get('/ping', (req, res) => {
  console.log('PING PONG!')
  return res.status(200).send({ value: 'pong' })
})
app.get('/testGet/:echo', (req, res) => {
  console.log('TESTING GET!')
  const echo = req.params.echo
  return res.status(200).send({ echoThis: echo })
})
app.post('/testPostOldSchool', (req, res) => {
  const cbUrl = req.get('X-Response-URL')
  console.log('OLD SCHOOL POST!!!', JSON.stringify(req.body, null, 2))
  if (cbUrl) {
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        axios.post(cbUrl, {
          notification: 'Thing #2'
        })
      }, 5000)
    }
  }
  res.status(202).send('Boo')
})
app.post('/testIntegration', (req, res) => {
  console.log('POST BODY:', JSON.stringify(req.body, null, 2))
  // console.log('URL PARAMS', JSON.stringify(req.params, null, 2))
  // console.log('QUERY STRING', JSON.stringify(req.query, null, 2))
  const cbUrl = req.get('X-Response-URL')
  // if (cbUrl) {
  //   setTimeout(() => {
  //     axios.post(cbUrl, {
  //       notification: 'Thing #2'
  //     })
  //   }, 5000)
  // }
  res.status(200).send('Boo')
})
app.post('/testIntegrationInputs/:input', (req, res) => {
  console.log('POST BODY:', JSON.stringify(req.body, null, 2))
  console.log('URL PARAMS', JSON.stringify(req.params, null, 2))
  console.log('QUERY STRING', JSON.stringify(req.query, null, 2))
  const cbUrl = req.get('X-Response-URL')
  // if (cbUrl) {
  //   setTimeout(() => {
  //     axios.post(cbUrl, {
  //       notification: 'Thing #2'
  //     })
  //   }, 5000)
  // }
  res.status(200).send('Boo')
})
app.get('/testIntegrationOutputs', (req, res) => {
  try {
    const responseData = {
      text: 'text',
      email: 'mail@test.com',
      number: 17,
      bool: true,
      department: { id: '618b0bbd6f65647cddf786cd', label: 'Science' },
      user: { id: '618b0b6a6f6564f5bef78665', label: 'Joe Stone' },
      usersList: [
        { id: '618b0b6a6f6564f5bef78665', label: 'Joe Stone' },
        { id: '618b0b386f656410c9f78653', label: 'Ray Call' }
      ],
      richText: '<p>Here is some fancy text</p>'
    }
    res.status(200).json(responseData)
  } catch (err) {
    console.error('DEATH', err)
    res.status(500).send(err.message)
  }
})
app.post('/kd-demo', (req, res) => {
  try {
    const {
      attendees,
      distance,
      costPerMile
    } = req.body
    const result = attendees * distance * costPerMile
    const supervisor = { id: '618b0b6a6f6564f5bef78665', label: 'Joe Stone' }
    const responseData = {
      result,
      supervisor
    }
    res.status(200).json(responseData)
  } catch (err) {
    console.error('DEATH', err)
    res.status(500).send(err.message)
  }
})
app.post('/testPost/:echo', (req, res) => {
  try {
    const cbUrl = req.get('X-Response-URL')
    const echo = req.params.echo || ''
    console.log('BODY IS', req.body)
    const responseData = {
      brandNewString: 'Here is your bonus String (edited)',
      echoedString: req.params.echo,
      reversedString: req.body.reverseMe
        ? req.body.reverseMe
          .split('')
          .reverse()
          .join('')
        : 'nothin',
      calc: '500',
      text: 'text',
      email: 'mail@test.com',
      number: 17,
      bool: true,
      department: { id: '618b0bbd6f65647cddf786cd', label: 'Science' },
      user: { id: '618b0b6a6f6564f5bef78665', label: 'Joe Stone' },
      usersList: [
        { id: '618b0b6a6f6564f5bef78665', label: 'Joe Stone' },
        { id: '618b0b386f656410c9f78653', label: 'Ray Call' }
      ],
      richText: '<p>Here is some fancy text</p>',
      garbage: 'breakage'
    }
    console.log('ECHO', echo)
    if (echo.indexOf('timeout') !== -1) {
      console.log('TIMING OUT!!!')
      setTimeout(() => {
        res.status(200).json(responseData)
      }, 10000)
    } else if (cbUrl) {
      setTimeout(() => {
        axios.post(cbUrl, responseData)
      }, 5000)
      res.status(202).send('Yay')
    } else {
      res.status(200).send(responseData)
    }
  } catch (err) {
    console.error('DEATH', err)
    res.status(500).send(err.message)
  }
})

console.log('RUNNING...')
app.listen(3000)
