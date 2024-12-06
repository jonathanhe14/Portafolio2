import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';

const emailTo = import.meta.env.EMAIL;
const emailToPass = import.meta.env.PASS;
const host = import.meta.env.HOST;

export const post: APIRoute = async ({ request }) => {
  console.log('request', request);

  if (request.headers.get('Content-Type') === 'application/json') {
    const formData = await request.json();
    const name = formData.name;
    const email = formData.email;
    const message = `${formData.message}
    ----------------------------------------------------------------------
    From: ${name} • email: ${email} 
    `;
    const html = `<div style="margin: 20px auto;font-family: Helvetica, Verdana, sans-serif">${message.replace(
      /[\r\n]/g,
      '<br>'
    )}</div>`;

    // Configuración de transporte de correo
    let mailTransporter = nodemailer.createTransport({
      service: 'hotmail',
      port: 587,
      secure: false,
      auth: {
        user: "jonaherrera90@hotmail.com", // Cambiar por tu correo
        pass: 'carrow13', // Cambiar por tu contraseña
      },
    });

    let mailDetails = {
      from: email,
      to: emailTo,
      subject: `${new URL(request.url).hostname}: Portafolio`,
      text: message,
      html,
    };

    try {
      // Verificar si el servidor de correo está disponible
      await mailTransporter.verify();
      console.log('Mail server is ready to send messages');

      // Enviar el correo
      const mailresult = await mailTransporter.sendMail(mailDetails);
      console.log('Message sent: %s', mailresult?.messageId);

      // Respuesta exitosa
      return new Response(JSON.stringify(mailDetails), {
        status: 200,
      });
    } catch (error: any) {
      console.error('Error sending email:', error.message);
      console.error('Stack trace:', error.stack);

      // Responder con error en caso de fallo
      return new Response(
        JSON.stringify({ error: 'Failed to send email', details: error.message }),
        { status: 500 }
      );
    }
  }

  // Si el tipo de contenido no es JSON, se responde con un error 400
  return new Response(
    JSON.stringify({ error: 'Invalid content type' }),
    { status: 400 }
  );
};
