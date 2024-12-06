import nodemailer from "nodemailer";

interface ISendEmail {
  email: string;
  html: string;
  message: string;
  name: string;
}

async function sendEmail(props: ISendEmail) {
  let transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false,
    auth: {
      user: "jonaherrera90@hotmail.com",
      pass: "carrow13",
    },
  });

  let message = {
    from: "Jonathan",
    to: "sfafvafv",
    subject: "fvsfdvsdfv",
    name: props.name,
    html: `<h1>Contact Form</h1><br>
    <b>Name</b>: ${props.name}<br> 
    <b>Email</b>: ${props.email}<br>
    <b>Message</b>: ${props.html}`,
  };

  let info = await transporter.sendMail(message);
  return info;
}

export { sendEmail };