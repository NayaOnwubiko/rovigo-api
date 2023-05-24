/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("attractions", function(table) {
        table.increments("id").primary();
        table.integer("trip_id").unsigned().notNullable();
        table.string("attraction_name").notNullable();
        table.string("attraction_address");
        table.string("attraction_website");
        table.string("attraction_phone")
        table.string("attraction_photo");
        table
            .foreign("trip_id")
            .references("id")
            .inTable("trips")
            .onUpdate("CASCADE")
            .onDelete("CASCADE");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("attractions");
};
