
exports.up = function(knex) {
    return knex.schema.createTable('users', tbl => {
        tbl.increments() //auto id
        tbl.text('username').notNullable()
        tbl.text('bio')
        tbl.text('location')
        tbl.text('user_url')

    })
    .createTable('repos', tbl => {
        tbl.increments()
        tbl.integer('user_id') //Foreign key associated with users.id
            .unsigned()
            .references('id')
            .inTable('users')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
        tbl.text('name').notNullable()
        tbl.boolean('public_access')
        tbl.text('repo_url')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('repos').dropTableIfExists('users')
};
