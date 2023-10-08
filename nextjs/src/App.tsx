import React, { useState } from 'react';
import { Container, Box } from '@mui/material';
import Sidebar from './features/sidebar/Sidebar';
import Header from './features/header/Header';
import Map from './features/map/CellMap';

const App: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div>
      <Header handleDrawerToggle={handleDrawerToggle} />
      <Box>
        <Sidebar />
        <Container>
          This is the map
          <Map/>
        </Container>
      </Box>
    </div>
  );
}

export default App;
