import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function sendMail(data) {
  const message = {
    ...data,
    from: process.env.SENDGRID_FROM_EMAIL,
  };

  try {
    await sgMail.send(message);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
