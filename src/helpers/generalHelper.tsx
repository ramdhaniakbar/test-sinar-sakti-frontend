export const dataTableInformation = (page: number, limit: number, pagination: any) => {
   const countData = pagination?.count_data || 0
   if (countData) {
      return {
         from: 0,
         to: 0
      }
   }

   const from = (page - 1) * limit - 1
   const to = Math.min(page * limit, countData)

   return {
      from: from,
      to: to
   }
}