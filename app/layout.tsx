import { Poppins } from "next/font/google";
import { Josefin_Sans } from "next/font/google";
import { ThemeProvider } from "./utils/ThemeProvider";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Providers from "./providers";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Poppins",
});

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Josefin",
});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LearnWise",
  description: "Your learning platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${poppins.variable} ${josefin.variable} bg-background text-foreground dark:bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] dark:from-background dark:via-background/95 dark:to-background duration-300`}
      >
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
          >
            <div className="min-h-screen">{children}</div>
            <Toaster
              position="top-center"
              reverseOrder={false}
              toastOptions={{
                style: {
                  background: "hsl(var(--muted))",
                  color: "hsl(var(--muted-foreground))",
                  border: "1px solid hsl(var(--border))",
                },
              }}
            />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
