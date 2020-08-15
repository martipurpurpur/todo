let list = document.querySelector('.list-group');
let items = list.children;
let form = document.querySelector('.add-form')
let newItemForm = form.querySelector('.input-task');
let taskTemplate = document.querySelector('#task-template').content;
let newItemTemplate = taskTemplate.querySelector('.list-group-item');
let emptyListMessage = document.querySelector('.empty-tasks');
let button = document.querySelector('.create');
let upButton = document.querySelector('.up-button');
let itemStorage;
let listStorage;

/* if empty tasks list */
let toggleEmptyListMessage = function () {
    if (items.length === 0) {
        emptyListMessage.classList.remove('hidden');
    } else {
        emptyListMessage.classList.add('hidden');
    }
};

/* if check important
let importantCheckHandler = function (item) {
    let checkbox = document.querySelector('.form-check-input');
    checkbox.addEventListener('change', function () {
        item.classList.add('important');
    });
};*/

form.addEventListener('submit', function (evt) {
    evt.preventDefault();

    let taskText = newItemForm.value;
    let task = newItemTemplate.cloneNode(true);
    let taskDescription = task.querySelector('.description');
    let taskNumber = task.querySelector('.number');

    taskDescription.textContent = taskText;
    taskNumber.textContent = items.length + 1 + '.';
    list.appendChild(task);

    doneTaskHandler(task);
    newItemForm.value = '';
});

/* to line through items */
let doneTaskHandler = function (item) {
    item.addEventListener('click', function() {
        item.classList.toggle('line-through');
    });
}

/* validation, to disabled button */
newItemForm.oninput = function () {
    button.disabled = (newItemForm.value.length > 142) || (newItemForm.value.length < 3);
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
