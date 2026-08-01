import type { ActionFunctionArgs } from "react-router";
import { redirect } from "react-router";
import { createSupabaseServerClient } from "~/utils/supabase.server";

export async function action({ request }: ActionFunctionArgs) {
  const { supabase, headers } = createSupabaseServerClient(request);
  const requestUrl = new URL(request.url);

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${requestUrl.origin}/api/auth/google/callback`,
    },
  });

  if (error) {
    return { error: error.message };
  }

  return redirect(data.url, { headers });
}

export async function loader() {
  return redirect("/");
}
