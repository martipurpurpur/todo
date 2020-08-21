let list = document.querySelector('.list-group');
let form = document.querySelector('.add-form')
let inputForm = form.querySelector('.input-task');
let taskTemplate = document.querySelector('#task-template').content;
let newItemTemplate = taskTemplate.querySelector('.list-group-item');
let emptyListMessage = document.querySelector('.empty-tasks');
let important = document.querySelector('.form-check-input');
let button = document.querySelector('.create');
let upButton = document.querySelector('.up-button');
let clearButton = document.querySelector('.clear');
let tempTaskArray = localStorage.getItem('list') ? JSON.parse(localStorage.getItem('list')) : [];

/* set data from temporary array to local storage */
localStorage.setItem('list', JSON.stringify(tempTaskArray));

/* get all data from localStorage */
const data = JSON.parse(localStorage.getItem('list'));

/* to checked any list for emptiness*/
let isEmptyList = function (checkedList) {
    return checkedList.length === 0;
}

/* to message if empty tasks list */
let toggleEmptyListMessage = function (items) {
    if (isEmptyList(items)) {
        emptyListMessage.classList.remove('hidden');
    } else {
        emptyListMessage.classList.add('hidden');
    }
};

/* to message if empty storage */
toggleEmptyListMessage(tempTaskArray);

/* to line through done items */
let doneTaskHandler = function (item) {
    item.addEventListener('click', function() {
        item.classList.toggle('line-through');
    });
}

/* render li items */
const renderingLiItems = function (itemTaskArray) {

    let task = newItemTemplate.cloneNode(true);
    let taskDescription = task.querySelector('.description');
   // let taskNumber = task.querySelector('.number');

    taskDescription.textContent = itemTaskArray.task;
    //taskNumber.textContent = tempTaskArray.length + 1 + '.';
    if (itemTaskArray.important) task.classList.add('important');
    list.appendChild(task);
    doneTaskHandler(task);

};

/* render previous added data from localStorage */
data.forEach(item => {
    renderingLiItems(item);
});

/* replace more than 1 whitespace symbols*/
String.prototype.reduceWhiteSpace = function() {
    return this.replace(/\s+/g, ' ');
};

/* listen event form and added new task in temporary array and localStorage */
form.addEventListener('submit', function (evt) {
    evt.preventDefault();

    let itemTaskArray = {
        task: inputForm.value.reduceWhiteSpace(),
        important: important.checked
    };
    tempTaskArray.push(itemTaskArray);
    localStorage.setItem('list', JSON.stringify(tempTaskArray));
    renderingLiItems(itemTaskArray);
    toggleEmptyListMessage(tempTaskArray);
    inputForm.value = '';
    important.checked = false;
});

/* delete all tasks */
clearButton.addEventListener('click', function() {
    localStorage.clear();
    tempTaskArray = [];
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
    $('#clear-modal').modal('hide') // bootstrap jQuery function modal
    toggleEmptyListMessage(tempTaskArray);
});

/* validation, to disabled button */
inputForm.oninput = function () {
    let value = inputForm.value.length;
    button.disabled = (value > 100) || (value < 3) && value !== 0;
};

/* validation task input
let validation = function () {

};
*/
/* up button */
window.onscroll = function () {
    if (window.pageYOffset > 200) {
      upButton.classList.add('shown');
    } else {
      upButton.classList.remove('shown');
    }
  };

upButton.onclick = function () {
    window.scrollTo(100, 50);
  };
