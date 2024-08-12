import { Employee } from "./types"

export const employees = async (): Promise<Employee[]> => {
  return [
    {
      id: 1,
      nama: "Muhamad Ramdhani Akbar",
      nomor: "12007942",
      jabatan: "Staff",
      departemen: "IT",
      tanggal_masuk: new Date(),
      foto: "https://i.pravatar.cc/150?u=f71d3cbc-e9e3-491a-895b-184fa36f287e",
      status: "tetap",
    },
    {
      id: 2,
      nama: "Muhamad Ramdhani Akbar",
      nomor: "12007942",
      jabatan: "Staff",
      departemen: "IT",
      tanggal_masuk: new Date(),
      foto: "https://i.pravatar.cc/150?u=1fe61c9a-8810-4071-8571-0146857c685a",
      status: "kontrak",
    },
    {
      id: 3,
      nama: "Muhamad Ramdhani Akbar",
      nomor: "12007942",
      jabatan: "Staff",
      departemen: "IT",
      tanggal_masuk: new Date(),
      foto: "https://i.pravatar.cc/150?u=739c5ad7-f4df-49d2-bcfe-8266b9f8de4d",
      status: "probation",
    },
  ]
}
