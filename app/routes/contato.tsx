import { ActionFunction, useActionData } from "remix";
import AppError from "~/components/AppError";
import { mutation, schema } from "~/components/ContactForm";
import ContactPage from "~/pages/contact";
import { formAction } from "~/utils/forms";

export const action: ActionFunction = async ({ request }) =>
  formAction({
    request,
    schema,
    mutation,
  });

export default function Contact() {
  const submit = useActionData();

  return <ContactPage submit={submit} />;
}

export function ErrorBoundary({ error }: { error: Error }) {
  return <AppError error={error} />;
}
