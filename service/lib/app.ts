import micro, { RequestHandler } from 'micro'
import * as knex from 'knex'
import * as t from 'io-ts'
import { DateFromISOString } from 'io-ts-types'
import { router, get, post, put } from 'microrouter'
import { validate, createError } from './utils'

const dbConfig = require('../knexfile.ts')

const InputTodo = t.interface({
    id: t.union([t.undefined, t.number]),
    message: t.string
})

type Todo = t.TypeOf<typeof InputTodo> & { createdAt: Date }

let db = knex(dbConfig[process.env.NODE_ENV || 'development'])

const getTodos: RequestHandler = async (req, res) => {
    return await db('todo').orderBy('id')
}

const addTodo: RequestHandler = async (req, res) => {
    let input = await validate(req, InputTodo)
    let todo: Todo = { ...input, id: undefined, createdAt: new Date() }
    await db('todo').insert(todo)
}

const updateTodo: RequestHandler = async (req, res) => {
    let todo = await validate(req, InputTodo)
    if(!todo.id) {
        throw createError(400, { error: "Please provide a postive number as id" })
    }
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
