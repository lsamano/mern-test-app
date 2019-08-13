import User from '../models/user';

const index = (req, res) => {
  User.find((error, users) => {
    if (error) {
      return res.json({ success: false, error: error })
    } else {
      return res.json({ success: true, users: users })
    }
  })
}

const create = (req, res) => {
  const user = new User(req.body)
  user.save((error, newUser) => {
    if (error) {
      return res.json({ success: false, error: error })
    } else {
      return res.json({ success: true, user: newUser })
    }
  })
}

const show = (req, res) => {
  User.findById(req.params.id, (error, user) => {
    if (error) return res.json({ success: false, error })
    return res.json({ success: true, user })
  })
}

const update = (req, res) => {
  User.findById(req.params.id, (error, user) => {
    if (error) return res.json({ success: false, error: error })
    const { username, password, bio } = req.body
    if (username) user.username = username
    if (password) user.password = password
    if (bio) user.bio = bio
    user.save((error, savedUser) => {
      if (error) return res.json({ success: false, error: error })
      return res.json({ success: true, user: savedUser })
    })
  })
}

const destroy = (req, res) => {
  User.deleteOne({ _id:req.params.id }, error => {
    if (error) return res.json({ success: false, error })
    return res.json({ success: true })
  })
}

export default {
  index,
  create,
  show,
  update,
  destroy
}
