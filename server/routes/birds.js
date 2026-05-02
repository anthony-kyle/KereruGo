const express = require("express");
const { getTokenDecoder } = require("authenticare/server");
//Beneath this line introduce Multer and upload middleware.

const {
  getAllHabitats,
  getHabitatsByBirdId,
  getAllBirdTypes,
  generateRandomBirdID,
  getBirdCount,
  getBirdById,
  getAllLocations,
  getScrapbookEntries,
  addScrapbookEntry,
} = require("../db/birds");
const { getUserBadges, addToCount, addBadge } = require("../db/users");
const { getImage, addImage } = require("../db/users");

const router = express.Router();

const multer = require("multer");
const { persistProfileImage } = require("../lib/persistProfileImage");

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
});

//Beneath this, we will write the post/get routes for the image upload.
//we will pass it functions from the database

router.get("/habitats", getTokenDecoder(), getHabitats);
router.get("/birdTypes", getTokenDecoder(), getBirdTypes);
router.get("/bird/:id", getTokenDecoder(), getBird);
router.get("/locations", getTokenDecoder(), getLocations);
router.get("/scrapbook/:id", getTokenDecoder(), getScrapbook);
router.post("/scrapbook", getTokenDecoder(), addEntry);
router.post("/badges/:id", getTokenDecoder(), addCurrentCount);
router.get("/badges/:id", getTokenDecoder(), getBadges);

//Token Decoder = Connect to the server?
//Second argument will be the function that gets fired
//which will in turn call the database function
// router.get("/profile/:id", getTokenDecoder(), getImage);
router.post(
  "/profile/:id",
  getTokenDecoder(),
  upload.single("profile-pic"),
  insertImage
);

router.use(errorHandler);

function getHabitats(req, res) {
  return getAllHabitats().then((habitats) => {
    const sanitized = habitats.map((habitat) => {
      return {
        habitatId: habitat.id,
        habitatName: habitat.habitat_name
      }
    })
    return res.json(sanitized)
  })
}

function getBirdTypes(req, res) {
  return getAllBirdTypes().then((birdTypes) => {
    const sanitized = birdTypes.map((bird) => {
      return {
        birdId: bird.id,
        birdName: bird.bird_name,
        birdEnglishName: bird.bird_english_name,
        birdImg: bird.bird_img,
        birdAudio: bird.bird_audio,
        birdRarity: bird.bird_rarity,
        birdNocturnal: bird.bird_nocturnal,
        birdTag: bird.bird_tag,
        birdInfo: bird.bird_info,
      };
    });
    return res.json(sanitized);
  });
}

function getBird(req, res) {
  const id = req.params.id;
  return getBirdById(id).then((bird) => {
    const sanitized = {
      birdId: bird.id,
      birdName: bird.bird_name,
      birdEnglishName: bird.bird_english_name,
      birdImg: bird.bird_img,
      birdRarity: bird.bird_rarity,
      birdNocturnal: bird.bird_nocturnal,
      birdTag: bird.bird_tag,
      birdInfo: bird.bird_info,
    };
    return res.json(sanitized);
  });
}

function getLocations(req, res) {
  // Fetch count of birds to use in random bird id generation
  return getBirdCount().then(({ count }) => {
    // Get all seed locations
    return getAllLocations().then((locations) => {
      // Define constants
      const metresToLatConversionFactor = 111111.111111111;
      const metresToLongConversionFactor = 83333.333333333;

      // Util Functions
      const randomDirection = () => {
        if (Math.random() > 0.5) {
          return -1;
        } else {
          return 1;
        }
      };

      // Map over seed locations to make surrounding randomLocations
      let randomLocations = [];
      let newId = locations.length + 1000;
      locations.map((location) => {
        const birdDensity =
          Number(location.bird_density) ||
          Math.ceil(Math.random() * (5 - 2) + 2);
        const metresRad = Number(location.metres_rad) || 100;
        const latSpread = metresRad / metresToLatConversionFactor;
        const longSpread = metresRad / metresToLongConversionFactor;
        const randomLat = () => Math.random() * latSpread * randomDirection();
        const randomLong = () => Math.random() * longSpread * randomDirection();

        for (i = 0; i < birdDensity; i++) {
          newId++;
          randomLocations.push({
            id: newId,
            latitude: Number(location.latitude) + randomLat(),
            longitude: Number(location.longitude) + randomLong(),
            bird_density: Number(location.bird_density),
            metres_rad: Number(location.metres_rad),
          });
        }
      });

      // Below function calls the Promise.all function to get 1 random bird per randomLocation
      const fetchBirds = async (randomLocations) => {
        const birds = randomLocations.map(() => {
          return getBirdById(generateRandomBirdID(count)).then((bird) => {
            return bird;
          });
        });
        return Promise.all(birds);
      };
      // Call the above function
      fetchBirds(randomLocations)
        // Then map the two arrays together (birds and randomLocations)
        .then((birds) => {
          const sanitized = randomLocations.map((location, i) => {
            return {
              locId: location.id,
              lat: location.latitude,
              long: location.longitude,
              locMetresRad: location.metres_rad || 100,
              locBirdDensity: location.bird_density || 5,
              birdId: birds[i].id,
              birdName: birds[i].bird_name,
              birdEnglishName: birds[i].bird_english_name,
              birdImg: birds[i].bird_img,
              birdAudio: birds[i].bird_audio,
              birdRarity: birds[i].bird_rarity,
              birdNocturnal: birds[i].bird_nocturnal,
              birdTag: birds[i].bird_tag,
              birdInfo: birds[i].bird_info,
            };
          });
          res.json(sanitized);
        });
    });
  });
}

function getScrapbook(req, res) {
  const user_id = req.params.id;
  return getScrapbookEntries(user_id).then((entries) => {
    return getAllBirdTypes()
      .then(birds => {
        // Promise All function to get habitats for birds
        const fetchHabitats = async (birds) => {
          const birdsWithHabitats = birds.map(bird => {
          return getHabitatsByBirdId(bird.id)
            .then(habitats => {
              bird.habitats = habitats
              return bird
            })
          })
          return Promise.all(birdsWithHabitats)
        }
      // Call the above Promise All  
      fetchHabitats(birds)
      .then((birdsWithHabitats) => {
        const sanitized = birdsWithHabitats.map(bird => {
          const foundIndex = entry => {
            return entry.bird_id === bird.id
          }
          if (entries.findIndex(foundIndex) > -1) {
            return {
              birdId: bird.id,
              birdName: bird.bird_name,
              birdEnglishName: bird.bird_english_name,
              birdImg: bird.bird_img,
              birdAudio: bird.bird_audio,
              birdRarity: bird.bird_rarity,
              birdNocturnal: bird.bird_nocturnal,
              birdTag: bird.bird_tag,
              birdInfo: bird.bird_info,
              birdHabitats: [
                bird.habitats.map(habitat => habitat.habitat_name)
              ]
            }
          } else {
            return {
              birdId: bird.id,
              birdName: "Unknown",
              birdImg: "/images/mystery-bird.png",
              birdTag: "Look in that bush over there!",
            };
          }
        });
        return res.json(sanitized);
      })
      })
      .catch(errorHandler)
  })
}

function addCurrentCount(req, res) {
  const user_id = parseInt(req.params.id)
  const badgeId = req.body.badgeId

  return getUserBadges(user_id)
    .then(badges => {
      badges.filter(badge => badge.badge_id == badgeId)
      const badge = badges[0]
      if (badge) {
        const newCount = badge.current_count + 1
        return addToCount(newCount, badge.id)
          .then(res.send('add1'))
      } else {
        const newBadge = {
          user_id: user_id,
          badge_id: 1,
          current_count: 1,
        };
        return addBadge(newBadge).then(res.send("addbadge"));
      }
    })
    .catch(errorHandler);
}

function getBadges(req, res) {
  const user_id = parseInt(req.params.id);
  return getUserBadges(user_id).then((badges) => {
    const sanitized = badges.map((badge) => {
      return {
        badgeId: badge.id,
        badgeName: badge.badge_name,
        badgeTag: badge.badge_tag,
        badgeBronze: badge.badge_bronze,
        badgeSilver: badge.badge_silver,
        badgeGold: badge.badge_gold,
        bronzeReq: badge.bronze_req,
        silverReq: badge.silver_req,
        goldReq: badge.gold_req,
        currentCount: badge.current_count,
      };
    });
    return res.json(sanitized);
  });
}

function addEntry(req, res) {
  const entry = {
    user_id: req.body.user_id,
    bird_id: req.body.bird_id,
  };
  addScrapbookEntry(entry).then((count) => res.json(count[0]));
}

async function insertImage(req, res, next) {
  try {
    const user_id = req.params.id;
    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded." });
    }
    const user_img = await persistProfileImage(req.file);
    await addImage(user_id, user_img);
    return res.json({ user_img });
  } catch (err) {
    next(err);
  }
}

function errorHandler(err, req, res, next) {
  console.log(err);
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ message: "Access denied." });
  } else {
    res.status(500).json({ message: "Something went RATHER wrong. Shame." });
  }
}

module.exports = router
