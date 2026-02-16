import { makeDomainFunction } from "domain-functions";
import z from "zod";
import { Mail } from "~/core/lib/Mail/Mail";

const contactSchema = z.object({
  name: z.string("O nome deve ser informado").min(3, "Nome muito curto"),
  email: z.email("E-mail inválido"),
  message: z
    .string("A mensagem deve ser informada")
    .min(10, "Mínimo de 10 caracteres"),
});

const contactMutation = makeDomainFunction(contactSchema)(async (values) => {
  const html = Object.entries(values)
    .map(([key, val]) => `<p>${key.toUpperCase()}: <strong>${val}</strong></p>`)
    .join("");

  const subject = "Files e Séries - Novo contato";
  const mailer = new Mail();
  const to = [ENV.MAIL_NOTIFICATION_RECIPIENT];

  return await mailer.sendAdminNotification({ subject, html, to });
});

export { contactMutation, contactSchema };
