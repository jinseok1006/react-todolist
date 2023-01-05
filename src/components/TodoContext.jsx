import React, { useReducer, useContext, useRef } from 'react';

const initialTodos = [
  {
    id: 0,
    text: '프로젝트 생성하기',
    done: false,
  },
  {
    id: 1,
    text: '컴포넌트 스타일링하기',
    done: false,
  },
  {
    id: 2,
    text: 'Context 만들기',
    done: false,
  },
];

function todoReducer(state, action) {
  switch (action.type) {
    case 'CREATE':
      return [...state, action.todo];
    case 'DELETE':
      return state.filter((todo) => action.id !== todo.id);
    case 'TOGGLE':
      return state.map((todo) =>
        action.id === todo.id ? { ...todo, done: !todo.done } : todo
      );
    default:
      throw new Error(`unhandled action type: ${action.type}`);
  }
}

const TodoStateContext = React.createContext();
const TodoDispatchContext = React.createContext();
const TodoNextIdContext = React.createContext();

export default function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, initialTodos);
  const nextId = useRef(3);

  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        <TodoNextIdContext.Provider value={nextId}>
          {children}
        </TodoNextIdContext.Provider>
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
}

export function useTodoDispatch() {
  const context = useContext(TodoDispatchContext);
  if (!context) {
    throw new Error('Cannot find TodoDispatch!');
  }
  return context;
}

export function useTodoState() {
  const context = useContext(TodoStateContext);
  if (!context) {
    throw new Error('Cannot find TodoState!');
  }
  return context;
}

export function useTodoNextId() {
  const context = useContext(TodoNextIdContext);
  if (!context) {
    throw new Error('Cannot find TodoNextId!');
  }
  return context;
}
