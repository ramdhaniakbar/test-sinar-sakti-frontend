"use client"

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
      <table className="w-full bg-white" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup, i) => (
            <tr
              {...headerGroup.getHeaderGroupProps()}
              key={i}
              className="text-[#9FA2B4] border-b"
            >
              {headerGroup.headers.map((column) => (
                <th
                  className="px-4 py-2 text-left text-sm font-medium"
                  key={column.id} // Add unique key here
                >
                  <div className="d-flex align-items-center">
                    {column.render("Header")}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.length > 0 ? (
            rows.map((row) => {
              prepareRow(row)
              return (
                <tr {...row.getRowProps()} key={row.id} className="border-b">
                  {row.cells.map((cell) => (
                    <td
                      className="px-4 py-2"
                      {...cell.getCellProps()}
                      key={cell.column.id}
                    >
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              )
            })
          ) : (
            <tr>
              <td
                colSpan={headerGroups[0].headers.length}
                className="text-center py-4"
              >
                No results found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
