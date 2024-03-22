import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Task Manager",
  description: "This application help you manage daily tasks effectively.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <div className="grid min-h-screen items-start gap-4 p-4 lg:items-start lg:gap-8 lg:p-6">
          <div className="w-full space-y-4">
            <Header />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
