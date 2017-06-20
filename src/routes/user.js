const express = require('express')

const router = express.Router()

async function getUserAsync (username) {
  const res = await Promise.resolve(`${username} is a user !`)
  return {user: await res, found: res.status === 200}
}

router.get('/', async (req, res) => {
  try {
    // const {username} = req.params;
    const userResult = await getUserAsync('John')
    res.send(userResult)
  } catch (e) {
    res.status(500).end()
  }
})

module.exports = router
