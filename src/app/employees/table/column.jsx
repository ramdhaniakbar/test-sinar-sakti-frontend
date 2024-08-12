import moment from "moment"
import { useMemo } from "react"
import { useTable } from "react-table"
import { EmployeeTableLayout } from "./data-table"
import { useRouter } from "next/navigation"

const EmployeeTableInstance = ({ tableData = [], deleteEmployee }) => {
  const router = useRouter()

  const handleChange = (e, id) => {
    const selectedValue = e.target.value

    if (selectedValue != "/delete") {
      router.push("/employees" + selectedValue)
    } else {
      deleteEmployee(id)
    }
  }

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
          let fotoEmployee = cell.row.original.foto.startsWith("https")
            ? cell.row.original.foto
            : "http://localhost:8000/" + cell.row.original.foto
          return (
            <img
              src={fotoEmployee}
              alt={cell.row.original.nama}
              width={100}
              height={100}
            />
          )
        },
      },
      {
        Header: "Status",
        accessor: "status",
        size: 150,
        Cell: ({ cell }) => {
          const status = cell.row.original.status.trim()

          const backgroundColor =
            status === "tetap"
              ? "#3751FF"
              : status === "kontrak"
              ? "#F1A22B"
              : "#00FF00"

          return (
            <div
              className="flex justify-center px-4 py-2"
              style={{
                backgroundColor,
                textTransform: "uppercase",
                borderRadius: "50px",
                color: "#fff",
              }}
            >
              {status}
            </div>
          )
        },
      },
      {
        Header: "Action",
        minWidth: "100px",
        Cell: ({ cell }) => (
          <>
            <select onChange={(e) => handleChange(e, cell.row.original.id)}>
              <option value=''>Pilih Action</option>
              <option value={`/edit/${cell.row.original.id}`}>Edit</option>
              <option value="/delete">Delete</option>
            </select>
          </>
        ),
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

  return <EmployeeTableLayout {...tableInstance} />
}

export default EmployeeTableInstance
