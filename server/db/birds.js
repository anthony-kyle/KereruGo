const connection = require('./connection')

function getAllHabitats (db = connection) {
  return db('habitats').select()
}

function getHabitatsByBirdId (bird_id, db = connection) {
  return db('habitats')
  .join('birds_habitats', 'habitats.id', 'birds_habitats.habitat_id')
  .where('bird_id', bird_id)
}

function getAllBirdTypes (db = connection) {
  return db('birds').select()
}

function getBirdById (id, db = connection) {
  return db('birds')
    .where('id', id)
    .first()
}

function getAllLocations (db = connection) {
  return db('locations').select()
}

function getScrapbookEntries (user_id, db = connection) {
  return db('scrapbooks')
    .where('user_id', user_id)
    .select()
}

function getBirdCount (db = connection) {
  return db('birds')
    .count('id as count')
    .first()
}

function generateRandomBirdID (limit) {
  return Math.ceil(Math.random() * limit)
}

function addScrapbookEntry (entry, db = connection) {
  return db('scrapbooks')
  .insert(entry)
}

module.exports = {
  getAllHabitats,
  getHabitatsByBirdId,
  getAllBirdTypes,
  getBirdById,
  getAllLocations,
  getScrapbookEntries,
  getBirdCount,
  generateRandomBirdID,
  addScrapbookEntry
}
