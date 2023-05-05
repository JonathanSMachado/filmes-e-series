import { ActionFunction, useActionData } from "remix";
import AppError from "~/components/AppError";
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

export function ErrorBoundary({ error }: { error: Error }) {
  return <AppError error={error} />;
}
