'use strict';
const rootEl = document.getElementById('root');
const messageEl = document.createElement('div');
messageEl.dataset.id = 'message';
rootEl.appendChild(messageEl);
const formEl = document.createElement('form');
rootEl.appendChild(formEl);
formEl.dataset.id='todo-form';
const nameDiv = document.createElement('div');
const addDiv = document.createElement('div');
formEl.appendChild(nameDiv);
formEl.appendChild(addDiv);
const todoText = document.createElement('label');
todoText.htmlFor = 'todo-text';
todoText.textContent = 'Name';
nameDiv.appendChild(todoText);
const todoTextIn = document.createElement('input');
todoTextIn.dataset.input = 'text';
todoTextIn.id = 'todo-text';
nameDiv.appendChild(todoTextIn);
const todoNum = document.createElement('label');
todoNum.htmlFor = 'todo-priority';
todoNum.textContent = 'Priority';
const todoNumIn = document.createElement('input');
todoNumIn.dataset.input = 'priority';
todoNumIn.id = 'todo-priority';
todoNumIn.type = 'number';
addDiv.appendChild(todoNum);
addDiv.appendChild(todoNumIn);
const addButton = document.createElement('button');
addButton.dataset.action = 'add';
addButton.textContent = 'Add';
formEl.appendChild(addButton);
const tasks = [];
const ulEl = document.createElement('ul');
ulEl.dataset.id = 'todo-list';
rootEl.appendChild(ulEl);
formEl.addEventListener("submit", (event) => addTask(event, tasks, ulEl));

function addTask(event, task, tasklist) {
  event.preventDefault();
  const tas = event.target.elements[0].value.trim();
  const priority = Number(event.target.elements[1].value);
  if (!tas) {
    alert("Значение поля не может быть пустым");
    return;
  }
  if (!priority  && priority !== Number) {
    alert("Значение поля не может быть пустым  и не может быть строкой");
    return;
  }
  task.push({ tas, priority });
  renderList(task, tasklist);
  todoTextIn.focus();
  formEl.reset(); 
}

function renderList(task, tasklist) {
  tasklist.innerHTML = "";
  task.sort((a, b) => a.priority - b.priority);
  task.forEach((tas) => {
    const li = document.createElement("li");
    li.innerHTML = `${tas.tas} (приоритет: ${tas.priority}) `;
    const increasePriority = document.createElement("button");
    increasePriority.innerText = "+";
    increasePriority.addEventListener("click", () =>
      increase(li, tas.priority, task)
    );
    li.appendChild(increasePriority);
    const decreasePriority = document.createElement("button");
    decreasePriority.innerText = "-";
    decreasePriority.addEventListener("click", () =>
      decrease(li, tas.priority, task)
    );
    li.appendChild(decreasePriority);
    tasklist.appendChild(li);
  });
}

function increase(item, priority, task) {
  priority++;
  item.innerHTML = item.innerHTML.replace(/\d+/, priority);
  task.find((tas) => tas.tas === item.innerText.split(" ")[0]).priority = priority;
  task.sort((a, b) => a.priority - b.priority);
  renderList(task, item.parentNode);
}

function decrease(item, priority, task) {
  priority--;
  item.innerHTML = item.innerHTML.replace(/\d+/, priority);
  task.find((tas) => tas.tas === item.innerText.split(" ")[0]).priority = priority;
  task.sort((a, b) => a.priority - b.priority);
  renderList(task, item.parentNode);
}




