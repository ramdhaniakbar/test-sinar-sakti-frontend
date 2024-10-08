"use client"

import { Book, ChartPie, PieChart, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"

export default function Sidebar({
  open,
  onClose,
  isMobile,
}: {
  open: boolean
  onClose: React.MouseEventHandler<HTMLSpanElement>
  isMobile: boolean
}) {
  const [openSidebar, setOpenSidebar] = useState(open)
  const sidebarRef = useRef<HTMLDivElement>(null)
  const router = usePathname()

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1280) {
        setOpenSidebar(false)
      } else {
        setOpenSidebar(true)
      }
    }

    window.addEventListener("resize", handleResize)
    handleResize() // Ensure the sidebar state is correct on initial load

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        window.innerWidth < 1280 && // Check screen width is below "xl"
        openSidebar
      ) {
        setOpenSidebar(false) // Close the sidebar if click is outside of it
      }
    }

    document.addEventListener("mousedown", handleOutsideClick)

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick)
    }
  }, [openSidebar])

  return (
    <div
      ref={sidebarRef}
      className={`fixed top-0 left-0 w-72 lg:block duration-175 linear !z-50 h-screen overflow-auto transition-all bg-[#363740] ${
        open ? "translate-x-0" : "-translate-x-96"
      }`}
    >
      <span
        className="absolute top-4 right-4 block cursor-pointer xl:hidden"
        onClick={onClose}
      >
        <X color="white" className="w-4 h-4" />
      </span>
      <div className="flex justify-center gap-4 px-4 pt-12 pb-8">
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
              router === "/" ? "bg-[#3F4049]" : "hover:bg-[#3F4049]"
            }`}
            style={
              router === "/"
                ? { borderLeft: "solid #DDE2FF 3px" }
                : { borderLeft: "none" }
            }
          >
            <div className="flex flex-row space-x-4 items-center">
              <ChartPie
                size={20}
                color={router === "/" ? "#DDE2FF" : "#9FA2B4"}
              />
              <span
                className={`font-light text-base flex ${
                  router === "/"
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
              router.startsWith("/employees")
                ? "bg-[#3F4049]"
                : "hover:bg-[#3F4049]"
            }`}
            style={
              router.startsWith("/employees")
                ? { borderLeft: "solid #DDE2FF 3px" }
                : { borderLeft: "none" }
            }
          >
            <div className="flex flex-row space-x-4 items-center">
              <Book
                size={20}
                color={router.startsWith("/employees") ? "#DDE2FF" : "#9FA2B4"}
              />
              <span
                className={`font-light text-base flex ${
                  router.startsWith("/employees")
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
