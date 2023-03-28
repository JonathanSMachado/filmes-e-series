import { makeDomainFunction } from "domain-functions";
import { z } from "zod";
import { Mailer } from "~/api/Mailer";
import { MessageObject } from "~/utils/types";
import { Form } from "../Form";

export const schema = z.object({
  name: z.string().min(3, {
    message: "Nome inválido. Por favor, confira se seu nome está correto!",
  }),
  email: z.string().email({ message: "E-mail inválido!" }),
  message: z
    .string()
    .min(10, { message: "A mensagem deve possuir no mínimo 10 caracteres!" }),
});

export const mutation = makeDomainFunction(schema)(async (values) => {
  const message: MessageObject = {
    subject: "Filmes e Séries - Novo contato",
    html: `
      <p>Nome: <strong>${values.name}</strong></p>
      <p>Email: <strong>${values.email}</strong></p>
      <p>Mensagem: <strong>${values.message}</strong></p>
    `,
  };

  try {
    await Mailer.sendAdminNotification(message);
  } catch (error) {
    throw "Ocorreu um problema ao enviar o contato. Por favor, tente novamente!";
  }

  return { status: "success" };
});

interface ContactProps {
  submit: { status: "success" | "error" };
}

export function ContactForm({ submit }: ContactProps) {
  return (
    <main className="flex-1 pt-7">
      {submit?.status === "success" ? (
        <h1 className="text-slate-200 text-xl">
          Obrigado. Em breve manteremos contato!! ❤️
        </h1>
      ) : (
        <>
          <h1 className="text-slate-200 text-xl">
            Entre em contato conosco preenchendo o formulário abaixo
          </h1>
          <Form
            schema={schema}
            mode="onChange"
            className="mt-8"
            buttonLabel="Enviar"
          >
            {({ Field, Errors, Button }) => (
              <>
                <Field name="name" label="Informe o seu nome" />
                <Field name="email" label="Informe seu melhor e-mail" />
                <Field
                  name="message"
                  label="Digite sua mensagem"
                  multiline={true}
                />
                <Errors />
                <Button type="submit" />
              </>
            )}
          </Form>
        </>
      )}
    </main>
  );
}
