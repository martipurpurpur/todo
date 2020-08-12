let form = document.querySelector('.task');
let input = document.querySelector('.input');
let list = document.querySelector('.list-group');
let listItem = document.querySelectorAll('.list-group-item');
let button = document.querySelector('.create');
let number = listItem.length;
let upButton = document.querySelector('.up-button');

form.onsubmit = function (evt) {
   evt.preventDefault();
  let newListItem = document.createElement('li');
  newListItem.classList.add('list-group-item');

  number++;

  newListItem.textContent = number + ". " + input.value ;
  list.append(newListItem);

  input.value = '';
}

for (let item of listItem) {
  item.onclick = function () {
    item.classList.toggle('line-through');
  }
}

input.oninput = function () {
    button.disabled = (input.value.length > 142) || (input.value.length < 3);
  }

window.onscroll = function () {
    if (window.pageYOffset > 200) {
      upButton.classList.add('shown');
    } else {
      upButton.classList.remove('shown');
    }
  };

upButton.onclick = function () {
    window.scrollTo(100, 50);
  }
