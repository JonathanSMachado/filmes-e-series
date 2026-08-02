import type { ActionFunctionArgs } from "react-router";
import { redirect } from "react-router";
import { createSupabaseServerClient } from "~/utils/supabase.server";

export async function action({ request }: ActionFunctionArgs) {
  const { supabase, headers } = createSupabaseServerClient(request);
  const formData = await request.formData();
  const requestUrl = new URL(request.url);
  const redirectToPath = (formData.get("redirectTo") as string) || "/";
  const callbackUrl = `${requestUrl.origin}/api/auth/callback?next=${encodeURIComponent(redirectToPath)}`;

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: callbackUrl,
    },
  });

  if (error || !data.url) {
    return redirect(redirectToPath, { headers });
  }

  return redirect(data.url, { headers });
}

export async function loader() {
  return redirect("/");
}
