import mongoose from 'mongoose'
import 'dotenv/config'

const mongodbUri = process.env.MONGODB_URI

const connectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

export const mongoDBConnection = async () => {
  try {
    mongoose.connect(mongodbUri, connectionOptions)
    console.log('Connection with MongoDB correctly')
  } catch (e) {
    console.log(e)
  }
}