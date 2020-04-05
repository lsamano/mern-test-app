import Project from '../models/project';

const index = (req, res) => {
  Project.find()
  .populate('owner', ['username', 'bio'])
  .exec((error, projects) => {
    if (error) return res.json({ success: false, error: error })
    return res.json({ success: true, projects })
  })
}

const create = (req, res) => {
  const project = new Project(req.body)
  project.save((error, newProject) => {
    if (error) return res.json({ success: false, error: error })
    return res.json({ success: true, project: newProject })
  })
}

const show = (req, res) => {
  Project.findById(req.params.id)
  .populate('owner', ['username', 'bio'])
  .exec((error, project) => {
    if (error) return res.json({ success: false, error })
    return res.json({ success: true, project })
  })
}

const update = (req, res) => {
  Project.findById(req.params.id, (error, project) => {
    if (error) return res.json({ success: false, error })
    const { name, owner, goal, description } = req.body
    if (name) project.name = name
    if (owner) project.owner = owner
    if (goal) project.goal = goal
    if (description) project.description = description
    project.save((error, savedProject) => {
      if (error) return res.json({ success: false, error })
      return res.json({ success: true, project: savedProject })
    })
  })
}

const destroy = (req, res) => {
  Project.deleteOne({ _id:req.params.id }, error => {
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
