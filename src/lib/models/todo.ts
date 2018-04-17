export interface Todo {
    message: string
    createdAt: Date
}

//See ../utils.js for why this hack is useful. 
//We somewhat abuse TypeScript lack macros or runtime type information for
//interfaces
const schemas = require('./schemas.json')
export const TodoSchema: Todo = schemas.definitions.Todo
