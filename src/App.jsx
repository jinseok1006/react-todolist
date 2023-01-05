import { useState } from 'react';
import {
  AppBar,
  Box,
  CssBaseline,
  Toolbar,
  Drawer,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Container,
  createTheme,
  ThemeProvider,
  GlobalStyles,
} from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';
import MenuIcon from '@mui/icons-material/Menu';

import User from './components/User';
import TodoMangement from './components/TodoMangement';

import EventNoteIcon from '@mui/icons-material/EventNote';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';

const apps = [
  {
    text: 'TodoList',
    icon: <EventNoteIcon />,
  },
  {
    text: 'User Management',
    icon: <PersonSearchIcon />,
  },
];

function MyDrawer({ onToggle }) {
  return (
    <List>
      {apps.map((app, i) => (
        <ListItem key={i}>
          <ListItemButton onClick={() => onToggle(i)}>
            <ListItemIcon>{app.icon}</ListItemIcon>
            <ListItemText primary={app.text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}

const theme = createTheme({
  typography: {
    h6: {
      fontWeight: 500,
    },
  },
});

const drawerWidth = 240;
function App() {
  const [open, setOpen] = useState(false);
  const onChange = () => setOpen(!open);

  const [selectedApp, setSelectedApp] = useState(0);

  const SelectedApp = () => {
    if (selectedApp === 0) {
      return <User />;
    } else {
      return <TodoMangement />;
    }
  };

  const onToggle = (id) => {
    setSelectedApp(id);
    onChange();
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <AppBar sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            onClick={onChange}
            color="inherit"
            edge="start"
            sx={{ display: { md: 'none' }, mr: 1 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">responsive ui</Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          '& > div': { width: `${drawerWidth}px` },
          display: { xs: 'none', md: 'block' },
        }}
      >
        <Toolbar />
        <MyDrawer onToggle={onToggle} />
      </Drawer>
      <Drawer
        varaint="temporary"
        anchor="top"
        open={open}
        onClose={onChange}
        sx={{
          display: { xs: 'block', md: 'none' },
          backgroundColor: '#f1f3f5',
        }}
      >
        <Toolbar />
        <MyDrawer onToggle={onToggle} />
      </Drawer>
      <Box
        component="main"
        sx={{
          ml: { md: `${drawerWidth}px` },
        }}
      >
        <Toolbar />
        <Container maxWidth="sm" sx={{ mt: 3, py: 2 }}>
          <SelectedApp />
        </Container>
      </Box>
    </ThemeProvider>
  );
}
export default App;
