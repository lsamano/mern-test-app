import User from '../models/user';

export const get_index = (req, res) => {
  User.find((error, users) => {
    if (error) {
      return res.json({ success: false, error: error })
    } else {
      return res.json({ success: true, users: users })
    }
  })
}

export const get_show = (req, res) => {
  User.findById(req.params.id, (error, user) => {
    if (error) return res.json({ success: false, error })
    return res.json({ success: true, user })
  })
}

export const post_index = (req, res) => {
  const user = new User(req.body)
  user.save((error, newUser) => {
    if (error) {
      return res.json({ success: false, error: error })
    } else {
      return res.json({ success: true, user: newUser })
    }
  })
}

export const put_show = (req, res) => {
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

export const delete_show = (req, res) => {
  User.deleteOne({ _id:req.params.id }, error => {
    if (error) return res.json({ success: false, error })
    return res.json({ success: true })
  })
}
