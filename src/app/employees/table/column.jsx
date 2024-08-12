import moment from "moment"
import { useMemo } from "react"
import { useTable } from "react-table"
import { EmployeeTableLayout } from "./data-table"

const EmployeeTableInstance = ({ tableData = [] }) => {
  const [columns, data] = useMemo(() => {
    const columns = [
      {
        Header: "Nama",
        accessor: "nama",
      },
      {
        Header: "Nomor",
        accessor: "nomor",
        size: 150,
      },
      {
        Header: "Jabatan",
        accessor: "jabatan",
        size: 150,
      },
      {
        Header: "Departemen",
        accessor: "departemen",
        size: 150,
      },
      {
        Header: "Tanggal Masuk",
        accessor: "tanggal_masuk",
        size: 150,
        Cell: ({ cell }) => {
          return moment(cell.row.original.tanggal_masuk).format("YYYY-MM-DD")
        },
      },
      {
        Header: "Foto",
        accessor: "foto",
        size: 150,
        Cell: ({ cell }) => {
          return (
            <img
              src={cell.row.original.foto}
              alt={cell.row.original.nama}
              width={50}
              height={50}
            />
          )
        },
      },
      {
        Header: "Status",
        accessor: "status",
        size: 150,
        Cell: ({ cell }) => {
          return (
            <div
              className={`flex justify-center uppercase px-4 py-2 text-white rounded-full ${
                cell.row.original.status == "tetap"
                  ? "bg-[#3751FF]"
                  : cell.row.original.status == "kontrak"
                  ? "bg-[#F1A22B]"
                  : "bg-[#00FF00]"
              }`}
            >
              {cell.row.original.status}
            </div>
          )
        },
      },
    ]
    const validatedData = Array.isArray(tableData) ? tableData : []
    return [columns, validatedData]
  }, [tableData])

  const tableInstance = useTable({
    columns,
    data,
    initialState: { hiddenColumns: ["id"] },
  })

  return (
    <EmployeeTableLayout {...tableInstance} />
  )
}

export default EmployeeTableInstance