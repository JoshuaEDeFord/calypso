--- DROP TABLE vertex_cell;
--- DROP TABLE cell;
--- DROP TABLE vertex;
-- colomns are commented out to remove constraint to allow table data inserts to occurr performantly. 
-- They need to be updated with their constraints after all the inserts finish.h
-- or do they?
create table cell (
    -- cell_id CHAR(36) PRIMARY KEY,
    cell_id CHAR(36),
    center_latitude real,
    center_longitude real
);

create table vertex (
    -- vertex_idx integer PRIMARY KEY,
    vertex_idx integer,
    latitude real,
    longitude real
);

create table vertex_cell (
    cell_id CHAR(36),
    vertex_idx integer,
    sequence integer
    -- PRIMARY KEY (cell_id, vertex_idx),
    -- FOREIGN KEY (cell_id) REFERENCES cell(cell_id),
    -- FOREIGN KEY (vertex_idx) REFERENCES vertex(vertex_idx)
);

ALTER TABLE cell ALTER COLUMN cell_id SET NOT NULL;
ALTER TABLE cell ADD CONSTRAINT cell_pk PRIMARY KEY (cell_id);
CREATE INDEX idx_cell_center_lat ON cell (center_latitude);
CREATE INDEX idx_cell_center_lng ON cell (center_longitude);

ALTER TABLE vertex ALTER COLUMN vertex_idx SET NOT NULL;
ALTER TABLE vertex ADD CONSTRAINT vertex_pk PRIMARY KEY (vertex_idx);
CREATE INDEX idx_vertex_lat ON vertex (latitude);
CREATE INDEX idx_vertex_lng ON vertex (longitude);


ALTER TABLE vertex_cell ALTER COLUMN cell_id SET NOT NULL;
ALTER TABLE vertex_cell ALTER COLUMN vertex_idx SET NOT NULL;
ALTER TABLE vertex_cell ADD CONSTRAINT vertex_cell_pk PRIMARY KEY (cell_id, vertex_idx);

-- Add foreign key constraint for cell_id in vertex_cell table
ALTER TABLE vertex_cell ADD CONSTRAINT fk_vertex_cell_cell_id FOREIGN KEY (cell_id) REFERENCES cell(cell_id);

-- Add foreign key constraint for vertex_idx in vertex_cell table
ALTER TABLE vertex_cell ADD CONSTRAINT fk_vertex_cell_vertex_idx FOREIGN KEY (vertex_idx) REFERENCES vertex(vertex_idx);

CREATE INDEX idx_vertex_cell_cell_id ON vertex_cell (cell_id);
CREATE INDEX idx_vertex_cell_vertex_idx ON vertex_cell (vertex_idx);
