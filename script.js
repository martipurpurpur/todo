let list = document.querySelector('.list-group');
let items = list.children;
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

localStorage.setItem('list', JSON.stringify(tempTaskArray));

/* get all in localStorage */
const data = JSON.parse(localStorage.getItem('list'));

/* to message if empty tasks list */
let toggleEmptyListMessage = function (items) {
    if (isEmptyList(items)) {
        emptyListMessage.classList.remove('hidden');
    } else {
        emptyListMessage.classList.add('hidden');
    }
};

/* to checked any list for emptiness*/
let isEmptyList = function (checkedList) {
    return checkedList.length === 0;
}

/* to line through items */
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

/* listen event form and added new task in temporary array and localStorage */
form.addEventListener('submit', function (evt) {
    evt.preventDefault();

    let itemTaskArray = {
        task: inputForm.value,
        important: important.checked
    };
    tempTaskArray.push(itemTaskArray);
    localStorage.setItem('list', JSON.stringify(tempTaskArray));
    renderingLiItems(itemTaskArray);

    inputForm.value = '';
});

/* delete all tasks */
clearButton.addEventListener('click', function() {
    localStorage.clear();
    tempTaskArray = [];
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
});

/* validation, to disabled button */
inputForm.oninput = function () {
    button.disabled = (inputForm.value.length > 142) || (inputForm.value.length < 3);
  };


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
