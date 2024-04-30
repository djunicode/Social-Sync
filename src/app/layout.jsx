import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner"
import AuthChecker from "@/components/AuthChecker";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SociaLSync",
  description: "Made by DJ Unicode",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster/>
        {/* <AuthChecker/> */}
      </body>
    </html>
  );
}
