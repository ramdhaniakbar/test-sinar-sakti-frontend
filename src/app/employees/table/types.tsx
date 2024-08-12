export type Employee = {
   nama: string;
   nomor: string;
   jabatan: string;
   departemen: string;
   tanggal_masuk: Date;
   foto: string;
   status: string;
}

export type SortEmployee = {
   columnId: string;
   direction: 'asc' | 'desc'
}