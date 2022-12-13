// 할 일을 등록하는 컴포넌트
import React, { useState } from "react";
import styled, { css } from "styled-components";
import { MdAdd } from 'react-icons/md';
import { useTodoDispatch, useTodoNextId } from "../TodoContext";

const CircleButton = styled.button`
    background: #4f3be3;

    &:hover {
        background: #341ee3;
    }
    &:active {
        background: #20c997;
    }

    z-index: 5;
    cursor: pointer;
    
    display: flex;
    width: 80px;
    height: 80px;
    align-items: center;
    justify-content: center;
    font-size: 60px;

    position: absolute;
    left: 50%;
    bottom: 0px;
    border-radius: 50%;
    outline: none;

    transform: translate(-50%, 50%);
    transition: 0.125s all ease-in;

    /* 버튼 회전 토글 */
    ${props =>
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
    `
    }
`

// 버튼 클릭했을 때 나오는 컴포넌트 CSS
const InsertFormPositioner = styled.div`
    width: 100%;
    bottom: 0;
    left: 0;
    position: absolute;
`

const InsertForm = styled.form`
    background: #f8f9fa;
    padding: 32px 32px 72px;
    border-top: 1px solid #e9ecef;
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
`

const Input = styled.input`
    padding: 12px;
    border: 1px solid #dee2e6;
    border-radius: 4px;
    width: 100%;
    outline: none;
    font-size: 18px;
    box-sizing: border-box;
`

function TodoCreate() {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');

    const dispatch = useTodoDispatch();
    const nextId = useTodoNextId();

    const onToggle = () => setOpen(!open);
    const onChange = e => setValue(e.target.value);
    const onSubmit = e => {
        e.preventDefault(); // 새로고침 방지한다.
        dispatch({
            type: 'CREATE',
            todo: {
                id: nextId.current,
                text: value,
                done: false
            }
        });
        setValue('');
        setOpen(false);
        nextId.current += 1;
    }

    return (
        <>
            {open && (
                <InsertFormPositioner>
                    <InsertForm onSubmit={onSubmit}>
                        <Input 
                            autoFocus 
                            placeholder="오늘의 할 일을 작성 후 Enter 를 누르세요."
                            onChange={onChange}
                            value={value} 
                            />
                    </InsertForm>
                </InsertFormPositioner>
            )}
            <CircleButton onClick={onToggle} open={open}>
                <MdAdd color="#ffffff" />
            </CircleButton>
        </>
    )
}

export default React.memo(TodoCreate);