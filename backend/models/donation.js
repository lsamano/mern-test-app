import mongoose from 'mongoose'

const Schema = mongoose.Schema

const DonationsSchema = new Schema({
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    project: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Project'
    },
    amount: Number
  }, { timestamps: true } )

export default mongoose.model('Donation', DonationsSchema)
