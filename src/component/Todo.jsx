import React, { useState, useEffect, useRef } from 'react';
import moment from 'moment-timezone';

export default function Todo() {
  const [date, setDate] = useState(moment().tz('Asia/Seoul'));
  const [data, setData] = useState([]);
  const inputRef = useRef();
  const formRef = useRef();
  useEffect(() => {
    function addItem(event) {
      event.preventDefault();
      if (inputRef.current.value === '') {
        return;
      }
      if (inputRef.current.value === '#초기화#') {
        setData([]);
        inputRef.current.value = '';
        return;
      }
      setDate(moment().tz('Asia/Seoul'));
      setData([[inputRef.current.value, date], ...data]);
      inputRef.current.value = '';
    }
    formRef.current.addEventListener('submit', addItem);
    const dateInt = setInterval(() => {
      setDate(moment().tz('Asia/Seoul'));
    }, 500);
    return () => {
      clearInterval(dateInt);
      formRef.current.removeEventListener('submit', addItem);
    };
  }, [date, data, inputRef]);
  return (
    <div id="todoWrap">
      <div className="title">오늘 할일</div>
      <p className="clock">
        {date.format('현재시각: YYYY년 MM월 DD일 HH시 mm분 ss초')}
      </p>
      <div className="content">
        <form ref={formRef}>
          <input id="todoInput" ref={inputRef} />
        </form>
        <ul id="todoList">
          {data.map(x => {
            return (
              <li className="todoItem" key={x[1]}>
                <span className="todoItemContent">{x[0]}</span>
                <span className="todoItemAgo">{x[1].fromNow()}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
