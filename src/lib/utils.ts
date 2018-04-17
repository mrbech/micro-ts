import * as Ajv from 'ajv'
import { IncomingMessage, ServerResponse } from 'http';
import * as micro from 'micro'

//Function that validates the format of the body based on the schemaType
//provided.
//A bit of a hack, schemaType is actually not of type T, but is a JSON schema.
//This allows us to use a JSON Schema delacred as the type it represents to
//provide type information, to the compiler. (See models/todo.js for schema declaration)
export async function validate<T>(req: IncomingMessage, schemaType: T): Promise<T> {
    const body: any = await micro.json(req)
    const ajv = new Ajv({ removeAdditional: true})

    //Spread is currently not working with generics...
    const schema = Object.assign({}, schemaType, { additionalProperties: false })
    const validate = ajv.compile(schema)
    const valid = validate(body)
    if(!valid) {
        throw createError(400, { 
            error: "Invalid body", 
            expectedSchema: schema,
            validationErrors: validate.errors
        })
    }

    return body as T
}

export function createError(statusCode: number, obj: any) {
    return micro.createError(statusCode, JSON.stringify(obj))
}
