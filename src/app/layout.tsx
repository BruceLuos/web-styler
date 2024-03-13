import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { ThemeProvider } from "@/providers/theme-provider";
import ModalProvider from "@/providers/modal-provider";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnarToaster } from "@/components/ui/sonner";
import "./globals.css";

const font = DM_Sans({ subsets: ["latin"] });

// 谷歌收录
export const metadata: Metadata = {
  title: "WebStyler",
  applicationName: "WebStyler",
  authors: [{ name: "Bruceluo", url: "https://gitee.com/BruceLluo" }],
  description: "Welcome to my webstyler application to build your website",
  robots: {
    index: true,
    follow: true,
  },
  other: {
    "google-site-verification": "FDc__kEO-ZyznGalvO0FsmHH8CEbsR_W7l7M_5qBC50",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={font.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ModalProvider>
            {children}
            <Toaster />
            <SonnarToaster position="bottom-left" />
          </ModalProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
