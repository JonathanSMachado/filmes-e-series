import { ArrowLeft } from "lucide-react";
import { useActionData, type ActionFunctionArgs } from "react-router";
import { Button } from "~/components/Button";
import { ContactForm } from "~/components/ContactForm";
import { contactMutation } from "~/core/contact.server";
import { MainLayout } from "~/layouts/Main";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const result = await contactMutation(data);

  if (!result.success) {
    return {
      success: false,
      errors: result.inputErrors,
      globalError: result.environmentErrors?.[0]?.message,
      values: data,
    };
  }

  return { success: true };
}

export default function Contact() {
  const actionData = useActionData();

  return (
    <MainLayout>
      <div className="mt-7 max-w-xl mx-auto px-2">
        {actionData?.success ? (
          <>
            <h1 className="text-slate-200 text-xl text-center">
              Obrigado. Em breve manteremos contato!! ❤️
            </h1>

            <div className="mt-10">
              <Button
                to="/"
                variant="outline"
                className="w-full"
                icon={<ArrowLeft />}
              >
                Voltar para o início
              </Button>
            </div>
          </>
        ) : (
          <ContactForm
            values={actionData?.values}
            errors={actionData?.errors}
            globalError={actionData?.globalError}
          />
        )}
      </div>
    </MainLayout>
  );
}
