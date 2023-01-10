import React from 'react';
import UsersProvider, { useUsersState, useUsersFetch } from './UsersContext';

export default function UserManageMent() {
  return (
    <UsersProvider>
      <Users />
    </UsersProvider>
  );
}

function Users() {
  const state = useUsersState();
  const fetchData = useUsersFetch();

  const { data: users, loading, error } = state;

  if (loading) return <div>로딩중</div>;
  if (error) return <div>에러발생</div>;
  if (!users) return <button onClick={fetchData}>요청하기</button>;

  return (
    <>
      <div>
        {users.map((user) => {
          const { id, name, username } = user;
          return (
            <li key={id}>
              {name} ({username})
            </li>
          );
        })}
      </div>
      <button onClick={fetchData}>다시 요청하기</button>
    </>
  );
}
