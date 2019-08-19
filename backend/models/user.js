import mongoose from 'mongoose'

const Schema = mongoose.Schema

const UsersSchema = new Schema({
  username: String,
  password: String,
  bio: String,
  googleId: String
}, { timestamps: true } )

export default mongoose.model('User', UsersSchema)
