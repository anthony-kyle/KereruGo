exports.up = function (knex) {
  return knex.schema.createTable("images", (table) => {
    table.increments("id");
    table.string("user_img");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("images");
};
