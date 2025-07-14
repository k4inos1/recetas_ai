import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Recetapps - Tu Buscador de Recetas",
  description: "Descubre y guarda tus recetas favoritas de todo el mundo",
  keywords: ["recetas", "cocina", "comida", "gastronomía", "internacional"],
  authors: [{ name: "Ricardo" }],
  openGraph: {
    title: "Recetapps - Tu Buscador de Recetas",
    description: "Descubre y guarda tus recetas favoritas de todo el mundo",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
