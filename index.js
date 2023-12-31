
const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const session = require('express-session'); 
const flash = require('connect-flash'); 
const https = require('https');
const path = require('path');
const fs = require('fs');
const passport = require("passport");
const {  facebook, facebookCallback, google, googleCallback } = require('./controllers/authController');


require("dotenv").config();
require("./config/passport-facebook");
require("./config/passport-google");

const key = fs.readFileSync('private.key');
const cert = fs.readFileSync('certificate.crt');
let ca = fs.readFileSync('ca_bundle.crt');


// const buttonRoutes = require("./routes/buttonRoutes");
const connectDB = require('./config/db');

const cred = {
  key,
  cert, ca
}

// passport session middleware start
app.use(
  session({
    secret: "your-secret-key", // Replace with a strong secret
    resave: true,
    saveUninitialized: true,
  })
);
passport.serializeUser(function (user, cb) {
  cb(null, user);
});
passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});
app.use(passport.initialize());
app.use(passport.session());
// passport session middleware end


app.use(express.static('public'));
app.use(express.static('assets'));
const corsOptions = {
  origin: ['https://phpstack-858192-4120901.cloudwaysapps.com/', 'https://phpstack-858192-4120901.cloudwaysapps.com/pagebuilderztrios'],
};
app.use(cors({corsOptions}));




connectDB();

app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({ 
  secret: 'mysecret123',
  resave:true,
  saveUninitialized: true
}));

app.use(flash());
// Middleware to pass req to all EJS templates
app.use((req, res, next) => {
  res.locals.req = req;
  res.locals.__dirname = __dirname; //for passing values to ejs from here
  next();
});

app.get('/', (req, res) => {
  res.redirect('/auth');
});

// app.get('/contact', (req, res) => {
 
// 	res.send(req.flash('succ'));
// });
// app.set('views', __dirname + '/views');

// Define a route to render a view
app.use("/buttons", require("./routes/buttonRoutes"));
app.use("/sections", require("./routes/createSectionRoutes"));
app.use('/auth', require('./routes/authRoute'));
app.use('/api/templates', require('./routes/templateRoutes'));
app.use('/api/user_template_info', require('./routes/userTemplateInfoRoutes'));
app.use('/inventory',require('./routes/productRoutes'));
app.use('/service',require('./routes/serviceRoutes'));
app.use('/user',require('./routes/userRoutes'));


// app.get("/auth/facebook", passport.authenticate("facebook"));

// app.get(
//   "/auth/facebook/callback",
//   passport.authenticate("facebook", { failureRedirect: "/login" }),
//   function (req, res) {
//     //sucessful Redirect
//     let user = req.session.passport.user;
//     console.log("user: ", user);
//     res.redirect("/success");
//   }
// );

// app.get(
//   "/auth/google",
//   google
// );

// app.get(
//   "/auth/google/callback",
//   passport.authenticate("google", { failureRedirect: "/login" }),
//   function (req, res) {
//     let user = req.session.passport.user;
//     console.log("user: ", user);
//     res.redirect("/success");
//   }
// );

app.get("/success", function (req, res) {
  let user = req.session.passport.user;
  console.log("success user: ", user);
  res.send(user.id);
});
app.get("/signout", function (req, res) {
  try {
    req.session.destroy(function (err) {
      console.log("session destroyed");
    });
    res.redirect("/login");
  } catch (err) {
    console.log("error: ", err);
  }
});


// routes
// app.post("/post_btn_data", upload.single("btn_img"), (req, res) => {
 
//   const btnCategory = req.body.btn_category;
//   const btnCode = req.body.btn_code;
//   const status = req.body.status;

//   const btnImage = req.file;

//   if (btnImage) {
//     const { filename, path } = btnImage;
//     const imageUrl = `/uploads/${filename}`; // URL where the image can be accessed

//     // Save the image URL to the database
//   const button = buttonModel.create({
//       category: btnCategory,
//       code:btnCode,
//       status:1,
//       btn_img_url: imageUrl, // Store the image URL in the database
//     });
    
//     res.status(200).json(button);
   
//   } else {
//     // No image was uploaded
//     console.log("No image uploaded.");
//     res.status(400).json({ error: "No image uploaded" });
//   }
// });
// app.use("/", buttonRoutes); // GET all products

// app.listen(3000, () => {
//   console.log(`Example app listening on port ${port}`);
// });

const httpsServer = https.createServer(cred, app)
httpsServer.listen(8443);