
export interface PGResult {
  rows: PGCellRow[];
}
export interface PGCellRow {
  cellid: string;
  cellcenterlat: number;
  cellcenterlng: number;
  vertexsequence: number;
  vertexidx: number;
  vertexlat: number;
  vertexlng : number;
}

export interface Cell {
  cellId: string;
  centerLat: number;
  centerLng: number;
  vertexIndices: number[];
}

export interface CellPayload {
  vertices: { [vertexIdx: string]: Vertex }
  cells: { [cellId: string]: Cell }
}

export interface Vertex {
  idx: number;
  lat: number;
  lng: number;
}

export interface CellQuery {
  minLat: number;
  maxLat: number;
  minLng: number;
  maxLng: number;
}