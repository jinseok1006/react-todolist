import { useTheme } from '@emotion/react';

function MyDrawer({ drawer, open, onChange }) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  return matches ? (
    <Drawer variant="permanent">{drawer}</Drawer>
  ) : (
    <Drawer variant="temporary" open={open} onClose={onChange}>
      {drawer}
    </Drawer>
  );
}

function MyDrawer2({ drawer, open, onChange }) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Drawer
      variant={matches ? 'permanent' : 'temporary'}
      open={matches ? undefined : open}
      onClose={matches ? undefined : onChange}
    >
      {drawer}
    </Drawer>
  );
}

function MyDrawer3({ drawer, open, onChange }) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  const mobile = {
    varaint: 'temporary',
    open,
    onClose: onChange,
  };

  const pc = {
    varaint: 'permanent',
  };

  const target = matches ? pc : mobile;

  return <Drawer {...target}>{drawer}</Drawer>;
}
