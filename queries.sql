SELECT cell.cell_id cellId
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
 WHERE cell.center_latitude BETWEEN 89 AND 90
   AND cell.center_longitude BETWEEN 36 AND 37;

SELECT cell.cell_id cellId
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
 WHERE cell.cell_id = 'fcd17a03-dd0c-4533-9e66-104cfee7136d'