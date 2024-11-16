let $ = document
let inputElem = $.querySelector('#itemInput')
let addTodoBtn = $.getElementById('addButton')
let clearButton = $.querySelector('#clearButton')
let todoListelem = $.querySelector('#todoList')


let todosArray = []


// اضافه کردن تودو داخل آرایه 
function addNewTodo() {
    let newTodoTitle = inputElem.value

    let newTodoObj = {
        id: todosArray.length + 1,
        title: newTodoTitle,
        complete: false
    }

    inputElem.focus()

    todosArray.push(newTodoObj)
    setLocalStorage(todosArray)
    todosGenerator(todosArray)
}
// اضافه کردن آرایه داخل لوکال
function setLocalStorage(todoList) {
    localStorage.setItem('todos', JSON.stringify(todoList))
}
// ساختن بخش تودو ها 
function todosGenerator(todoList) {

    let newTodoLiElem, newTodoTitle, newTodoCompleteBtn, newTodoDeleteBtn;
    inputElem.value = ''
    todoListelem.innerHTML = ''

    todoList.forEach(function (todo) {
        newTodoLiElem = $.createElement('li')
        newTodoLiElem.className = 'completed well'


        newTodoTitle = $.createElement('label')
        newTodoTitle.innerHTML = todo.title

        newTodoCompleteBtn = $.createElement('button')
        newTodoCompleteBtn.innerHTML = 'Complete'
        newTodoCompleteBtn.className = 'btn btn-success'
        newTodoCompleteBtn.setAttribute('onClick', 'editTodo(' + todo.id + ')')

        newTodoDeleteBtn = $.createElement('button')
        newTodoDeleteBtn.innerHTML = 'Delete'
        newTodoDeleteBtn.className = 'btn btn-danger'
        newTodoDeleteBtn.setAttribute('onClick', 'removeTodo(' + todo.id + ')')

        if (todo.complete) {
            newTodoLiElem.className = 'uncompleted well'
            newTodoCompleteBtn.innerHTML = 'UnComplete'
        }

        newTodoLiElem.append(newTodoTitle, newTodoCompleteBtn, newTodoDeleteBtn)
        todoListelem.append(newTodoLiElem)
    })
}
// گرفتن مقادیر لوکال و برابر گذاشتن با آرایه
function getLocalStorage() {
    let localStorageTodos = JSON.parse(localStorage.getItem('todos'))

    if (localStorageTodos) {
        todosArray = localStorageTodos
    }
    else {
        todosArray = []
    }

    todosGenerator(todosArray)
}
// پاک کردن تودو ها و لوکال 
function clearTodos() {
    localStorage.removeItem('todos')
    todosArray = []

    todosGenerator(todosArray)
}
// پاک کردن همان تودو
function removeTodo(todoId) {

    let localStorageTodos = JSON.parse(localStorage.getItem('todos'))
    todosArray = localStorageTodos

    let mainTodoIndex = todosArray.findIndex(function (todo) {
        return todo.id === todoId
    })

    localStorageTodos.splice(mainTodoIndex, 1)

    setLocalStorage(todosArray)
    todosGenerator(todosArray)
}
// ادیت تودو
function editTodo(todoId) {

    let localStorageTodos = JSON.parse(localStorage.getItem('todos'))
    todosArray = localStorageTodos

    todosArray.forEach(function (todo) {
        if (todo.id === todoId) {
            todo.complete = !todo.complete
        }
        setLocalStorage(todosArray)
        todosGenerator(todosArray)
    })
}


window.addEventListener('load', getLocalStorage)
addTodoBtn.addEventListener('click', addNewTodo)
clearButton.addEventListener('click', clearTodos)
inputElem.addEventListener('keypress', function (event) {
    if (event.key == 'Enter') {
        addNewTodo()
    }
})