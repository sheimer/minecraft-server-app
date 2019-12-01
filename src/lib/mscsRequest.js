const sendMscsRequest = async (cmd) => {
  const res = await fetch('https://www.debugstube.de/minecraft/api/mscs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ cmd })
  })
  const result = await res.json()
  console.log(result)
  return result.msgs
}

export { sendMscsRequest }
