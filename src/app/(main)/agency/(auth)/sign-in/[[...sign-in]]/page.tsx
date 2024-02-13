import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { SignIn } from "@clerk/nextjs";
import { AlertCircle } from "lucide-react";
import React from "react";

const Page = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <Alert className=" mb-2 w-[25rem]">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          You Can Use The Test Account to Login
          <p>Account: test@qq.com</p>
          <p>Password: test</p>
        </AlertDescription>
      </Alert>
      <SignIn />
    </div>
  );
};

export default Page;
