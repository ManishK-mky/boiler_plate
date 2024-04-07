var express = require('express');
const authController = require('../controllers/authController')

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Write /signup and /login in the url to check the working');
});


router.get('/signup', function(req, res) {
  res.render('signup'); // Corrected view file name to "signup"
});

router.get('/login' , function(req,res){
  res.render('login')
})


router.post('/signup' , authController.signup);
router.post('/login' , authController.login)

module.exports = router;
