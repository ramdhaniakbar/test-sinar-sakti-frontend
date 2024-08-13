"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react"
import { Employee } from "../table/types"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { Loader2 } from "lucide-react"

export default function CreateEmploye() {
  const router = useRouter()
  const [formData, setFormData] = useState<Employee | any>({
    nama: "",
    nomor: "",
    jabatan: "",
    departemen: "",
    foto: "",
    status: "",
  })
  const [errors, setErrors] = useState<any>({})
  const [imagePreview, setImagePreview] = useState<any>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: async (data) => {
      const employeeResponse = await axios.post(
        "http://localhost:8000/api/v1/employee",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      return employeeResponse
    },
    onSuccess: () => {
      setErrors({})
      router.push("/employees")
    },
    onError: (error) => {
      console.log(error)
    },
  })

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const data = new FormData()
    data.append("nama", formData.nama)
    data.append("nomor", formData.nomor)
    data.append("jabatan", formData.jabatan)
    data.append("departemen", formData.departemen)
    data.append("foto", formData.foto)
    data.append("status", formData.status)

    mutate(formData)
  }

  useEffect(() => {
    if (isError && error) {
      let errorObject: Record<string, string> | any = {}

      const axiosError = error as any
      if (axiosError.response?.data) {
        errorObject = axiosError?.response?.data?.error.reduce(
          (obj: Record<string, string>, item: any) => {
            return { ...obj, [item.path]: item.msg }
          },
          {}
        )
      }

      if (
        axiosError?.response?.data?.error.length === 0 &&
        axiosError?.response?.data?.message
      ) {
        errorObject = { image: axiosError?.response?.data?.message }
      }

      setErrors(errorObject)
    }
  }, [isError, error])

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    setFormData((prevData: any) => ({
      ...prevData,
      foto: file,
    }))

    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="h-full w-full">
      <div className="py-8 mx-8 xl:ml-80 justify-end">
        <h1 className="text-2xl font-semibold">Tambah Karyawan</h1>

        <div className="w-100 px-6 py-8 h-full bg-[#FFFFFF] mt-16 border rounded-lg">
          <h2 className="text-xl font-medium">Form Input Karyawan</h2>

          <form onSubmit={handleSubmit} className="w-full flex mt-8">
            <div className="flex-col flex-1 w-32 space-y-6">
              <div className="flex-col w-full xl:w-9/12 space-y-2">
                <label htmlFor="nama" className="text-lg">
                  Nama Karyawan
                </label>
                <Input
                  type="text"
                  id="nama"
                  className={`w-full ${errors.nama ? "border-red-500" : ""}`}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setFormData((prevData: Employee) => ({
                      ...prevData,
                      nama: e.target.value,
                    }))
                  }}
                />
                {errors.nama && (
                  <span className="text-red-500">{errors.nama}</span>
                )}
              </div>
              <div className="flex-col w-full xl:w-9/12 space-y-2">
                <label htmlFor="nomor" className="text-lg">
                  Nomor Karyawan
                </label>
                <Input
                  type="number"
                  id="nomor"
                  className={`w-full ${errors.nomor ? "border-red-500" : ""}`}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setFormData((prevData: Employee) => ({
                      ...prevData,
                      nomor: e.target.value,
                    }))
                  }}
                />
                {errors.nomor && (
                  <span className="text-red-500">{errors.nomor}</span>
                )}
              </div>
              <div className="flex-col w-full xl:w-9/12 space-y-2">
                <label htmlFor="jabatan" className="text-lg">
                  Jabatan
                </label>
                <select
                  className={`px-3 py-2 border rounded-md w-full ring-offset-gray-400 focus:outline-none focus-visible:ring-1 focus-visible:ring-gray-400 focus-visible:ring-offset-1 ${
                    errors.jabatan ? "border-red-500" : ""
                  }`}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                    setFormData((prevData: Employee) => ({
                      ...prevData,
                      jabatan: e.target.value,
                    }))
                  }
                  id="jabatan"
                  aria-label="Default select example"
                  value={formData.jabatan}
                >
                  <option selected value="">
                    Pilih Jabatan
                  </option>
                  <option value="Financial Analyst">Financial Analyst</option>
                  <option value="Accountant">Accountant</option>
                  <option value="Budget Analyst">Budget Analyst</option>
                  <option value="CFO">CFO</option>
                  <option value="Actuary">Actuary</option>
                  <option value="Auditor">Auditor</option>

                  <option value="HR Manager">HR Manager</option>
                  <option value="Recruiter">Recruiter</option>
                  <option value="HR Generalist">HR Generalist</option>
                  <option value="Employee Relations Manager">
                    Employee Relations Manager
                  </option>

                  <option value="Call Centre Representative">
                    Call Centre Representative
                  </option>
                  <option value="Customer Service Manager">
                    Customer Service Manager
                  </option>
                  <option value="Complaints Handler">Complaints Handler</option>

                  <option value="UI/UX Designer">UI/UX Designer</option>
                  <option value="QA Engineer">QA Engineer</option>
                  <option value="Backend Developer">Backend Developer</option>
                  <option value="Fullstack Developer">
                    Fullstack Developer
                  </option>
                  <option value="Frontend Developer">Frontend Developer</option>
                  <option value="Mobile Developer">Mobile Developer</option>
                  <option value="Lead Programmer">Lead Programmer</option>

                  <option value="Marketing Manager">Marketing Manager</option>
                  <option value="Marketing Analyst">Marketing Analyst</option>
                  <option value="Social Media Manager">
                    Social Media Manager
                  </option>
                  <option value="Brand Manager">Brand Manager</option>
                  <option value="Account Coordinator">
                    Account Coordinator
                  </option>
                  <option value="Public Relations">Public Relations</option>
                </select>
                {errors.jabatan && (
                  <span className="text-red-500">{errors.jabatan}</span>
                )}
              </div>
              <div className="flex-col w-full xl:w-9/12 space-y-2">
                <label htmlFor="departemen" className="text-lg">
                  Departemen
                </label>
                <select
                  className={`px-3 py-2 border rounded-md w-full ring-offset-gray-400 focus:outline-none focus-visible:ring-1 focus-visible:ring-gray-400 focus-visible:ring-offset-1 ${
                    errors.departemen ? "border-red-500" : ""
                  }`}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                    setFormData((prevData: Employee) => ({
                      ...prevData,
                      departemen: e.target.value,
                    }))
                  }
                  id="departemen"
                  aria-label="Default select example"
                  value={formData.departemen}
                >
                  <option selected value="">
                    Pilih Departemen
                  </option>
                  <option value="Finance">Finance</option>
                  <option value="HR">HR</option>
                  <option value="Customer Service">Customer Service</option>
                  <option value="Tech">Tech</option>
                  <option value="Marketing">Marketing</option>
                </select>
                {errors.departemen && (
                  <span className="text-red-500">{errors.departemen}</span>
                )}
              </div>
              <div className="flex-col w-full xl:w-9/12 space-y-2">
                <label htmlFor="status" className="text-lg">
                  Status
                </label>
                <select
                  className={`px-3 py-2 border rounded-md w-full ring-offset-gray-400 focus:outline-none focus-visible:ring-1 focus-visible:ring-gray-400 focus-visible:ring-offset-1 ${
                    errors.status ? "border-red-500" : ""
                  }`}
                  onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                    setFormData((prevData: Employee) => ({
                      ...prevData,
                      status: e.target.value,
                    }))
                  }
                  id="status"
                  aria-label="Default select example"
                  value={formData.status}
                >
                  <option selected value="">
                    Pilih Status
                  </option>
                  <option value="tetap">Tetap</option>
                  <option value="kontrak">Kontrak</option>
                  <option value="probation">Probation</option>
                </select>
                {errors.status && (
                  <span className="text-red-500">{errors.status}</span>
                )}
              </div>

              <div className="flex gap-2 pt-2">
                {isPending ? (
                  <Button disabled>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Please wait
                  </Button>
                ) : (
                  <Button className="font-semibold" type="submit">
                    Submit
                  </Button>
                )}

                <Button variant={"destructive"} className="font-semibold">
                  Cancel
                </Button>
              </div>
            </div>

            <div className="flex-col flex-2 space-y-6 md:ml-8">
              <div className="flex-col mb-2">
                <span>Photo</span>
                <div className="flex items-center gap-4 mt-2">
                  <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                  {/* Button that triggers the file input */}
                  <Button
                    variant={"secondary"}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Select File
                  </Button>

                  <span className="text-[#868B90]">
                    {imagePreview ? "File selected" : "No file selected"}
                  </span>
                </div>
              </div>
              {errors.foto ? (
                <span className="text-red-500">{errors.foto}</span>
              ) : (
                <></>
              )}
              {imagePreview ? (
                <div>
                  <img
                    src={imagePreview as string} // Cast to string as `FileReader.result` can be `string` or `ArrayBuffer`
                    alt="Preview"
                    style={{ maxWidth: "100%", maxHeight: "300px" }} // Optional: Adjust styles as needed
                  />
                </div>
              ) : (
                <Image
                  src={`/images/default_image.png`}
                  alt="Default Image"
                  className="rounded-md"
                  width={280}
                  height={280}
                />
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
