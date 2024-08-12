"use client"

import { Book, ChartPie, PieChart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"

export default function Sidebar() {
  const [openSidebar, setOpenSidar] = useState(true)
  const sidebarRef = useRef<HTMLDivElement>(null)
  const router = usePathname()

  useEffect(() => {
    window.addEventListener("resize", () =>
      window.innerWidth < 1024 ? setOpenSidar(false) : setOpenSidar(true)
    )
  }, [])

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        window.innerWidth < 1024 && // Check screen width is below "xl"
        openSidebar
      ) {
        setOpenSidar(false) // Close the sidebar if click is outside of it
      }
    }

    document.addEventListener("mousedown", handleOutsideClick)

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick)
    }
  }, [openSidebar])

  return (
    <div
      className={`w-72 xl:block duration-175 linear !z-50 absolute h-full overflow-auto transition-all bg-[#363740] lg:!z-50 xl:!z-50 2xl:!z-0 ${
        openSidebar ? "translate-x-0" : "-translate-x-96"
      }`}
    >
      <div className="flex justify-center gap-4 px-4 py-8">
        <Image
          src={`/images/logo.png`}
          alt="Logo Sidebar"
          width={32}
          height={32}
        />
        <h1 className="text-[#A4A6B3] text-xl font-semibold">Human Resource</h1>
      </div>

      <div className="flex flex-col cursor-pointer">
        <Link href={"/"}>
          <div
            className={`flex flex-row items-center py-5 px-6 w-full justify-between ${
              router == "/" ? "bg-[#3F4049]" : "hover:bg-[#3F4049]"
            }`}
            style={
              router == "/"
                ? { borderLeft: "solid #DDE2FF 3px" }
                : { borderLeft: "none" }
            }
          >
            <div className="flex flex-row space-x-4 items-center">
              <ChartPie
                size={20}
                color={router == "/" ? "#DDE2FF" : "#9FA2B4"}
              />
              <span
                className={`font-light text-base flex ${
                  router == "/"
                    ? "text-[#DDE2FF]"
                    : "text-[#9FA2B4] hover:text-[#DDE2FF]"
                }`}
              >
                Dashboard
              </span>
            </div>
          </div>
        </Link>
        <Link href={"/employees"}>
          <div
            className={`flex flex-row items-center py-5 px-6 w-full justify-between ${
              router == "/employees" ? "bg-[#3F4049]" : "hover:bg-[#3F4049]"
            }`}
            style={
              router == "/employees"
                ? { borderLeft: "solid #DDE2FF 3px" }
                : { borderLeft: "none" }
            }
          >
            <div className="flex flex-row space-x-4 items-center">
              <Book
                size={20}
                color={router == "/employees" ? "#DDE2FF" : "#9FA2B4"}
              />
              <span
                className={`font-light text-base flex ${
                  router == "/employees"
                    ? "text-[#DDE2FF]"
                    : "text-[#9FA2B4] hover:text-[#DDE2FF]"
                }`}
              >
                Karyawan
              </span>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}
