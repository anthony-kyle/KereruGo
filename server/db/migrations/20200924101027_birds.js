exports.up = function(knex) {
  return knex.schema.createTable('birds', table => {
    table.increments('id')
    table.string('bird_name')
    table.string('bird_english_name')
    table.string('bird_img')
    table.string('bird_audio')
    table.string('bird_rarity')
    table.boolean('bird_nocturnal')
    table.string('bird_tag')
    table.string('bird_info', 5000)
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('birds')
};