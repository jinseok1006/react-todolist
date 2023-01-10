import React, { useContext } from 'react';

import useAsync from '@/hooks/useAsync';
import axios from 'axios';

async function getUsers() {
  const response = await axios.get(
    'https://jsonplaceholder.typicode.com/users'
  );

  return response.data;
}

const UsersStateContext = React.createContext(null);
const UsersFetchContext = React.createContext(null);

export default function UsersProvider({ children }) {
  const [state, fetchData] = useAsync(getUsers, null, true);

  // 요청은 어디서해? ㅋㅋ -> export getUsers

  return (
    <UsersStateContext.Provider value={state}>
      <UsersFetchContext.Provider value={fetchData}>
        {children}
      </UsersFetchContext.Provider>
    </UsersStateContext.Provider>
  );
}

export function useUsersFetch() {
  const fetchData = useContext(UsersFetchContext);

  if (!fetchData) {
    throw new Error('Cannot find UsersProvider');
  }

  return fetchData;
}

export function useUsersState() {
  const state = useContext(UsersStateContext);

  if (!state) {
    throw new Error('Cannot find UserProvider');
  }

  return state;
}
