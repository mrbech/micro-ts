import { PathReporter } from 'io-ts/lib/PathReporter'
import * as t from 'io-ts'
import { IncomingMessage, ServerResponse } from 'http';
import * as micro from 'micro'

//Function that uses an io-ts interface definition to validate the requests JSON body
export async function validate<P, A, O, I>(req: IncomingMessage, validator: t.InterfaceType<P, A, O, I>) {
    const body: any = await micro.json(req)
    const v = validator.decode(body)
    if(v.isLeft()) {
        throw createError(400, { 
            error: "Invalid body", 
            validationErrors: PathReporter.report(v)
        })
    }
    return v.value as t.TypeOf<typeof validator>
}

//Function that throws a micro error with body as json
export function createError(statusCode: number, obj: any) {
    return micro.createError(statusCode, JSON.stringify(obj))
}
