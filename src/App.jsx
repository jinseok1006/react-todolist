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
  Slide,
} from '@mui/material';

import useScrollTrigger from '@mui/material/useScrollTrigger';

import theme, { globalStyles } from './theme';

import EventNoteIcon from '@mui/icons-material/EventNote';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import SchoolIcon from '@mui/icons-material/School';
import SendIcon from '@mui/icons-material/Send';
import MenuIcon from '@mui/icons-material/Menu';

import UserMangement from './components/UserMangement/UserMangement';
import TodoMangement from './components/TodoMangement/TodoMangement';
import LectureSearch from './components/Timetable/LectureSearch';
import Users from './components/AsyncRequest/Users';

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
    component: <LectureSearch />,
  },
  {
    text: 'Async Request',
    icon: <SendIcon />,
    component: <Users />,
  },
];

const drawerWidth = 240;
export default function App() {
  const [selectedApp, setSelectedApp] = useState(2);

  const onSelect = (id) => {
    setSelectedApp(id);
    onToggle(false);
  };

  const [open, setOpen] = useState(false);
  const onToggle = (state) => setOpen(state);

  const trigger = useScrollTrigger();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles styles={globalStyles} />
      <AppBar sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            onClick={() => onToggle(true)}
            color="inherit"
            edge="start"
            sx={{ display: { lg: 'none' }, mr: 1 }}
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
          ml: { lg: `${drawerWidth}px` },
          py: { lg: 3, xs: 2 },
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
          display: { xs: 'none', lg: 'block' },
        }}
      >
        <Toolbar />
        {children}
      </Drawer>
      <Drawer
        varaint="temporary"
        anchor="left"
        open={open}
        onClose={() => onToggle(false)}
        sx={{
          display: { xs: 'block', lg: 'none' },
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
