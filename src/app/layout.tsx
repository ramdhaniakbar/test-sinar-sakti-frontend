"use client"

import { Mulish } from "next/font/google"
import "./globals.css"
import Sidebar from "@/components/Sidebar"
import Providers from "./providers"
import { useEffect, useState } from "react"
import Head from "next/head"
import Navbar from "@/components/Navbar"

const mulish = Mulish({ subsets: ["latin"] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [isOpen, setOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setOpen(window.innerWidth > 1280)
    setIsMobile(window.innerWidth < 1280)

    const handleResize = () => {
      setOpen(window.innerWidth > 1280)
      setIsMobile(window.innerWidth < 1280)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <html lang="en">
      <Head>
        <title>"Human Resource"</title>,
        <meta name="Dashboard for Manage Employee" />
      </Head>
      <body className={`${mulish.className} bg-[#F7F8FC]`}>
        <Providers>
          <div className="h-full w-full">
            {/* Sidebar */}
            <Sidebar
              open={isOpen}
              onClose={() => setOpen(false)}
              isMobile={isMobile}
            />
            <div
              className={`h-full w-full ${
                isOpen && isMobile ? "blur-sm bg-white opacity-30 z-40" : ""
              }`}
            >
              <main>
                <Navbar
                  openNav={isOpen}
                  onOpenSideNav={() => setOpen(true)}
                  isMobile={isMobile}
                />
                {children}
              </main>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  )
}
