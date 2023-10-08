import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { CellPayload, CellQuery } from '../../../node/types';

// Define a service using a base URL and expected endpoints
export const cellsApi = createApi({
  reducerPath: 'cellsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://zz34obpgwnq5ppbupig4tvpepe0acdbx.lambda-url.us-west-2.on.aws/' }),
  endpoints: (builder) => ({
    getCells: builder.mutation<CellPayload, CellQuery>({
      query: (cellQuery) => ({
        url: 'cell-query',
        method: 'POST',
        body: cellQuery
      }),
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetCellsMutation } = cellsApi