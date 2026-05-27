import { Geist_Mono, Inter } from "next/font/google"

import "./globals.css"

import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

//====== NAVLINKS  ===========
const navLinks = [
  { title: "Home", path: "/" },
  { title: "About Page", path: "/about" },
]

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        inter.variable
      )}
    >
      <body>
        <ThemeProvider>
          <header className="flex h-16 items-center border-b">
            <nav className="flex">
              {/* <Button asChild variant="ghost">
                <Link href="/">Home</Link>
                {/* <a href="/">Home</a> * /}
              </Button>
              <Button asChild variant="ghost">
                <Link href="/about">About</Link>
                {/* <a href="/about">About</a> * /}
              </Button> */}

              {navLinks.map((link) => (
                <Button asChild variant="ghost" key={link.title}>
                  <Link href={link.path}>{link.title}</Link>
                </Button>
              ))}
            </nav>
          </header>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
