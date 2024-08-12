import type { Metadata } from "next"
import { Mulish } from "next/font/google"
import "./globals.css"
import Sidebar from "@/components/Sidebar"
import Providers from "./providers"

const mulish = Mulish({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Human Resource",
  description: "Dashboard for Manage Employee",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${mulish.className} bg-[#F7F8FC]`}>
        <Providers>
          <div className="h-full w-full">
            {/* Sidebar */}
            <Sidebar />

            <main>{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  )
}
