"use client";

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
import { authSchema } from "@/lib/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import * as React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";
import { Icons } from "./icon";
import { PasswordInput } from "./password-input";

type Inputs = z.infer<typeof authSchema>;

export default function SignInForm() {
  const [loading, setLoading] = React.useState(false);
  // const router = useRouter();

  // react-hook-form
  const form = useForm<Inputs>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: Inputs) {
    console.log(data);
    setLoading(true);
    try {
      // const { error, status } = await signIn({ ...data })
      // if (error && error?.message) {
      //   throw new Error(error?.message)
      // }
      // AuthErrorHandler(status)
      // router.push(`${window.location.origin}/`)
      toast.error("Try...");
    } catch (err) {
      toast.error(err as string);
    } finally {
      toast.error("Finally...");
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="text" placeholder="email@gmail.com" {...field} />
              </FormControl>
              <FormMessage className="dark:text-red-500" />
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
                <PasswordInput placeholder="**********" {...field} />
              </FormControl>
              <FormMessage className="dark:text-red-500" />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="mt-2 bg-neutral-900 text-neutral-50 shadow hover:bg-neutral-900/90 dark:bg-neutral-900 dark:text-neutral-50 dark:hover:bg-neutral-900/90"
          disabled={loading}
        >
          {loading && (
            // eslint-disable-next-line react/jsx-pascal-case
            <Icons.spinner
              className="mr-2 size-4 animate-spin text-white"
              aria-hidden="true"
            />
          )}
          Sign in
          <span className="sr-only">Sign in</span>
        </Button>
      </form>
    </Form>
  );
}
