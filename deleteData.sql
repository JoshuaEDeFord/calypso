DELETE FROM vertex_cell WHERE cell_id IS NOT NULL;
DELETE FROM vertex WHERE vertex.vertex_idx IS NOT NULL;
DELETE FROM cell WHERE cell.cell_id IS NOT NULL;
