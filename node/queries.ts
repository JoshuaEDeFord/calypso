export const cellQuery = (minLat: number, maxLat: number, minLng: number, maxLng: number) => {
  return `SELECT cell.cell_id cellId
                ,cell.center_latitude cellCenterLat
                ,cell.center_longitude cellCenterLng
                ,vertex_cell.sequence vertexSequence
                ,vertex.vertex_idx vertexIdx
                ,vertex.latitude vertexLat
                ,vertex.longitude vertexLng
            FROM vertex
            JOIN vertex_cell
              ON vertex.vertex_idx = vertex_cell.vertex_idx
            JOIN cell 
              ON vertex_cell.cell_id = cell.cell_id
           WHERE cell.center_latitude BETWEEN ${minLat} AND ${maxLat}
             AND cell.center_longitude BETWEEN ${minLng} AND ${maxLng}`;
};