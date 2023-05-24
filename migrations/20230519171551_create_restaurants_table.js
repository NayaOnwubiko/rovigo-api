/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("restaurants", function(table) {
        table.increments("id").primary();
        table.integer("trip_id").unsigned().notNullable();
        table.string("restaurant_name").notNullable();
        table.string("restaurant_address");
        table.string("restaurant_phone");
        table.string("restaurant_website");
        table.string("restaurant_photo").notNullable();
        table.integer("location_id").notNullable();
        table.string("ranking_category").notNullable();
        table
            .foreign("trip_id")
            .references("id")
            .inTable("trips")
            .onUpdate("CASCADE")
            .onDelete("CASCADE");
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("restaurants");
};
