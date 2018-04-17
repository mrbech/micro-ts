import micro from 'micro'
import { router, get, post } from 'microrouter'
import { Todo, TodoSchema } from './models/todo'
import { validate } from './utils'

let todos: Todo[] = [];

const getTodos = async (req, res) => todos
const addTodo = async (req, res) => {
    let todo = await validate(req, TodoSchema)
    todo.createdAt = new Date()
    todos = [...todos, todo]
}

const server = micro(
    router(
        get('/todos', getTodos),
        post('/todos', addTodo)
    )
)

server.listen(3000)
