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
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';

import User from './components/User';
import TodoMangement from './components/TodoMangement';

import EventNoteIcon from '@mui/icons-material/EventNote';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';

const apps = [
  {
    text: 'TodoList',
    icon: <EventNoteIcon />,
    component: <TodoMangement />,
  },
  {
    text: 'User Management',
    icon: <PersonSearchIcon />,
    component: <User />,
  },
];

const theme = createTheme({
  typography: {
    h6: {
      fontWeight: 500,
    },
  },
});

const drawerWidth = 240;
export default function App() {
  const [selectedApp, setSelectedApp] = useState(0);

  const onSelect = (id) => {
    setSelectedApp(id);
    onToggle();
  };

  const [open, setOpen] = useState(false);
  const onToggle = () => setOpen(!open);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            onClick={onToggle}
            color="inherit"
            edge="start"
            sx={{ display: { md: 'none' }, mr: 1 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">responsive ui</Typography>
        </Toolbar>
      </AppBar>
      <ResponsiveDrawer open={open} onSelect={onSelect} onToggle={onToggle}>
        <MyDrawerList onSelect={onSelect} />
      </ResponsiveDrawer>
      <Box
        component="main"
        sx={{
          ml: { md: `${drawerWidth}px` },
        }}
      >
        <Toolbar />
        <Container maxWidth="sm" sx={{ mt: 3, py: 2 }}>
          {apps[selectedApp].component}
        </Container>
      </Box>
    </ThemeProvider>
  );
}
const ResponsiveDrawer = ({ children, open, onToggle }) => {
  // usemediaquery를 제거하는것이 옳은가?
  // 그럼 결국 똑같은 컴포넌트를 두개생성해야되는데? -> 컴포넌트 합성해도 병신같은건 여전하다

  return (
    <>
      <Drawer
        variant="permanent"
        sx={{
          '& > div': { width: `${drawerWidth}px` },
          display: { xs: 'none', md: 'block' },
        }}
      >
        <Toolbar />
        {children}
      </Drawer>
      <Drawer
        varaint="temporary"
        anchor="top"
        open={open}
        onClose={onToggle}
        sx={{
          display: { xs: 'block', md: 'none' },
        }}
      >
        <Toolbar />
        {children}
      </Drawer>
    </>
  );
};

function MyDrawerList({ onSelect }) {
  return (
    <List>
      {apps.map((app, i) => (
        <ListItem key={i}>
          <ListItemButton onClick={() => onSelect(i)}>
            <ListItemIcon>{app.icon}</ListItemIcon>
            <ListItemText primary={app.text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
