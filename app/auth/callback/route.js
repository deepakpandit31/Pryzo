import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      return NextResponse.redirect(new URL(next, request.url));
    }
  }

  // Return the user to an error page with instructions
  return NextResponse.redirect(new URL("/error", request.url));
}



// curl.exe -X POST https://pryzo.vercel.app/api/cron/check-prices -H "Authorization: Bearer 2e1c6587cb89b51e5f9d273c405c6228e1706d9aacf3e5dfd4a75783b5400d95"