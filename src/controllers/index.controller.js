import { Users } from '../../models/usersModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const login = async (req, res) => {
  const { email, password } = req.body

  const user = await Users.findOne({ email }).exec()

  if (!user) {
    return res.status(401).send({ error: 'incorrect user or password' })
  }

  const isValid = await bcrypt.compare(password, user.password)

  if (!isValid) {
    return res.status(401).send({ error: 'incorrect user or password' })
  }

  const payload = {
    id: user._id
  }

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: 60 * 60 * 24 * 365
  })

  const userFiltered = {
    name: user.name,
    surname: user.surname,
    email: user.email,
    role: user.role,
    rate: user.rate,
    client: user.client
  }

  return res.status(200).send({ token, user: userFiltered })
}