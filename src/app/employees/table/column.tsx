import { Employee } from "@/app/employees/table/types"
import { ColumnDef } from "@tanstack/react-table"
import moment from "moment"

export const columns: ColumnDef<Employee>[] = [
  {
    accessorKey: "nama",
    header: "Nama",
  },
  {
    accessorKey: "nomor",
    header: "Nomor",
    size: 150,
  },
  {
    accessorKey: "jabatan",
    header: "Jabatan",
    size: 150,
  },
  {
    accessorKey: "departemen",
    header: "Departemen",
    size: 150,
  },
  {
    accessorKey: "tanggal_masuk",
    header: "Tanggal Masuk",
    size: 150,
    cell: ({ cell }) => {
      return moment(cell.row.original.tanggal_masuk).format("YYYY-MM-DD")
    },
  },
  {
    accessorKey: "foto",
    header: "Foto",
    size: 150,
    cell: ({ cell }) => {
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
    accessorKey: "status",
    header: "Status",
    size: 150,
    cell: ({ cell }) => {
      return (
        <div
          className={`flex justify-center uppercase px-4 py-2 text-white rounded-full ${
            cell.row.original.status == "tetap"
              ? "bg-[#3751FF]"
              : cell.row.original.status == "kontrak"
              ? "bg-[#F1A22B]"
              : "bg-[#00FF00]"
          }`}
        >{cell.row.original.status}</div>
      )
    },
  },
]
