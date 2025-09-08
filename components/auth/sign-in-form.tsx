"use client";
import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { signInSchema } from "@/lib/validation";
import { authClient } from "@/lib/auth-client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { LoaderCircle } from "lucide-react";

const SignInForm = () => {
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);
	const form = useForm<z.infer<typeof signInSchema>>({
		resolver: zodResolver(signInSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	// 2. Define a submit handler.
	function onSubmit(values: z.infer<typeof signInSchema>) {
		setError(null);
		setLoading(true);
		try {
			authClient.signIn.email(
				{
					email: values.email,
					password: values.password,
					callbackURL: "/dashboard",
				},
				{
					onSuccess: () => {
						setLoading(false);
					},

					onError: ({ error }) => {
						setError(error.message);
						setLoading(false);
					},
				}
			);
		} catch (error: any) {
			setError(error.message);
		}
	}


	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className=" w-full space-y-8">
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input placeholder="example@.com" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input placeholder="*************" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				{error && (
					<Alert variant="destructive">
						<AlertTitle>Error</AlertTitle>
						<AlertDescription>{error}</AlertDescription>
					</Alert>
				)}
				<Button disabled={loading} className="w-full" type="submit">
					{loading ? (
						<LoaderCircle className="w-4 h-4 animate-spin transition-all duration-100" />
					) : (
						"Sign in"
					)}
				</Button>
				
				{/* <div className="text-center text-sm">
					Don&apos;t have an account?{" "}
					<Link href="/sign-up" className="underline underline-offset-4">
						Sign up
					</Link>
				</div> */}
			</form>
		</Form>
	);
};

export default SignInForm;
