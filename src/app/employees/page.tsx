"use client"

import { Button } from "@/components/ui/button"
import { ArrowUpWideNarrow, Filter } from "lucide-react"
import { DataTable } from "./table/data-table"
import { columns } from "./table/column"
import { employees } from "./table/data"
import { useEffect, useState } from "react"
import { Employee, SortEmployee } from "./table/types"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import axios from "axios"
import { dataTableInformation } from "@/helpers/generalHelper"

export default function Employees() {
  const [employeeData, setEmployeeData] = useState<Employee[]>([])
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [sorting, setSorting] = useState([])
  const [dataInformation, setDataInformation] = useState({
    from: 0,
    to: 0,
  })

  const {
    isPending,
    data: employeeResponse,
    isError,
    error,
    isFetching,
    refetch,
    isPlaceholderData,
  } = useQuery({
    queryKey: ["employees", page],
    queryFn: async () => {
      let queryParam = `?limit=${limit}&page=${page}`

      //--- sort by
      if (sorting.length > 0) {
        let sortColumns: string[] = []
        let sortDirections: string[] = []

        sorting.forEach((sort: SortEmployee) => {
          sortColumns.push(sort.columnId)
          sortDirections.push(sort.direction)
        })

        queryParam += "&sort_columns=" + sortColumns.join(",")
        queryParam += "&sort_directions=" + sortDirections.join(",")
      }

      const employeesResponse = await axios.get(
        "http://localhost:8000/api/v1/employees" + queryParam
      )
      return employeesResponse
    },
    placeholderData: keepPreviousData,
  })

  console.log("data ", employeeResponse?.data)

  useEffect(() => {
    refetch()

    if (employeeResponse?.data.data?.pagination) {
      const displayData = dataTableInformation(
        page,
        limit,
        employeeResponse?.data.data?.pagination
      )
      setDataInformation({
        from: displayData.from,
        to: displayData.to,
      })
    } else {
      setDataInformation({ from: 0, to: 0 })
    }
  }, [employeeResponse?.data.data?.pagination, limit, page, refetch, sorting])

  const employeesData = employeeResponse?.data?.data?.rows

  return (
    <div className="h-full w-full">
      <div className="py-8 mx-8 lg:ml-80 justify-end">
        <h1 className="text-2xl font-semibold">Halaman Karyawan</h1>

        <div className="w-100 px-6 py-8 h-fit bg-[#FFFFFF] mt-16 border rounded-lg">
          <div className="flex justify-between">
            <h2 className="text-xl font-medium">Data Karyawan</h2>
            <div className="flex gap-4">
              <div className="flex items-end gap-1">
                <ArrowUpWideNarrow color="#C6C7CD" />
                <span>Sort</span>
              </div>
              <div className="flex items-end gap-1">
                <Filter color="#C6C7CD" />
                <span>Filter</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 md:flex-row justify-between mt-12">
            <div className="flex gap-4">
              <Button>Tambah Karyawan</Button>
              <Button>Import CSV</Button>
            </div>
            <div className="flex gap-4">
              <Button>Ekspor ke CSV</Button>
              <Button>Ekspor ke PDF</Button>
            </div>
          </div>

          <div className="mt-12">
            <DataTable columns={columns} data={employeesData} />
          </div>
        </div>
      </div>
    </div>
  )
}
