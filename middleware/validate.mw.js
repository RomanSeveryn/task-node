const yup = require('yup')

const validationShema = yup.object({
  task: yup.string().trim().required()
})

module.exports = async (req, res, next) => {
  try {
    req.body = await validationShema.validate(req.body)
    next()
  } catch (error) {
    res.status(400).send(error.message)
  }
}