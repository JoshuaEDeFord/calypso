import { CellPayload, CellQuery, PGCellRow, PGResult } from './types'
import { Pool } from 'pg'
import { cellQuery } from './queries'

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false, // Note: this should be set to true in production and provide CA if necessary
  },
})

const queryCells = async (
  minLat: number,
  maxLat: number,
  minLng: number,
  maxLng: number,
) => {
  const query = cellQuery(minLat, maxLat, minLng, maxLng)
  const cellResult: PGResult = await pool.query(query)
  const cellsAndVertices = cellResult.rows.reduce(
    (acc: CellPayload, row: PGCellRow) => {
      if (row.cellid === 'fcd17a03-dd0c-4533-9e66-104cfee7136d') {
        debugger
      }
      const cell = acc.cells[row.cellid] || {
        cellId: row.cellid,
        centerLat: row.cellcenterlat,
        centerLng: row.cellcenterlng,
        vertexIndices: [],
      }
      const vertex = acc.vertices[row.vertexidx] || {
        idx: row.vertexidx,
        lat: row.vertexlat,
        lng: row.vertexlng,
      }
      if (!cell.vertexIndices.find((idx) => idx === row.vertexidx)) {
        cell.vertexIndices[row.vertexsequence] = row.vertexidx
      }
      acc.cells[row.cellid] = cell
      acc.vertices[row.vertexidx] = vertex
      return acc
    },
    { vertices: {}, cells: {} },
  )
  console.log(JSON.stringify(cellsAndVertices, null, 2))
  return cellsAndVertices
}

export const handler = async (event: any) => {
  console.log(`EVENT IN THE HANDLER: ${JSON.stringify(event, null, 2)}`);
  const cellQuery: CellQuery = event.body ? JSON.parse(event.body) : {};
  switch (event.rawPath) {
    case '/cell-query':
      const cellsAndVertices = await queryCells(cellQuery.minLat, cellQuery.maxLat, cellQuery.minLng, cellQuery.maxLng);
      return {statusCode: 200, headers: { 
        // 'Access-Control-Allow-Origin': '*', 
        // 'Access-Control-Allow-Headers': '*',
        // 'Access-Control-Allow-Methods': '*'
        }, 
        body: JSON.stringify(cellsAndVertices, null, 2) };
      

  }
};