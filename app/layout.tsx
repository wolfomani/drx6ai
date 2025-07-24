import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryProvider } from "@/components/query-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dr.X AI Chat - المساعد الذكي",
  description: "تطبيق محادثة ذكية متقدم يدعم عدة نماذج ذكاء اصطناعي مع عرض التفكير الداخلي",
  keywords: ["AI", "Chat", "Arabic", "ذكاء اصطناعي", "محادثة"],
  authors: [{ name: "Dr.X AI Team" }],
  viewport: "width=device-width, initial-scale=1",
    generator: 'v0.dev'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            <TooltipProvider>
              <div className="min-h-screen bg-gray-950 text-white">
                <Toaster />
                {children}
              </div>
            </TooltipProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
