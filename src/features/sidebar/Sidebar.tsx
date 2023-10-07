import React, { useState } from 'react';
import { Drawer, List, ListItemButton, ListItemText, IconButton, Hidden } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Sidebar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawerContent = (
    <List>
      {['Item 1', 'Item 2', 'Item 3'].map((text) => (
        <ListItemButton key={text}>
          <ListItemText primary={text} />
        </ListItemButton>
      ))}
    </List>
  );

  return (
    <nav>
      {/* Permanent drawer for larger screens */}
      <Hidden smDown implementation="css">
        <Drawer
          variant="permanent"
          open
        >
          {drawerContent}
        </Drawer>
      </Hidden>

      {/* Temporary drawer for smaller screens */}
      <Hidden mdUp implementation="css">
        <Drawer
          variant="temporary"
          anchor="left"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile
          }}
        >
          {drawerContent}
        </Drawer>
      </Hidden>

      {/* Button to toggle the drawer on smaller screens */}
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
      >
        <MenuIcon />
      </IconButton>
    </nav>
  );
}

export default Sidebar;
