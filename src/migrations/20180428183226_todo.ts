import * as Knex from "knex";

exports.up = function (knex: Knex): Promise<any> {
    return knex.schema.createTable('todo', (table) => {
        table.increments()
        table.string('message')
        table.date('createdAt')
    })
};

exports.down = function (knex: Knex): Promise<any> {
    return knex.schema.dropTable('todo')
};
