import { ContactForm } from "~/components/ContactForm";
import Layout from "~/layout/Layout";

interface ContactProps {
  submit: {
    status: string;
  };
}

export default function ContactPage(props: ContactProps) {
  const { submit } = props;

  return (
    <Layout>
      <div className="mt-7 max-w-xl mx-auto px-2">
        {submit?.status === "success" ? (
          <h1 className="text-slate-200 text-xl text-center">
            Obrigado. Em breve manteremos contato!! ❤️
          </h1>
        ) : (
          <>
            <h1 className="text-slate-200 text-xl">
              Entre em contato conosco preenchendo o formulário abaixo
            </h1>
            <ContactForm />
          </>
        )}
      </div>
    </Layout>
  );
}
