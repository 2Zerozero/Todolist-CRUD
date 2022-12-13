// 각 할 일에 대한 정보를 렌더링 하는 컴포넌트
import React from "react";
import styled, { css } from "styled-components";
import { MdDone, MdDelete } from 'react-icons/md';
import { useTodoDispatch } from "../TodoContext";

const Remove = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    color: #dee2e6;
    font-size: 24px;
    cursor: pointer;

    &:hover {
        color: #ff6b6b;
    }
    display: none;
`

const TodoItemBlock = styled.div`
    display: flex;
    align-items: center;
    padding: 12px 0px;

    /* Component Selector 기능 */
    &:hover {
        ${Remove} {
            display: initial; // 초기화
        }
    }
`

const CheckCircle = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 32px;
    height: 32px;
    border: 1px solid #ced4da;
    border-radius: 16px;

    margin-right: 20px;
    cursor: pointer;

    ${props => 
    props.done &&
    css`
        border: 1px solid #4f3be3;
        color: #4f3be3;
    `
    }
`

const Text = styled.div`
    flex: 1;
    color: #495057;
    font-size: 22px;

    ${props =>
    props.done &&
    css`
        color: #ced4da;
    `
    }
`

function TodoItem({ id, done, text }) {
    const dispatch = useTodoDispatch();
    const onToggle = () => dispatch({ type: 'TOGGLE', id });
    const onRemove = () => dispatch({ type: 'REMOVE', id });

    return (
        <TodoItemBlock>
            <CheckCircle done={done} onClick={onToggle}>{done && <MdDone />}</CheckCircle>
            <Text done={done}>{text}</Text>
            <Remove onClick={onRemove}>
                <MdDelete />
            </Remove>
        </TodoItemBlock>
    )
}

// React.memo 를 사용하여, 다른 항목이 업데이트 될 때, 불필요한 리렌더링을 방지하여 성능 최적화.
export default React.memo(TodoItem);