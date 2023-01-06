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

import UserMangement from './components/UserMangement/UserMangement';
import TodoMangement from './components/TodoMangement/TodoMangement';
import Timetable from './components/Timetable/Timetable ';

import EventNoteIcon from '@mui/icons-material/EventNote';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import SchoolIcon from '@mui/icons-material/School';

const apps = [
  {
    text: 'TodoList',
    icon: <EventNoteIcon />,
    component: <TodoMangement />,
  },
  {
    text: 'User Management',
    icon: <PersonSearchIcon />,
    component: <UserMangement />,
  },
  {
    text: 'Syllabus Reader',
    icon: <SchoolIcon />,
    component: <Timetable />,
  },
];

const theme = createTheme({
  typography: {
    h6: {
      fontWeight: 500,
    },
    subtitle2: {
      color: 'grey',
      fontSize: 13,
      fontWeight: 500,
    },
  },
});

const drawerWidth = 240;
export default function App() {
  const [selectedApp, setSelectedApp] = useState(2);

  const onSelect = (id) => {
    setSelectedApp(id);
    onToggle(false);
  };

  const [open, setOpen] = useState(false);
  const onToggle = (state) => setOpen(state);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            onClick={() => onToggle(true)}
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
          mt: { md: 5, xs: 3 },
        }}
      >
        <Toolbar />
        {apps[selectedApp].component}
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
        onClose={() => onToggle(false)}
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
