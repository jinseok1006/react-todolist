import React, { useReducer, useRef, useMemo, useCallback } from 'react';
import useInputs from '@/hooks/useInputs';

import { Typography } from '@mui/material';

import UserList from './UserList';
import UserCreate from './UserCreate';
import UserTemplate from './UserTemplate';

function countActiveUsers(users) {
  console.log('count active users');
  return users.filter((user) => user.active).length;
}

function reducer(users, action) {
  switch (action.type) {
    case 'CREATE':
      return [...users, action.user];
    case 'TOGGLE':
      return users.map((user) =>
        user.id === action.id ? { ...user, active: !user.active } : user
      );
    case 'DELETE':
      return users.filter((user) => action.id !== user.id);
  }
}

export const UsersDispatch = React.createContext(null);
export const UsersState = React.createContext(null);

function User() {
  const [users, dispatch] = useReducer(reducer, [
    {
      id: 0,
      username: 'person',
      email: 'person@public.',
      active: false,
    },
  ]);

  const activeUsers = useMemo(() => countActiveUsers(users), [users]);

  return (
    <UsersState.Provider value={users}>
      <UsersDispatch.Provider value={dispatch}>
        <UserTemplate>
          <UserCreate />
          <UserList users={users} />
          <Typography>활성 사용자수: {activeUsers}</Typography>
        </UserTemplate>
      </UsersDispatch.Provider>
    </UsersState.Provider>
  );
}

export default User;
