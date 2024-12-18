// middlewares/validateRequest.js
module.exports = (schema) => {
    return (req, res, next) => {
      console.log(req.body)
      const { error } = schema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
      next();
    };
  };
  