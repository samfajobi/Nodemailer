const express = require("express");
//const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const exphbs = require("express-handlebars");
const path = require("path");

const app = express();

app.engine(
  "hbs",
  exphbs({
    extname: "hbs",
    defaultLayout: false,
    layoutsDir: "views/layouts/",
  })
);

app.set("view engine", "hbs");

app.use("/public", express.static(path.join(__dirname, "public")));

// new way to use body-Parser since it's now depreciated
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", (req, res) => {
  res.render("contact");
});

app.post("/send", (req, res) => {
  //console.log(req.body)

  const formValues = `
   <p>Hey!! You've got some message in your email.</p>
   <p>Message Details: </p>
   <ul>
      <li>Name: ${req.body.name}</li>
      <li>Email: ${req.body.email}</li>
      <li>Phone Number: ${req.body.phone}</li>
   </ul>
   <h3>Message: </h3>
   <p>${req.body.message}</p>

   `;

    let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "johann.hoppe59@ethereal.email", // generated ethereal user
      pass: "AQPS9MWcgHExhRRQnf", // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  // send mail with defined transport object
  // let info =  transporter.sendMail({
  //   from: '"NodeMailerContact" <johann.hoppe59@ethereal.email>', // sender address
  //   to: "segzyfaj1@gmail.com", // list of receivers
  //   subject: "Hello ✔", // Subject line
  //   text: "Hello world?", // plain text body
  //   html: formValues, // html body
  // });

  let mailOptions = {
    from: '"NodeMailerContact" <johann.hoppe59@ethereal.email>', // sender address
    to: "segzyfaj1@gmail.com, fajobiolusegun99@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: formValues, // html body
  }

  transporter.sendMail(mailOptions, (error, info) => {

     if (error) {
       return console.log(error)
     }


    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

    res.render("contact", {
      message: "Message has been delivered Successfully!!"});

  });
  
});


const PORT = 4000;

app.listen(PORT, () => console.log("Server Started on PORT 4000"));
