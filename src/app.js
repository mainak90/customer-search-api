const express = require('express')

const app = express()
const port = process.env.PORT || 3000
async function getUserAsync (username) {
  const res = await Promise.resolve(`${username} is a user !`)
  return {user: await res, found: res.status === 200}
}

app.get('/user', async (req, res) => {
  try {
    // const {username} = req.params;
    const userResult = await getUserAsync('John')
    res.send(userResult)
  } catch (e) {
    res.status(500).end()
  }
})

app.listen(port, () => console.log(`App listening on port ${port}!`))
