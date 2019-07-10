import Donation from '../models/donation';

export const index = (req, res) => {
  Donation.find()
  .populate('user')
  .populate('project')
  .exec((error, donations) => {
    if (error) {
      return res.json({ success: false, data: error })
    } else {
      return res.json({ success: true, donations: donations })
    }
  })
}

export const create = (req, res) => {
  const donation = new Donation(req.body)
  donation.save((error, newDonation) => {
    if (error) return res.json({ success: false, error: error })
    return res.json({ success: true, donation: newDonation })
  })
}

export const show = (req, res) => {
  Donation.findById(req.params.id, (error, donation) => {
    if (error) return res.json({ success: false, error })
    return res.json({ success: true, donation })
  })
}

export const update = (req, res) => {
  Donation.findById(req.params.id, (error, donation) => {
    if (error) return res.json({ success: false, error: error })
    const { amount } = req.body
    if (amount) donation.amount = amount
    donation.save((error, savedDonation) => {
      if (error) return res.json({ success: false, error: error })
      return res.json({ success: true, donation: savedDonation })
    })
  })
}
