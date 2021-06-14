import React from "react";
import styled from "styled-components";
import { useTodoState } from "./TodoContext";

const TodoHeadBlock = styled.div`
  padding: 40px 32px 24px 32px;
  border-bottom: 1px solid #e9ecef;

  h1 {
    margin: 0;
    font-size: 30px;
    color: #343a40;
  }

  .day {
    margin-top: 4px;
    color: #868e96;
    font-size: 21px;
  }

  .tasks-undone {
    margin-top: 30px;
    color: #66e9c1;
    font-size: 18px;
    font-weight: bold;
  }
`;

function TodoHead() {
  // 날짜와 요일
  const today = new Date();
  const dateString = today.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const dayName = today.toLocaleDateString("ko-KR", {
    weekday: "long",
  });

  // 남은 할 일
  const todo = useTodoState();
  const undoneTasks = todo.filter((todo) => todo.done === false);

  return (
    <TodoHeadBlock>
      <h1>{dateString}</h1>
      <div className="day">{dayName}</div>
      <div className="tasks-undone">할 일 {undoneTasks.length}개 남음</div>
    </TodoHeadBlock>
  );
}

export default TodoHead;
