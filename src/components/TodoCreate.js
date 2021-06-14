import React from "react";
import styled, { css } from "styled-components";
import { MdAdd } from "react-icons/md";
import { useState } from "react";
import { useTodoDispatch, useTodoNextId } from "./TodoContext";

const AddButton = styled.div`
  background: #38d9a9;
  &:hover {
    background: #63e6be;
  }
  &:active {
    background: #20c997;
  }

  z-index: 5;
  cursor: pointer;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;
  left: 50%;
  bottom: 0px;
  transform: translate(-50%, 50%);
  // translate(왼쪽에서부터 , 위에서부터)
  font-size: 60px;
  color: white;
  border-radius: 50%;

  border: none;
  outline: none;

  transition: 0.3s all ease-in;
  ${(props) =>
    props.open &&
    css`
      background: #ff6b6b;
      &:hover {
        background: #ff8787;
      }
      &:active {
        background: #fa5252;
      }
      transform: translate(-50%, 50%) rotate(45deg);
    `};
`;

const InsertFormPositioner = styled.div`
  width: 100%;
  bottom: 0;
  left: 0;
  position: absolute;
`;

const InsertForm = styled.form`
  background: #f8f9fa;
  padding: 32px;
  padding-bottom: 72px;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  border-top: 1px solid #e9ecef;
`;

const Input = styled.input`
  padding: 12px;
  border-radius: 4px;
  border: 1px solid #dee2e6;
  width: 100%;
  outline: none;
  font-size: 18px;
  box-sizing: border-box;
`;

function TodoCreate() {
  const dispatch = useTodoDispatch();
  const nextId = useTodoNextId();

  //form submit동작
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: "CREATE",
      todo: {
        id: nextId.current,
        text: value,
        done: false,
      },
    });
    setValue("");
    setOpen(false);
    nextId.current += 1;
  };

  //input에 대한 상태관리
  const [value, setValue] = useState("");
  const onChange = (e) => setValue(e.target.value);

  const [open, setOpen] = useState(false);
  const onToggle = () => {
    setOpen(!open);
  };

  return (
    <>
      {open && (
        <InsertFormPositioner>
          <InsertForm onSubmit={onSubmit}>
            <Input
              onChange={onChange}
              value={value}
              placeholder="할 일을 입력 후, enter를 누르세요"
              autoFocus
            ></Input>
          </InsertForm>
        </InsertFormPositioner>
      )}
      <AddButton open={open} onClick={onToggle}>
        <MdAdd></MdAdd>
      </AddButton>
    </>
  );
}

export default React.memo(TodoCreate);
