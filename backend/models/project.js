import mongoose from 'mongoose'

const Schema = mongoose.Schema

const ProjectsSchema = new Schema({
  name: String,
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  goal: Number
}, { timestamps: true } )

export default mongoose.model('Project', ProjectsSchema)
