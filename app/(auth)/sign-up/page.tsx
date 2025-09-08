import SignUpForm from "@/components/auth/sign-up-form";
import NotFoundPage from "@/components/no-found";
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
<NotFoundPage/>
        {/* <SignUpForm/> */}
        </>
    );
};

export default SignInPage;
