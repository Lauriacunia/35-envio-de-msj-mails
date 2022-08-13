import express from "express";
import nodemailer from "nodemailer";
import "dotenv/config";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.html");
});

app.get("/email", async (req, res) => {
  // para enviar un correo a un user
  // Objeto de configuración-> poné las credenciales de tu registro.

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: process.env.USER_ETHEREAL,
      pass: process.env.PASS_ETHEREAL,
    },
  });

  // Ejecuta el envío del correo
  await transporter.sendMail({
    from: '"Laurita 👻"',
    to: "test@gmail.com",
    subject: "Email de prueba",
    text: "Hello world?",
    html: "<b>Hello world?</b>",
  });
  res.send("Email enviado");
});

app.post("/registro", async (req, res) => {
  const { nombre, apellido, email, password } = req.body;

  let htmlTemplate = `
    <h1>Bienvenido ${nombre} ${apellido}</h1>
    <p>
      Su correo ${email} ha sido registrado con éxito.
    </p>
  `;

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: process.env.USER_ETHEREAL,
      pass: process.env.PASS_ETHEREAL,
    },
  });

  // Ejecuta el envío del correo
  const sendedEmail = await transporter.sendMail({
    from: '"Laurita 👻"',
    to: email,
    subject: "Email de prueba",
    text: "Hello world?",
    html: htmlTemplate,
  });
  res.send("Email enviado");
});

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () =>
  console.log(
    `🚀 Server started on PORT ${PORT} at ${new Date().toLocaleString()}`
  )
);
server.on("error", (err) => console.log(err));
