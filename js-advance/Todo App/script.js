class Model {
    constructor() {
        this.todos = [
            {id: 1, content: 'Take a nap', complete: false},
            {id: 2, content: 'Read a book', complete: false},
            {id: 3, content: 'Walk the dog', complete: false},
            {id: 4, content: 'Plank 10s', complete: false},
            {id: 5, content: 'Organize the office', complete: false},
        ]
    }

    addTodo(content) {
        const newTodo = {
            id: this.todos.length > 0 ? this.todos[this.todos.length - 1].id + 1 : 1,
            content,
            complete: false
        }
        this.todos.push(newTodo)
        //* Render all todos after every methods
        this.onTodoListChanged(this.todos)
    }
    searchTodo(value) {
        let contentTodos = this.todos.map(todo => todo.content)
        let searchTodos = contentTodos.filter(item => item.indexOf(value) > -1) 
        let tempTodos = []

        searchTodos.forEach(searchTodo => {
            this.todos.map(todo => {
                if (todo.content === searchTodo.toString()) tempTodos.push(todo)
            })
        })
        //* Render all todos after every methods
        this.onTodoListChanged(tempTodos) 
    }
    removeTodo(id) {
        this.todos.splice(id - 1, 1)
        // Update id 
        this.todos.map(function(todo) {
            if (todo.id > id) todo.id -= 1
        })
        //* Render all todos after every methods
        this.onTodoListChanged(this.todos)
    }
    updateTodo(id, updatedContent) {
        this.todos = this.todos.map(todo =>
            todo.id === id ? {id: todo.id, content: updatedContent, complete: todo.complete} : todo
        )
        //* Render all todos after every methods
        this.onTodoListChanged(this.todos)
    }
    toggleTodo(id) {
        this.todos = this.todos.map(todo => 
            todo.id === id ? {id: todo.id, content: todo.content, complete: !todo.complete} : todo
        )
        //* Render all todos after every methods
        this.onTodoListChanged(this.todos)  
    }
    bindTodoListChanged(callback) {
        this.onTodoListChanged = callback
    }
}

class View {
    constructor() {
        this.main = this.getElement('.main')

        this.title = this.createElement('h1')
        this.title.textContent = 'Todo List'
        
        this.form = this.createElement('form')

        this.createInput = this.createElement('input')
        this.createInput.type = 'text'
        this.createInput.placeholder = 'Add a todo here...'
        this.createInput.name = 'create-todo'

        this.createButton = this.createElement('input')
        this.createButton.type = 'submit'
        this.createButton.value = '+'

        this.searchInput = this.createElement('input')
        this.searchInput.type = 'text'
        this.searchInput.name = 'search-todo'

        this.searchButton = this.createElement('input')
        this.searchButton.type = 'submit'
        this.searchButton.value = '\u2315'

        this.todoList = this.createElement('ul', 'todo-list')

        this.form.append(this.createInput, this.createButton)
        this.form.append(this.searchInput, this.searchButton)
        this.main.append(this.title, this.form, this.todoList)

        this._temporaryTodo
        this._initLocalListeners()
    }

    get _todoText() {
        return this.createInput.value
    }
      
    _resetInput() {
        this.createInput.value = ''
    }

    // User-defined function
    getElement(selector) {
        const element = document.querySelector(selector)
        return element
    }

    // User-defined function
    createElement(tag, className) {
        const element = document.createElement(tag)
        if (className) element.classList.add(className)
        return element
    }

    updateDisplay(todos) {
        // Clear all todos in list
        while (this.todoList.firstChild) {
            this.todoList.removeChild(this.todoList.firstChild)
        }

        if (todos.length === 0) {
            const p = this.createElement('p')
            p.textContent = 'Nothing to do ...'
            this.todoList.append(p)
        }
        else {
            // Render all todos
            todos.forEach(todo => {
                const li = this.createElement('li')
                li.id = todo.id

                const checkbox = this.createElement('input')
                checkbox.type = 'checkbox'
                checkbox.checked = todo.complete

                const span = this.createElement('span')
                span.contentEditable = true
                span.classList.add('editable')

                if (todo.complete) {
                    const strike = this.createElement('s')
                    strike.textContent = todo.content
                    span.append(strike)
                }
                else {
                    span.textContent = todo.content
                }

                const deleteButton = this.createElement('button', 'delete-btn')
                deleteButton.textContent = 'Delete'

                li.append(checkbox, span, deleteButton)

                this.todoList.append(li)
            })
        }
    }

    //* Event listeners
    // View dispatches what will happen in response to the event to the controller.
    bindAddTodo(handler) {
        this.form.addEventListener('submit', e => {
            e.preventDefault()

            if (this._todoText) {
                handler(this._todoText)
                this._resetInput()
            }
        })
    }
    bindSearchTodo(handler) {
        this.searchInput.addEventListener('keyup', e => {
            const searchValue = this.searchInput.value
            handler(searchValue)
        })
    }
    _initLocalListeners() {
        this.todoList.addEventListener('input', e => {
            if (e.target.className = 'editable') {
                this._temporaryTodo = e.target.innerText
            }
        })
    }
    bindUpdateTodo(handler) {
        this.todoList.addEventListener('focusout', e => {
            if (this._temporaryTodo) {
                const id = parseInt(e.target.parentElement.id)
                handler(id, this._temporaryTodo)
                this._temporaryTodo = ''
            }
        })
    }
    bindRemoveTodo(handler) {
        this.todoList.addEventListener('click', e => {
            if (e.target.className === 'delete-btn') {
                const id = parseInt(e.target.parentElement.id)
                handler(id)
            }
        })
    }
    bindToggleTodo(handler) {
        this.todoList.addEventListener('click', e => {
            if (e.target.type === 'checkbox') {
                const id = parseInt(e.target.parentElement.id)
                handler(id)
            }
        })
    }
}

class Controller {
    constructor(model, view) {
        this.model = model
        this.view = view

        //* Bind methods listening for events to the view.
        this.view.bindAddTodo(this.handleAddTodo)
        this.view.bindSearchTodo(this.handleSearchTodo)
        this.view.bindUpdateTodo(this.handleUpdateTodo)
        this.view.bindRemoveTodo(this.handleRemoveTodo)
        this.view.bindToggleTodo(this.handleToggleTodo)
        
        //* Display initial todos
        // Model communicates to view through controler
      
        // bindTodoListChanged(callback) {
            // this.onTodoListChanged = callback
        // }    
        this.onTodoListChanged(this.model.todos)

        //* Bind method listeninng for data changes to the model
        this.model.bindTodoListChanged(this.onTodoListChanged)
        //model.onTodoListChanged = app.onTodoListChanged
        //app.onTodoListChanged(app.view.updateDisplay(app.model.todos))
    }
    onTodoListChanged = (todos) => {this.view.updateDisplay(todos)}

    handleAddTodo = (content) => this.model.addTodo(content)
    handleSearchTodo = (value) => this.model.searchTodo(value)
    handleRemoveTodo = (id) => this.model.removeTodo(id)
    handleUpdateTodo = (id, updatedContent) => this.model.updateTodo(id, updatedContent)
    handleToggleTodo = (id) => this.model.toggleTodo(id)
}

const app = new Controller(new Model(), new View())