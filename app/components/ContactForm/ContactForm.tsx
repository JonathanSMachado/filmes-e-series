import { Send } from "lucide-react";
import { Form, useNavigation } from "react-router";
import { Button } from "../Button";

export function ContactForm({ values, errors, globalError }: ContactFormProps) {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const getError = (path: string) =>
    errors?.find((e: any) => e.path[0] === path)?.message;

  return (
    <>
      <h1 className="text-slate-200 text-xl mb-10">
        Entre em contato conosco preenchendo o formulário abaixo
      </h1>

      <Form method="post" className="space-y-5">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-slate-400">Nome</label>
          <input
            name="name"
            placeholder="Digite seu nome"
            defaultValue={values?.name}
            className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
          />
          {getError("name") && (
            <span className="text-red-400 text-xs">{getError("name")}</span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-slate-400">E-mail</label>
          <input
            name="email"
            type="email"
            placeholder="seu@email.com"
            defaultValue={values?.email}
            className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
          />
          {getError("email") && (
            <span className="text-red-400 text-xs">{getError("email")}</span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-slate-400">Mensagem</label>
          <textarea
            name="message"
            rows={4}
            placeholder="Como podemos ajudar?"
            defaultValue={values?.message}
            className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-lg text-white outline-none focus:ring-2 focus:ring-cyan-500 transition-all resize-none"
          />
          {getError("message") && (
            <span className="text-red-400 text-xs">{getError("message")}</span>
          )}
        </div>

        {globalError ? (
          <p>
            <span className="text-red-400 text-xs">{globalError}</span>
          </p>
        ) : null}

        {/* <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Enviando..." : "Enviar Mensagem"}
        </button> */}
        <Button
          type="submit"
          variant="primary"
          isLoading={isSubmitting}
          icon={<Send />}
          className="w-full"
        >
          Enviar Mensagem
        </Button>
      </Form>
    </>
  );
}
