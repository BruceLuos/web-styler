import Navigation from "@/components/site/navigation";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Metadata } from "next";
import React from "react";

// 谷歌收录
export const metadata: Metadata = {
  title: "WebStyler",
  description: "Welcome to my webstyler application to build your website",
  other: {
    "google-site-verification": "FDc__kEO-ZyznGalvO0FsmHH8CEbsR_W7l7M_5qBC50",
    "robots": "noindex"
  },
};

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <main className="h-full">
        <Navigation />
        {children}
      </main>
    </ClerkProvider>
  );
};

export default layout;
