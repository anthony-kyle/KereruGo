exports.seed = (knex) =>
// Deletes ALL existing entries
  knex("locations")
    .del()
// Inserts seed entries
    .then(() => knex("locations").insert([
      // EDA
      {latitude: -41.296857, longitude: 174.774013, bird_density: 4, metres_rad: 200},
      {latitude: -41.296857, longitude: 174.774013, bird_density: 2, metres_rad: 50},

      // CAMBRIDGE TERRACE DATA CENTER
      {latitude: -41.293236, longitude: 174.783682, bird_density: 5, metres_rad: 50},

      //NEAR TEAM PEOPLES HOUSES
      // L
      {latitude: -41.306210, longitude: 174.775045, bird_density: 3, metres_rad: 100},
      // M
      {latitude: -41.294472, longitude: 174.762386, bird_density: 3, metres_rad: 100},
      // An
      {latitude: -41.213855, longitude: 174.803809, bird_density: 3, metres_rad: 100},
      //St
      {latitude: -41.308817, longitude: 174.765296, bird_density: 3, metres_rad: 100},
      {latitude: -41.294271, longitude: 174.758637, bird_density: 3, metres_rad: 100},
      
      //Sh
      {latitude: -41.3150814, longitude: 174.7909422, bird_density: 3, metres_rad: 100},

      //J
      {latitude: -41.342200, longitude: 174.772670, bird_density: 3, metres_rad: 100},

      //K
      {latitude: -41.285139, longitude: 174.773332, bird_density: 3, metres_rad: 100},
      {latitude: -41.332498, longitude: 174.772284, bird_density: 3, metres_rad: 100},

       //A
       {latitude: -40.854090, longitude: 175.035962, bird_density: 5, metres_rad: 200},
       {latitude: -45.868421, longitude: 170.482173, bird_density: 5, metres_rad: 200},

      // Otari-Wilton Bush
      {latitude: -41.2691165, longitude: 174.7605605, bird_density: 10, metres_rad: 1000},

      // Wellington Botanic Garden
      {latitude: -41.282944, longitude: 174.765947, bird_density: 7, metres_rad: 500},
      
      //COASTAL
      {latitude: -41.287201, longitude: 174.779317, bird_density: 12, metres_rad: 500},
      {latitude: -41.290510, longitude: 174.783867, bird_density: 12, metres_rad: 500},
      {latitude: -41.291541, longitude: 174.803823},
      {latitude: -41.293703, longitude: 174.822347},
      {latitude: -41.302534, longitude: 174.831119},
      {latitude: -41.322067, longitude: 174.834515},
      {latitude: -41.344210, longitude: 174.820702},
      {latitude: -41.330750, longitude: 174.793898},
      {latitude: -41.341995, longitude: 174.784972},
      {latitude: -41.348413, longitude: 174.765507},
      
      //FOREST
      {latitude: -41.308967, longitude: 174.789626, bird_density: 3, metres_rad: 300},
      {latitude: -41.327038, longitude: 174.783456, bird_density: 6, metres_rad: 600},
      {latitude: -41.295969, longitude: 174.794316},
      {latitude: -41.298799, longitude: 174.791590},
      {latitude: -41.293838, longitude: 174.761238},
      {latitude: -41.291541, longitude: 174.803823},
      {latitude: -41.302534, longitude: 174.831119},
      {latitude: -41.344210, longitude: 174.820702},
      {latitude: -41.341995, longitude: 174.784972},
      {latitude: -41.290357, longitude: 174.753291},

      //MAKARA BEACH
      {latitude: -41.227381, longitude: 174.704072, bird_density: 13, metres_rad: 1000},

       //PORIRUA

       {latitude: -41.127554, longitude: 174.850574},
       {latitude: -41.127542, longitude: 174.850873},
       {latitude: -41.127777, longitude: 174.850673},
       {latitude: -41.124762, longitude: 174.852905},

      //ZEALANDIA
      {latitude: -41.291691, longitude: 174.748956},
      {latitude: -41.294721, longitude: 174.748063},
      {latitude: -41.293283, longitude: 174.752171},
      {latitude: -41.299724, longitude: 174.747451},
      {latitude: -41.298919, longitude: 174.739872},

      // MAKARA MOUNTAIN BIKE PARK
      {latitude: -41.293428, longitude: 174.709614},
      {latitude: -41.293033, longitude: 174.717651},

      // TINAKORI HILL
      {latitude: -41.272846, longitude: 174.768477, bird_density: 10, metres_rad: 400},
      {latitude: -41.268074, longitude: 174.770277, bird_density: 10, metres_rad: 400},

      // PALMERSTON NORTH
      {latitude: -40.356554, longitude: 175.611440, bird_density: 23, metres_rad: 10000},


      // SOUTH ISLAND
      //Nelson
      {latitude: -41.278476, longitude: 172.854119, bird_density:4, metres_rad: 300},
      {latitude: -41.335511, longitude: 173.307786, bird_density:9, metres_rad: 1000},
      //Christchurch
      {latitude: -43.560602, longitude: 172.671803, bird_density:9, metres_rad: 500},
      {latitude: -43.534443, longitude: 172.649159, bird_density:3, metres_rad: 200},
      {latitude: -43.504919, longitude: 172.615631, bird_density:7, metres_rad: 400},


    ]));
