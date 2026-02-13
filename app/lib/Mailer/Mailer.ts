import { Resend } from "resend";
import type { MessageObject } from "~/utils/types";

export class Mailer {
  async sendAdminNotification({ subject, html, to }: MessageObject) {
    try {
      if (!to || !html)
        throw new Error(
          "Verifique se os parâmetros obrigatórios 'to' e 'html' foram fornecidos corretamente",
        );
      const resend = new Resend(ENV.RESEND_API_KEY);
      const { data, error } = await resend.emails.send({
        from: "Filmes e Séries <onboarding@resend.dev>",
        to,
        subject,
        html,
      });
      if (error) {
        throw new Error("Falha ao enviar o e-mail através do provedor.");
      }
      return { success: true, id: data?.id };
    } catch (err) {
      return {
        success: false,
        message:
          "Não foi possível enviar sua mensagem agora. Tente novamente mais tarde.",
      };
    }
  }
}
