import React, { useReducer, useEffect } from 'react';

function reducer(state, action) {
  switch (action.type) {
    case 'LOADING':
      return {
        loading: true,
        data: null,
        error: null,
      };
    case 'ERROR':
      return {
        loading: false,
        data: null,
        error: action.error,
      };
    case 'SUCCESS':
      return {
        loading: false,
        data: action.data,
        error: null,
      };
    default:
      throw new Error(`Unhandled action type ${action.type}`);
  }
}

// callback에 인수가 있으면 무조건 인수를 포함하여 실행하는 래핑함수여야할것.
// 한 상태에 대해서만 로딩과 에러를 표시할 수 잇다...
// 그럼 하나로 몰아보는건 어떨까...
export default function useAsync(callback, deps, skip) {
  const [state, dispatch] = useReducer(reducer, {
    loading: false,
    data: null,
    error: null,
  });

  const fetchData = async () => {
    dispatch({ type: 'LOADING' });
    try {
      const data = await callback();
      dispatch({ type: 'SUCCESS', data });
    } catch (e) {
      dispatch({ type: 'ERROR', error: e });
    }
  };

  useEffect(() => {
    if (skip) return;
    fetchData();
  }, deps);

  return [state, fetchData];
}

export function AsyncComponent({ loading, error, none, success }) {
  return loading ? (
    <div>로딩중</div>
  ) : error ? (
    <div>에러발생</div>
  ) : !lectures ? null : (
    <SubjectList
      onSelect={onSelect}
      selectedItem={selectedItem}
      lectures={lectures}
    />
  );
}
