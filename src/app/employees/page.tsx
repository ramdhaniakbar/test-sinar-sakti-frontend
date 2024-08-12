"use client"

import { Button } from "@/components/ui/button"
import { ArrowDownWideNarrow, ArrowUpWideNarrow, Filter } from "lucide-react"
import { ChangeEvent, useEffect, useState } from "react"
import { useMutation, useQuery } from "@tanstack/react-query"
import axios from "axios"
import { dataTableInformation } from "@/helpers/generalHelper"
import EmployeeTableInstance from "./table/column"
import Image from "next/image"
import Link from "next/link"

export default function Employees() {
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [sorting, setSorting] = useState<any[]>([])
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

      if (sorting.length > 0) {
        const sortColumns = sorting.map((sort) => sort.columnId)
        const sortDirections = sorting.map((sort) => sort.direction)

        queryParam += `&sort_columns=${sortColumns.join(",")}`
        queryParam += `&sort_directions=${sortDirections.join(",")}`
      }

      const employeesResponse = await axios.get(
        `http://localhost:8000/api/v1/employees${queryParam}`
      )
      return employeesResponse
    },
  })

  const { mutate } = useMutation({
    mutationFn: async (id: number) => {
      return axios.delete(`http://localhost:8000/api/v1/employee?id=${id}`)
    },
    onSuccess: () => {
      refetch()
    },
    onError: (error) => {
      console.log(error)
    },
  })

  const handleSortClick = (columnId: string) => {
    const existingSort = sorting.find((sort) => sort.columnId === columnId)
    const newDirection = existingSort
      ? existingSort.direction === "asc"
        ? "desc"
        : "asc"
      : "asc"

    const newSorting = sorting.filter((sort) => sort.columnId !== columnId)
    newSorting.push({ columnId, direction: newDirection })
    setSorting(newSorting)
  }

  const handleLimitChange = (e: ChangeEvent<any>) => {
    const newLimit = parseInt(e.target.value)
    setLimit(newLimit)
    setPage(1)
  }

  const handleDelete = (id: number) => {
    mutate(id)
  }

  useEffect(() => {
    refetch()

    if (employeeResponse?.data?.data?.pagination) {
      const displayData = dataTableInformation(
        page,
        limit,
        employeeResponse?.data?.data?.pagination
      )
      setDataInformation({
        from: displayData.from,
        to: displayData.to,
      })
    } else {
      setDataInformation({ from: 0, to: 0 })
    }
  }, [employeeResponse?.data?.data?.pagination, limit, page, sorting])

  const employeesData = employeeResponse?.data?.data?.rows || []

  return (
    <div className="h-full w-full">
      <div className="py-8 mx-8 lg:ml-80 justify-end">
        <h1 className="text-2xl font-semibold">Halaman Karyawan</h1>

        <div className="w-100 px-6 py-8 h-fit bg-[#FFFFFF] mt-16 border rounded-lg">
          <div className="flex justify-between">
            <h2 className="text-xl font-medium">Data Karyawan</h2>
            <div className="flex gap-4">
              <div
                className="flex items-end gap-1 cursor-pointer"
                onClick={() => handleSortClick("nama")}
              >
                {sorting.length > 0 && sorting[0].direction == "asc" ? (
                  <ArrowUpWideNarrow color="#C6C7CD" />
                ) : (
                  <ArrowDownWideNarrow color="#C6C7CD" />
                )}
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
              <Link href={"/employees/create"}>
                <Button>Tambah Karyawan</Button>
              </Link>
              <Button>Import CSV</Button>
            </div>
            <div className="flex gap-4">
              <Button>Ekspor ke CSV</Button>
              <Button>Ekspor ke PDF</Button>
            </div>
          </div>

          <div className="my-12">
            <EmployeeTableInstance
              tableData={employeesData}
              deleteEmployee={handleDelete}
            />
          </div>

          <div className="flex justify-end gap-8">
            <div className="flex">
              <span>Rows per page</span>
              <select name="" id="" value={limit} onChange={handleLimitChange}>
                {[5, 10, 25, 50, 100]?.map((pageSize) => (
                  <option key={pageSize} value={pageSize}>
                    {pageSize}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-4">
              <span>
                {dataInformation.from} - {dataInformation.to} of{" "}
                {employeeResponse?.data?.data?.pagination?.count_data}
              </span>
              <div className="flex gap-2">
                <button
                  disabled={page === 1}
                  onClick={() => setPage((old) => Math.max(old - 1, 1))}
                  className="cursor-pointer"
                >
                  <Image
                    src={`/svgs/arrow_left.svg`}
                    alt="arrow left"
                    width={20}
                    height={20}
                  />
                </button>
                <button
                  disabled={
                    isPlaceholderData ||
                    page ===
                      employeeResponse?.data?.data?.pagination?.total_page ||
                    !employeeResponse?.data?.data?.pagination?.count_data
                  }
                  className="cursor-pointer"
                  onClick={() => {
                    if (!isPlaceholderData) {
                      setPage((old) => old + 1)
                    }
                  }}
                >
                  <Image
                    src={`/svgs/arrow_right.svg`}
                    alt="arrow right"
                    width={20}
                    height={20}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
