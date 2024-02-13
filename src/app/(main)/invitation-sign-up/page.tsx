"use client";
import Loading from "@/components/global/loading";
import { Button } from "@/components/ui/button";
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Card,
} from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { useSignUp } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// https://clerk.com/docs/custom-flows/invitations
// https://clerk.com/docs/custom-flows/use-sign-up#usage
/** 使用useSignUp进行邀请用户验证处理(可用可不用) */
export default function SignUpStep() {
  const { signUp } = useSignUp();
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const param = "__clerk_ticket";
  const ticket = new URL(window.location.href).searchParams.get(
    param
  ) as string;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const userDataSchema = z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
  });

  /** 用户信息表单 */
  const form = useForm<z.infer<typeof userDataSchema>>({
    resolver: zodResolver(userDataSchema),
    mode: "onChange",
    defaultValues: {
      firstName: "",
      lastName: "",
    },
  });

  /** 提交用户信息更改 */
  const onSubmit = async (values: z.infer<typeof userDataSchema>) => {
    console.log("values", values);
    try {
      const response = await signUp?.create({
        strategy: "ticket",
        ticket,
        firstName: values.firstName,
        lastName: values.lastName,
      });
      console.log("response", response);
      if (response) {
        const emailAddress = response.emailAddress;
        router.push(`agency/sign-up?emailAddress=${emailAddress}`);
      }
    } catch (e: any) {
      console.error("error", e, e.stack);
      toast({
        variant: "destructive",
        title: "Failed",
        description: "Some Error ",
      });
    }
  };

  if (!isMounted) return;

  return (
    <div className=" absolute top-0 left-0 bottom-0 right-0">
      <Card className=" w-[50%] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <CardHeader>
          <CardTitle>User Details</CardTitle>
          <CardDescription>Add User Name</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                disabled={form.formState.isSubmitting}
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>User first name</FormLabel>
                    <FormControl>
                      <Input required placeholder="First Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                disabled={form.formState.isSubmitting}
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>User last name</FormLabel>
                    <FormControl>
                      <Input required placeholder="Last Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button disabled={form.formState.isSubmitting} type="submit">
                {form.formState.isSubmitting ? (
                  <Loading />
                ) : (
                  "Save User Details"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
