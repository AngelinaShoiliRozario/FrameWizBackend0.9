const express = require('express');
const router = express.Router();
const { signUp, sendOtp, otpView, postOtp, tobView, postTob,
    locationView, postLocation, pinView, postPin, dashboard, login, postLogin,
    forgottenPassword, postForgottenPassword, furtherOtp, postFurtherOtp, resetPin, postResetPin, resend, facebook, facebookCallback, google, googleCallback } = require('../controllers/authController');



// if we have same route but different controller then we can alo use this way
// router.route('/').get(getGoal).post(setGoal);

// signUp routes
router.get('/', signUp); // step 1
router.get('/signup', signUp); // step 1
//send OTP from signup   
router.post('/sendOtp', sendOtp);  //step 2: post signup
// viewing otp page
router.get('/otp/:id', otpView);//step 3: otp view
// matching otp value and send tob page
router.post('/postotp/:id', postOtp);//step 4: post Otp
//viewing pin page
router.get('/pin/:id', pinView);//step 5: ppin generation
router.post('/post_pin/:id', postPin);//step 6: ppin submission
// viewing tob page
router.get('/tob/:id', tobView); // step 7: type of business
router.post('/post_tob/:id', postTob);// step 8: post type of business
//viewing tob page
router.get('/location/:id', locationView);// step 9: get location
router.post('/post_location/:id', postLocation);// step 10: post location

//Login
router.get('/login', login); // step 1 : login page
router.post('/post_login', postLogin); // step 2: login post

router.get('/forgotten_password', forgottenPassword);// step 3: forgotten Password
router.post('/post_forgotten_password', postForgottenPassword);// step 4: post forgotten Password
// this is same after the resend 
router.get('/further_otp/:id', furtherOtp); // step 4: otp
router.post('/post_further_otp/:id', postFurtherOtp);// step 5: post otp
router.get('/reset_pin/:id', resetPin); // step 6: reset pin
router.post('/post_resetpin/:id', postResetPin); //step 7: post reset pin

router.get('/resend/:id', resend); //step: 1 resend pin // go to step 4


router.get('/dashboard/:user_id', dashboard);


router.get('/facebook',facebook);
router.get('/facebook/callback',facebookCallback, (req, res) => {
    try {
    let user = req.session.passport.user;
    console.log("user: ", user);
    res.redirect("/dashboard");
    }catch (e) {
        console.log(e.message);
        res.redirect("/auth/login");
    }
});

router.get('/google',google);
router.get('/google/callback',googleCallback, (req,res) => {
    try {
        let user = req.session.passport.user;
        console.log("user: ", user);
        res.redirect("/dashboard");
      } catch (err) {
        console.log(err.message);
        res.redirect("/auth/login"); // Handle errors by redirecting to the login page
      }
});


module.exports = router;