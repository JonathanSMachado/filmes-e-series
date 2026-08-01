import { redirect } from "react-router";
import { createSupabaseServerClient } from "~/utils/supabase.server";
import type { Route } from "./+types/api.auth.google.callback";

export async function loader({ request }: Route.LoaderArgs) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const next = requestUrl.searchParams.get("next") || "/";

  if (code) {
    const { supabase, headers } = createSupabaseServerClient(request);
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      return redirect(next, { headers });
    }
  }

  return redirect("/login?error=auth_failed");
}
