const express = require('express')
const { exec } = require('child_process')
const router = express.Router()


const execMscsCmd = (cmd, options) => {
  cmd = cmd.replace(/[^a-zA-Z0-9- ]/g, '')
  return new Promise((resolve, reject) => {
    exec(`mscs ${cmd}`, (err, stdout, stderr) => {
      if (err) {
        console.log('err in execMscsCmd: ', err)
        reject(err)
        return
      }
      let msgs = stdout.trim().replace(/\n\n/g, '\n').split('\n')
      if (cmd.indexOf('-json') >= 0) {
        msgs =  JSON.parse(msgs)
      }
      console.log(stdout)
      console.log(msgs)
      resolve(msgs)
    })
  })
}


router.post('/mscs', (req, res, err) => {
  console.log('mscs command requested: ', req.body.cmd)
  execMscsCmd(req.body.cmd)
    .then(msgs => {
      res.json({ msgs: msgs })
    })
    .catch(err => next(err))

})

module.exports = router
