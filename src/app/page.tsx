"use client"

import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export default function Home() {
  const { data } = useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const employeesResponse = await axios.get(
        `http://localhost:8000/api/v1/dashboard`
      )
      return employeesResponse
    },
  })

  return (
    <div className="h-full w-full">
      <div className="py-8 mx-8 lg:ml-80 justify-end">
        <h1 className="text-2xl font-semibold">Halaman Dashboard</h1>

        <div className="flex gap-20">
          <div className="flex-1 px-6 py-8 bg-[#FFFFFF] mt-16 border rounded-lg h-full shadow-md">
            <div className="flex justify-center items-center">
              <div className="flex-col space-y-10 text-center">
                <span>Total Karyawan</span>
                <h1 className="text-4xl font-semibold">{data?.data.data.data_employees.kontrak_count}</h1>
              </div>
            </div>
          </div>
          <div className="flex-1 px-6 py-8 bg-[#FFFFFF] mt-16 border rounded-lg h-full shadow-md">
            <div className="flex justify-center items-center">
              <div className="flex-col space-y-10 text-center">
                <span className="text-[#3751FF]">Total Kontrak</span>
                <h1 className="text-4xl font-semibold text-[#3751FF]">{data?.data.data.data_employees.probation_count}</h1>
              </div>
            </div>
          </div>
          <div className="flex-1 px-6 py-8 bg-[#FFFFFF] mt-16 border rounded-lg h-full shadow-md">
            <div className="flex justify-center items-center">
              <div className="flex-col space-y-10 text-center">
                <span className="text-[#F1A22B]">Total Probation</span>
                <h1 className="text-4xl font-semibold text-[#F1A22B]">{data?.data.data.data_employees.total_count}</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
