/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("hotels", function(table) {
        table.increments("id").primary();
        table.integer("trip_id").unsigned().notNullable();
        table.string("listing_key").notNullable();
        table.string("hotel_name").notNullable();
        table.string("hotel_photo");
        table.integer("rating").notNullable();
        table.string("price").notNullable();
        table.string("ranking_category").notNullable();
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
    return knex.schema.dropTable("hotels");
};
