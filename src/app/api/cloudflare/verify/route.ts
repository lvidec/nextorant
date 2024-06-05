import { TurnstileServerValidationResponse } from "@marsidev/react-turnstile";

export async function POST(req: Request) {
  const { token } = (await req.json()) as { token: string };
  console.log(token);

  const SECRET_KEY =
    process.env.NODE_ENV === "development"
      ? "1x0000000000000000000000000000000AA"
      : process.env.CLOUDFLARE_SECRET_KEY!;

  let formData = new FormData();
  formData.append("secret", SECRET_KEY);
  formData.append("response", token as string);

  const result = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      body: formData,
      method: "POST",
    }
  );

  const data = (await result.json()) as TurnstileServerValidationResponse;

  return new Response(JSON.stringify(data), {
    status: data.success ? 200 : 400,
    headers: {
      "content-type": "application/json",
    },
  });
}
