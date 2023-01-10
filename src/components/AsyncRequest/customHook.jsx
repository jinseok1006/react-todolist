import React, { useState } from 'react';
import useAsync from '@/hooks/useAsync';
import axios from 'axios';

async function fetchUsers() {
  const response = await axios.get(
    'https://jsonplaceholder.typicode.com/users'
  );
  return response.data;
}

async function getUser(id) {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/users/${id}`
  );
  return response.data;
}

export default function AsyncRequestContext() {
  const [userId, setUserId] = useState(null);
  const [state, refetch] = useAsync(fetchUsers, [], true);

  const { loading, data: users, error } = state;

  if (loading) return <div>로딩중</div>;
  if (error) return <div>에러발생</div>;
  if (!users)
    return (
      <div>
        <button onClick={refetch}>불러오기</button>
      </div>
    );

  return (
    <>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <span onClick={() => setUserId(user.id)}>{user.username}</span> (
            {user.name})
          </li>
        ))}
      </ul>
      <button onClick={refetch}>다시요청하기</button>
      {userId && <User id={userId} />}
    </>
  );
}

function User({ id }) {
  const [state] = useAsync(() => getUser(id), [id]);

  const { loading, data: user, error } = state;

  if (loading) return <div>로딩중...</div>;
  if (error) return <div>에러발생</div>;
  if (!user) return null;

  return (
    <div>
      <h1>{user.name}</h1>
      <p>
        Email: <span>{user.email}</span>
      </p>
    </div>
  );
}
