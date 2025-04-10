import type { Metadata } from "next";
import "@/styles/globals.css";
import Navbar from "@/components/navbar/navbar";
import { Provider } from "@/providers/themeProvider";
import { AuthProvider } from "@/providers/authProvider";
import { Toaster } from "@/components/ui/sonner";


export const metadata: Metadata = {
  title: "A3Ranker",
  description: "Ranking the best players at A3",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <AuthProvider>
        <body className="bg-background text-foreground">
          <Provider>
            <Navbar />
            <main>{children}</main>
            <Toaster richColors />
          </Provider>
        </body>
      </AuthProvider>
    </html>
  );
}
