const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  try {
    const token = req.header('Authorization');
    if (!token)
      return res.json({ success: false, msg: 'Invalid Authentication.' });

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err)
        return res.json({ success: false, msg: 'Invalid Authentication.' });

      req.user = user;
      next();
    });
  } catch (err) {
    return res.json({ success: false, msg: err.message });
  }
};

module.exports = auth;
