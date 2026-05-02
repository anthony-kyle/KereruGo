
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('birds_habitats').del()
    .then(function () {
      // Inserts seed entries
      return knex('birds_habitats').insert([
        {bird_id: 1, habitat_id: 1},
        {bird_id: 1, habitat_id: 2},
        {bird_id: 2, habitat_id: 3},
        {bird_id: 2, habitat_id: 4},
        {bird_id: 3, habitat_id: 5},
        {bird_id: 4, habitat_id: 3},
        {bird_id: 4, habitat_id: 4},
        {bird_id: 5, habitat_id: 4},
        {bird_id: 5, habitat_id: 1},
        {bird_id: 6, habitat_id: 3},
        {bird_id: 6, habitat_id: 4},
        {bird_id: 7, habitat_id: 3},
        {bird_id: 7, habitat_id: 1},
        {bird_id: 7, habitat_id: 4},
        {bird_id: 8, habitat_id: 6},
        {bird_id: 9, habitat_id: 6},
        {bird_id: 10, habitat_id: 5},
        {bird_id: 10, habitat_id: 3},
        {bird_id: 11, habitat_id: 3},
        {bird_id: 12, habitat_id: 3},
        {bird_id: 12, habitat_id: 4},
        {bird_id: 13, habitat_id: 3},
        {bird_id: 13, habitat_id: 4},
        {bird_id: 14, habitat_id: 3},
        {bird_id: 14, habitat_id: 4},
        {bird_id: 15, habitat_id: 6},
        {bird_id: 15, habitat_id: 4},
        {bird_id: 16, habitat_id: 1},
        {bird_id: 17, habitat_id: 1},
        {bird_id: 18, habitat_id: 1},
        {bird_id: 19, habitat_id: 3},
        {bird_id: 20, habitat_id: 1},
        {bird_id: 20, habitat_id: 3}
      ]);
    });
};
