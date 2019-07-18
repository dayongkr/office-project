import React, { useState, useEffect } from 'react';
import Todo from './component/Todo';

export default function App() {
  const [content, setContent] = useState('todo');
  useEffect(() => {
    function onClick(event) {
      for (
        let i = 0;
        i < document.querySelectorAll('#mainMenu li').length;
        i += 1
      ) {
        if (
          document.querySelectorAll('#mainMenu li')[i].classList[0] ===
          'selected'
        ) {
          document.querySelectorAll('#mainMenu li')[i].classList = '';
        }
      }
      const e = event;
      setContent(event.target.dataset.name);
      e.target.classList = 'selected';
    }
    const lists = document.querySelectorAll('#mainMenu li');
    for (let i = 0; i < lists.length; i += 1) {
      lists[i].addEventListener('click', onClick);
    }
    return () => {
      for (let i = 0; i < lists.length; i += 1) {
        lists[i].removeEventListener('click', onClick);
      }
    };
  }, [content]);
  return (
    <>
      <div id="sidebar">
        <div id="profile">
          <div id="profileImg" />
          <div id="profileDetails">
            <div id="profileName">이다용</div>
            <div id="profileSummary">놀이터입니다~</div>
          </div>
        </div>
        <ul id="mainMenu">
          <li className="selected" data-name="todo">
            오늘 할일
          </li>
          <li>TEST</li>
          <li>TEST</li>
          <li>TEST</li>
          <li>TEST</li>
          <li>TEST</li>
          <li>TEST</li>
          <li>TEST</li>
        </ul>
      </div>
      <div id="content">{content === 'todo' && <Todo />}</div>
    </>
  );
}
