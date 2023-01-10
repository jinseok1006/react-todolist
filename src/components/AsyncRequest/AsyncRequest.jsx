import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AsyncRequest() {
  // 비동기 요청 구성요소
  // 1. 데이터
  // 2. 로딩상태
  // 3. 에러

  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  // 비동기 요청은 useEffect로 처리한다
  // 비동기 함수가 데이터를 받아오면,
  // 상태변화를 일으키고 컴포넌트는 리렌더링된다.
  const fetchUser = async () => {
    try {
      setLoading(true);
      setUsers(null);
      setError(null);

      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/users'
      );

      setUsers(response.data);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // 만약 useEffect를 사용하지 않는다면
  // 비동기 함수가 데이터를 받아오고
  // 상태변화를 일으킨 후 컴포넌트가 리렌더링될때
  // 비동기 함수가 다시 실행될 것이다.

  // 결국 비동기함수는 컴포넌트가 DidMount(not render, re-rendor)일 때
  // 단 한번 실행되어야 한다.

  if (loading) {
    return <div>로딩중</div>;
  }
  if (error) {
    return <div>에러발생</div>;
  }
  if (!users) {
    return null;
  }

  return (
    <div>
      {users.map((user) => (
        <li key={user.id}>
          {user.username}({user.name})
        </li>
      ))}
      <button onClick={fetchUser}>다시요청하기</button>
    </div>
  );
}
