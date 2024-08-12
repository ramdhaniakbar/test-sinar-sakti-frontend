"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Employee, EmployeeTableLayoutProps } from "./types"

export const EmployeeTableLayout = ({
  getTableProps,
  getTableBodyProps,
  headerGroups,
  rows,
  prepareRow,
}: EmployeeTableLayoutProps<Employee>) => {
  return (
    <div className="rounded-md">
      <Table className="w-full bg-white" {...getTableProps()}>
        <TableHeader>
          {headerGroups.map((headerGroup, i) => (
            <TableRow
              {...headerGroup.getHeaderGroupProps()}
              key={i}
              className="text-[#9FA2B4] border-b"
            >
              {headerGroup.headers.map((column) => (
                <TableHead
                  className="px-4 py-2 text-left text-sm font-medium"
                  key={column.id} // Add unique key here
                >
                  <div className="d-flex align-items-center">
                    {column.render("Header")}
                  </div>
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody {...getTableBodyProps()}>
          {rows.length > 0 ? (
            rows.map((row) => {
              prepareRow(row)
              return (
                <TableRow {...row.getRowProps()} key={row.id} className="border-b">
                  {row.cells.map((cell) => (
                    <TableCell
                      className="px-4 py-2"
                      {...cell.getCellProps()}
                      key={cell.column.id}
                    >
                      {cell.render("Cell")}
                    </TableCell>
                  ))}
                </TableRow>
              )
            })
          ) : (
            <TableRow>
              <TableCell
                colSpan={headerGroups[0].headers.length}
                className="text-center py-4"
              >
                No results found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
