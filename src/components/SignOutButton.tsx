"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export function SignOutButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      disabled={pending ? true : false}
      onClick={() =>
        signOut({
          callbackUrl: `${window.location.origin}`,
        })
      }
    >
      Sign out {pending ? "..." : ""}
    </Button>
  );
}
