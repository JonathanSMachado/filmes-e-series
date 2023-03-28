import { ActionFunction, useActionData } from "remix";
import { ContactForm, mutation, schema } from "~/components/ContactForm";
import Footer from "~/components/Footer";
import Header from "~/components/Header";
import { formAction } from "~/utils/forms";

export const action: ActionFunction = async ({ request }) =>
  formAction({
    request,
    schema,
    mutation,
  });

export default function Contact() {
  const submit = useActionData();

  return (
    <>
      <Header />
      <ContactForm submit={submit} />
      <Footer />
    </>
  );
}
