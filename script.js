const form = document.getElementById('form');
const input = document.getElementById('input');
const todos_ul = document.getElementById('todos');

const todoList = JSON.parse(localStorage.getItem('todos'))
if(todoList){
    todoList.forEach(element => {
        addToDo(element)
    });
}

form.addEventListener('submit', (e)=>{
    e.preventDefault();

    addToDo();
})

function addToDo( todo ){
    let todoText = input.value;
    if(todo){
        todoText = todo.text;
    }
   if(todoText){
       const todoElement = document.createElement('li');
      if ( todo && todo.completed){
          todoElement.classList.add('completed')
      }
      todoElement.innerText = todoText;

      todoElement.addEventListener('click', ()=>{
          todoElement.classList.toggle('completed')
          updateLocalStorage()
      })
      todoElement.addEventListener('contextmenu', (e)=>{
        e.preventDefault();

        todoElement.remove()
        updateLocalStorage()
    })

      todos_ul.appendChild(todoElement);
      input.value = '';

      updateLocalStorage()
   }
}
function updateLocalStorage(){

    todosEl = document.querySelectorAll('li')

    const todos = []

    todosEl.forEach(todoEl =>{
        todos.push({
            text:todoEl.innerText,
            completed: todoEl.classList.contains('completed')
        })
    })
    localStorage.setItem('todos', JSON.stringify(todos))
}