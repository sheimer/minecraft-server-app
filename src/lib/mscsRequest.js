let requestRunning = false

const waitForRequest = async () => new Promise((resolve, reject) => {
  const check = () => {
    if (requestRunning) {
      setTimeout(check, 10)
    } else {
      resolve(true)
    }
  }
  check()
})

const sendMscsRequest = async (cmd) => {
  if (requestRunning) {
    await waitForRequest()
  }
  requestRunning = true
  const res = await fetch('https://www.debugstube.de/minecraft/api/mscs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ cmd })
  })
  requestRunning = false
  const result = await res.json()
  return result.msgs
}

export { sendMscsRequest }
