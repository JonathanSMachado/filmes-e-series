import { ActionFunction, useActionData } from "remix";
import { ContactForm, mutation, schema } from "~/components/ContactForm";
import Layout from "~/layout/Layout";
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
    <Layout>
      <ContactForm submit={submit} />
    </Layout>
  );
}
