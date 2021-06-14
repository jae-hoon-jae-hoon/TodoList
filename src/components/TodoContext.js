//리듀서, StateContext, DispatchContext, NextIdContext 구현

import React, { createContext, useContext, useReducer, useRef } from "react";

//todos 초기상태 배열
const initialTodos = [
  {
    id: 1,
    text: "할 일1",
    done: true,
  },
  {
    id: 2,
    text: "할 일2",
    done: true,
  },
  {
    id: 3,
    text: "할 일3",
    done: false,
  },
];

//리듀서 함수
function todoReducer(state, action) {
  switch (action.type) {
    case "CREATE": {
      return state.concat(action.todo);
    }
    case "TOGGLE": {
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, done: !todo.done } : todo
      );
    }
    case "REMOVE": {
      return state.filter((todo) => todo.id !== action.id);
    }
    default:
      throw new Error("예상되지 않는 action.type값 입니다.");
  }
}

const TodoStateContext = createContext();
const TodoDispatchContext = createContext();
const TodoNextIdContext = createContext();

export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, initialTodos);
  const nextId = useRef(4);
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

// 다른 컴포넌트에서 TodoState,TodoDispatch,TodoNextId Context를 빠르게쓰기위한 함수
export function useTodoState() {
  const context = useContext(TodoStateContext);
  if (!context) {
    throw new Error("TodoProvider를 찾을 수 없습니다.");
  }
  return context;
}
export function useTodoDispatch() {
  const context = useContext(TodoDispatchContext);
  if (!context) {
    throw new Error("TodoProvider를 찾을 수 없습니다.");
  }
  return context;
}
export function useTodoNextId() {
  const context = useContext(TodoNextIdContext);
  if (!context) {
    throw new Error("TodoProvider를 찾을 수 없습니다.");
  }
  return context;
}
