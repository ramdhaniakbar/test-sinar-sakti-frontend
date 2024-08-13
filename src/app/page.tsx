"use client"

import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useEffect, useState } from "react"
import { PieChart, Pie, Tooltip, Cell, Legend } from "recharts"

export default function Home() {
  const [formattedData, setFormattedData] = useState<any>([])

  const { data } = useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const employeesResponse = await axios.get(
        `http://localhost:8000/api/v1/dashboard`
      )
      return employeesResponse
    },
  })

  useEffect(() => {
    const departemens: string[] = data?.data?.data?.departemens

    if (Array.isArray(departemens)) {
      const departmentCounts = departemens.reduce<Record<string, number>>(
        (acc, dept) => {
          acc[dept] = (acc[dept] || 0) + 1
          return acc
        },
        {}
      )
      const formatted = Object.keys(departmentCounts).map((key) => ({
        name: key,
        value: departmentCounts[key],
      }))
      setFormattedData(formatted)
    }
  }, [data])

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]

  return (
    <div className="h-full w-full">
      <div className="py-8 mx-8 xl:ml-80 justify-end">
        <h1 className="text-2xl font-semibold">Halaman Dashboard</h1>

        <div className="flex flex-col md:flex-row gap-2 md:gap-12 lg:gap-20 mb-12">
          <div className="flex-1 px-6 py-8 bg-[#FFFFFF] mt-16 border rounded-lg h-full shadow-md">
            <div className="flex justify-center items-center">
              <div className="flex-col space-y-10 text-center">
                <span>Total Karyawan</span>
                <h1 className="text-4xl font-semibold">
                  {data?.data.data.data_employees.total_count}
                </h1>
              </div>
            </div>
          </div>
          <div className="flex-1 px-6 py-8 bg-[#FFFFFF] mt-16 border rounded-lg h-full shadow-md">
            <div className="flex justify-center items-center">
              <div className="flex-col space-y-10 text-center">
                <span className="text-[#3751FF]">Total Kontrak</span>
                <h1 className="text-4xl font-semibold text-[#3751FF]">
                  {data?.data.data.data_employees.kontrak_count}
                </h1>
              </div>
            </div>
          </div>
          <div className="flex-1 px-6 py-8 bg-[#FFFFFF] mt-16 border rounded-lg h-full shadow-md">
            <div className="flex justify-center items-center">
              <div className="flex-col space-y-10 text-center">
                <span className="text-[#F1A22B]">Total Probation</span>
                <h1 className="text-4xl font-semibold text-[#F1A22B]">
                  {data?.data.data.data_employees.probation_count}
                </h1>
              </div>
            </div>
          </div>
        </div>

        <PieChart width={400} height={400}>
          <Pie
            dataKey="value"
            isAnimationActive={false}
            data={formattedData}
            cx="50%"
            cy="50%"
            outerRadius={140}
            fill="#8884d8"
            // label
          >
            {formattedData.map((entry: any, index: number) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    </div>
  )
}
