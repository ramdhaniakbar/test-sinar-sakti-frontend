import { 
   HeaderGroup,
   Row,
 } from 'react-table';

export type Employee = {
   id?: number;
   nama: string;
   nomor: string;
   jabatan: string;
   departemen: string;
   tanggal_masuk?: Date;
   foto: string;
   status: string;
}

export type SortEmployee = {
   columnId: string;
   direction: 'asc' | 'desc'
}

export interface EmployeeTableLayoutProps<TData extends object> {
  getTableProps: () => Record<string, any>;
  getTableBodyProps: () => Record<string, any>;
  headerGroups: HeaderGroup<TData>[];
  rows: Row<TData>[];
  prepareRow: (row: Row<TData>) => void;
}