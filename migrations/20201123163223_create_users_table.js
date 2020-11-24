
exports.up = function(knex) {
    return knex.schema.createTable('users', tbl => {
        tbl.increments() //auto id
        tbl.text('username').notNullable()
        tbl.text('avatar_url')
        tbl.text('user_url')
        tbl.integer('github_id').notNullable()

    })
    .createTable('repos', tbl => {
        tbl.increments()
        tbl.integer('user_id') //Foreign key associated with users.id
            .unsigned()
            .references('github_id')
            .inTable('users')
            .onDelete('CASCADE')
            .onUpdate('CASCADE')
        tbl.text('name').notNullable()
        tbl.text('fullname')
        tbl.boolean('public_access')
        tbl.text('repo_url')
        tbl.text('description')
        tbl.text('language')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('repos').dropTableIfExists('users')
};
