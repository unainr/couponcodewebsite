import SignInForm from "@/components/auth/sign-in-form";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const SignInPage = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

  if(!!session){
    redirect("/dashboard")
  }
    return (
        <>
    <SignInForm/>
        </>
    );
};

export default SignInPage;
