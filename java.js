'use strict';

const getBank = () => JSON.parse(localStorage.getItem ('todoList')) ?? [];
const setBank = (bank) => localStorage.setItem('todoList', JSON.stringify(bank));

const createItem = (task, status, index) => {
    const item = document.createElement('label');
    item.classList.add('todo__item');
    item.innerHTML = `
        <input type="checkbox" ${status} data-index=${index}>
        <div>${task}</div>
        <input type="button" value="X" data-index=${index}>
    `
    document.getElementById('todoList').appendChild(item);
}

const cleanTasks = () => {
    const todoList = document.getElementById('todoList');
    while (todoList.firstChild) {
        todoList.removeChild(todoList.lastChild);
    }
}

const refreshScreen = () => {
    cleanTasks();
    const bank = getBank();
    bank.forEach ( (item, index) => createItem (item.task, item.status, index));
}

const insertItem = (event) => {
    const key = event.key;
    const text = event.target.value;
    if (key === 'Enter'){
        const bank = getBank();
        bank.push ({'task': text, 'status': ''})
        setBank(bank);
        refreshScreen();
        event.target.value = '';
         
    }
}

const removerItem = (index) => {
    const bank = getBank();
    bank.splice (index, 1);
    setBank(bank);
    refreshScreen();
}

const refreshItem = (index) => {
    const bank = getBank();
    bank[index].status = bank[index].status === '' ? 'checked' : '';
    setBank(bank);
    refreshScreen();
}

const clickItem = (event) => {
    const element = event.target;
    if (element.type === 'button') {
        const index = element.dataset.index;
        removerItem(index);
    }else if (element.type === 'checkbox') {
        const index = element.dataset.index;
        refreshItem (index);
    }
}

document.getElementById('newItem').addEventListener('keypress',insertItem);
document.getElementById('todoList').addEventListener('click', clickItem)

refreshScreen();