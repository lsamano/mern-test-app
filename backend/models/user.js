import mongoose from 'mongoose'

const Schema = mongoose.Schema

const UsersSchema = new Schema({
  username: String,
  password: String,
  bio: String,
  given_name: String,
  family_name: String,
  googleId: String
}, { timestamps: true } )

export default mongoose.model('User', UsersSchema)
