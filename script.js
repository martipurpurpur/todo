let list = document.querySelector('.list-group');
let items = list.children;
let form = document.querySelector('.add-form')
let newItemForm = form.querySelector('.input-task');
let taskTemplate = document.querySelector('#task-template').content;
let newItemTemplate = taskTemplate.querySelector('.list-group-item');
let emptyListMessage = document.querySelector('.empty-tasks');
let button = document.querySelector('.create');
let number = list.length;
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

/* to line through items */
for (let item of items) {
  item.onclick = function () {
    item.classList.toggle('line-through');
  }
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
