import { Tally3 } from "lucide-react"

export default function Navbar({
  openNav,
  onOpenSideNav,
  isMobile,
}: {
  openNav: boolean
  onOpenSideNav: () => void
  isMobile: boolean
}) {
  return (
    <div className={`sticky flex justify-end top-0 z-40 bg-[#F7F8FC] py-3`}>
      <div
        className={`bg-[#FFFFFF] flex flex-col xl:hidden px-[10px] py-[12px] md:px-3 md:py-[14px] sm:me-3 justify-center items-center border rounded-full flex-shrink-0 cursor-pointer w-fit`}
        onClick={onOpenSideNav}
      >
        <div className="rotate-90 -mb-1">
          <Tally3 className="w-4 h-4 sm:w-5 sm:h-5 xl:w-5 xl:h-5" />
        </div>
      </div>
    </div>
  )
}
