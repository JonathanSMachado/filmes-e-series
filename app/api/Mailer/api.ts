import mail from "@sendgrid/mail";
import { MessageObject } from "~/utils/types";

export async function sendAdminNotification(message: MessageObject) {
  try {
    const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY as string;
    mail.setApiKey(SENDGRID_API_KEY);

    if (!message.html && !message.text) {
      throw new Error(
        "É necessário informar o texto ou o html a ser enviado por e-mail"
      );
    }

    const MAIL_NOTIFICATION_RECIPIENT = process.env
      .MAIL_NOTIFICATION_RECIPIENT as string;

    message.to = MAIL_NOTIFICATION_RECIPIENT;
    message.from = MAIL_NOTIFICATION_RECIPIENT;

    await mail.send(message as mail.MailDataRequired);
  } catch (error: any) {
    throw new Error(error);
  }
}
