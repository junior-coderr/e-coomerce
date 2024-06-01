"use client";
import Link from "next/link";
import { use, useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function Order() {
  const { data: session, status } = useSession();

  if (status === "authenticated") {
    return <p>Signed in as {session.user.email}</p>;
  }

  return <a href="/register/signup">Sign in</a>;
}
