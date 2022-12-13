// 오늘의 날짜와 요일을 불러오며, 앞으로 남은 할 일을 보여준다.
import React from "react";
import styled from "styled-components";
import { useTodoState } from "../TodoContext";

const TodoHeaderBlock = styled.div`
    padding: 48px 32px 24px;
    border-bottom: 1px solid #e9ecef;
    
    h1 {
        font-size: 36px;
        color: #343a40;
    }
    .day {
        margin-top: 10px;
        color: #868e96;
        font-size: 22px;
    }
    .tasks-left {
        margin-top: 40px;
        color: #4f3be3;
        font-size: 18px;
        font-weight: bold;
    }
`

function TodoHeader() {
    // 할 일 갯수 로직
    const todos = useTodoState();
    const unDoneTasks = todos.filter(todo => !todo.done);

    // 날짜, 요일 로직
    const today = new Date();
    const dateStiring = today.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    const dayName = today.toLocaleDateString('ko-KR', { weekday:'long' });

    return (
        <TodoHeaderBlock>
            <h1>{dateStiring}</h1>
            <div className="day">{dayName}</div>
            <div className="tasks-left">할 일 {unDoneTasks.length}개 남음</div>
        </TodoHeaderBlock>
    )
}

export default TodoHeader;