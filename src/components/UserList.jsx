import React, { useEffect, useContext } from 'react';

import {
  List,
  ListItem,
  IconButton,
  ListItemButton,
  Typography,
  ListItemText,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

import { UsersDispatch } from './User';

function UserList({ users }) {
  const dispatch = useContext(UsersDispatch);

  const onToggle = (id) => {
    dispatch({ type: 'TOGGLE', id });
  };
  const onDelete = (id) => {
    dispatch({ type: 'DELETE', id });
  };

  return (
    <List dense>
      {users.map((user) => (
        <User
          key={user.id}
          user={user}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </List>
  );
}

const User = React.memo(function ({ user, onToggle, onDelete }) {
  const { id, username, email, active } = user;
  console.log(`${id} re-rendering`);

  useEffect(() => {
    console.log(`mount ${id} user component`);
    return () => {
      console.log(`unmount ${id} user component`);
    };
  }, []);

  const isActiveStyle = active
    ? (theme) => ({
        color: `${theme.palette.primary.main}`,
        fontWeight: '500',
      })
    : null;

  return (
    <ListItem
      key={id}
      secondaryAction={
        <IconButton edge="end" onClick={() => onDelete(id)}>
          <DeleteIcon />
        </IconButton>
      }
    >
      <ListItemButton dense onClick={() => onToggle(id)}>
        <ListItemText
          primary={<Typography sx={isActiveStyle}>{username}</Typography>}
          secondary={email}
        />
      </ListItemButton>
    </ListItem>
  );
});

export default React.memo(UserList);
