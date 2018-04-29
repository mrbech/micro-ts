import micro from 'micro'
import * as knex from 'knex'
import { router, get, post, put } from 'microrouter'
import { Todo, TodoSchema } from './models/todo'
import { validate } from './utils'

const dbConfig = require('../knexfile.ts')

let todos: Todo[] = []
let db = knex(dbConfig[process.env.NODE_ENV || 'development'])

const getTodos = async (req, res) => {
    return await db('todo').orderBy('id')
}

const addTodo = async (req, res) => {
    let todo = await validate(req, TodoSchema)
    todo.createdAt = new Date()
    await db('todo').insert({ ...todo })
}

const updateTodo = async (req, res) => {
    let todo = await validate(req, TodoSchema)
    await db('todo')
        .where({ id: todo.id })
        .update({ ...todo, createdAt: undefined, id: undefined })
}

const server = micro(
    router(
        get('/todos', getTodos),
        post('/todos', addTodo),
        put('/todos', updateTodo)
    )
)

server.listen(3000)
