
exports.up = function(knex) {
    return knex.schema.createTable('incidents', function(table){
        table.increments(); // Retorna valor númerico auto-incremental

        table.string('title').notNullable();
        table.string('description').notNullable();
        table.float('value').notNullable();
        
        table.string('ong_id').notNullable();
        // Definição da chave estrangeira
        table.foreign('ong_id').references('id').inTable('ongs');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('incidents');
};
