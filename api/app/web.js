module.exports = function (app) {

  var WebAppController      = require('./controllers/WebAppController');
  const { check }           = require('express-validator');
  const jwt                 = require('jsonwebtoken');
  const JWT_SECRET          = process.env.JWT_SECRET;
  
  function generateAccessToken(key) {
    // expires after half and hour (1800 seconds = 30 minutes)
      const accessToken = jwt.sign({ mobile: key }, JWT_SECRET, { expiresIn: '1800s' });
      return accessToken;
    }

  function authenticateToken(req, res, next) {
      const JWT_SECRET      = process.env.JWT_SECRET;
      // Gather the jwt access token from the request header
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[0];
      //console.log(authHeader.split(' '));
      if (token == null) return res.sendStatus(401) // if there isn't any token

      jwt.verify(token, JWT_SECRET, (err, mobile) => {
          if (err) return res.sendStatus(401)
          req.token = generateAccessToken(mobile);
          next() // pass the execution off to whatever request the client intended
      })
  }


  app
    .post('/web/login', [
      // check('email').trim().isEmail().withMessage('Enter valid email').isLength({ min: 1 }).withMessage('Enter email address'),
      check('email').trim().isLength({ min: 1 }).withMessage('Enter user id'),
       check('password').trim().isLength({ min: 1 }).withMessage('Enter password')
    ], WebAppController.login)

    .post('/web/create-data', [
      check('first_name').trim().isLength({ min: 1 }).withMessage('Enter first name'),
      check('last_name').trim().isLength({ min: 1 }).withMessage('Enter last name'),
      check('mobile').trim().isLength({ min: 1 }).withMessage('Enter mobile'),
      check('area').trim().isLength({ min: 1 }).withMessage('Enter area'),
      check('existing_broadband').trim().isLength({ min: 1 }).withMessage('Enter existing broadband'),
      check('lead_type').trim().isLength({ min: 1 }).withMessage('Enter lead type'),
    ], WebAppController.create_data)

    .post('/web/list-data', [
    ], WebAppController.list_data)
}
