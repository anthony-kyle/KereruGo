# KererūGo

Gotta collect 'em all!


## Set up instructions:

Requires **Node 24.x** (see `engines` in `package.json`).

* Clone the repo
* Create branch according to feature you are working on

```sh
npm install
cp .env.example .env 
npm run knex migrate:latest
npm run knex seed:run
npm run build
npm run dev
```

Webpack watches the client into the repo-root `public/` folder (used locally by Express and by Vercel’s CDN). The build enables OpenSSL’s legacy provider on Node 17+ because this project still uses Webpack 4.

## Deploy on Vercel

1. Import the repo in Vercel (defaults pick up root `app.js` as the Express entry).
2. Set environment variables in the project:
   - `JWT_SECRET` — signing secret for auth tokens (use a strong value).
   - `DATABASE_URL` — PostgreSQL connection string (for example Neon). SSL defaults on; set `DATABASE_SSL=false` only if your DB does not use TLS.
   - `BLOB_READ_WRITE_TOKEN` — from [Vercel Blob](https://vercel.com/docs/storage/vercel-blob); required for profile photo uploads on Vercel (local dev writes to `public/uploads/` instead).
3. After the first deploy, run migrations (and optional seeds) against the production database from your machine or CI, with `NODE_ENV=production` and `DATABASE_URL` set, for example:

```sh
NODE_ENV=production npm run knex migrate:latest
NODE_ENV=production npm run knex seed:run
```

Vercel serves files under `public/` from the edge; the Express app handles `/api/v1/*`. Heroku-specific npm scripts were removed in favour of this layout.

## User Stories

### MVP

* As a user I want to be able to log in
* As a user I want to be able to register
* As a user I want to be able to see myself on a map
* As a user I want to be able to see nearby birds on a map 
* As a user I want to be able to see information on birds that I have found in a scrapbook
    * As a user I want confirmation of things I have or haven’t done. Eg finding a Kereru,
    * As a user I want to be able to track my progress on how many birds I have or have not seen
* As a user I want to be able to use this on my phone
* As a user I want to be able to easily navigate between sections
* As a user I want to click on bird and all the bird’s information card will show up

### MVP/Stretch

* As a user I want to click on a bird and view just their image, name and tagline, and click on a 'find out more' button that takes me to another card with the bird's full information.

### Stretch

* As a user I want to obtain awards / medals for spotting various numbers and types of birds
* As a user I want to display images in the scrapbook that are different to the actual bird images, for example, a feather.
* As a user I want the bird to fly away if it is too far away
* As a user I want to be able to donate to wildlife foundations
* As a user I want to be able to get hints as to potential locations of birds
* As a user I want to have to sneak up on a bird / get close to the bird in order to obtain it
* As a user I want to be able to see an avatar of myself on the map
* As a user I want to view the credits for the creators of the app.

---

## Views (Client Side)

  | name | purpose |
  | --- | --- |
  | Login | View for user to enter their login credentials |
  | Register | View for user to sign up for the App |
  | Map | View the location map to show user's location and bird's location |
  | Scrapbook | View all the user's collected birds |
  | Profile | View an individual bird's information (once it has been collected and added to scrapbook) |


## Reducers (Client Side)

  | name | purpose |
  | --- | --- |
  | auth | Store information regarding user logins, auth status and auth errors |
  | userProgress | Store information about user progress - how many birds found, badges |
  | locations | Store the array of locations with random bird info (from db) |
  | scrapbook | Store the array ofa user's scrapbook items  - found/unknown birds (from db) |
  | bird_profile | Store the bird_profile info |


## Actions (Client Side)

  | type | data | purpose |
  | --- | --- | --- |
  | LOGIN_REQUEST | auth | For when a login is in progress |
  | LOGIN_SUCCESS | auth | Ends login in progress, and makes user authenticated |
  | LOGIN_FAILURE | auth | For when there is an error with login |
  | LOGOUT_REQUEST | auth | For when a logout is in progress |
  | LOGOUT_SUCCESS | auth | Ends logout process, change user to not authenticated |
  | RECEIVE_LOCATIONS | locations | For receiving locations from the server response |
  | RECEIVE_SCRAPBOOK | scrapbook | For receiving scrapbook from the server response |
  
  
## API (Client - Server)
See Team Workspace 'KereruGo' in Postman for example routes and responses.

| Method | Endpoint | Protected | Usage | Response |
| --- | --- | --- | --- | --- |
| Post | /api/auth/signin | Yes | Log In a User | The Users JWT Token |
| Post | /api/auth/register | Yes | Register a User | The Users JWT Token |
| Get | /api/v1/birds/birdTypes | Yes | Get all bird types | Array of Objects (object = A bird type) |
| Get | /api/v1/birds/bird/:id | Yes | Takes bird ID as last param | A bird Object |
| Get | /api/v1/birds/habitats | Yes | Get all habitats | Array of Objects (object = A habitat) |
| Get | /api/v1/birds/locations | Yes | Get all locations | Array of Objects (object = A location) |
| Get | /api/v1/birds/scrapbook/:id | Yes | Takes a user_id as last param and gets all scrapbook entries | Array of Objects (object = a bird spotted datetime and bird id) |
| Post | /api/v1/birds/scrapbook/ | Yes | Takes user_id and bird_id in req.body, saves encounter | Count of birds |  


---


## DB (Server Side)
  
  
### users

  | Column Name | Data Type | Purpose |
  | --- | --- | --- |
  | id | Integer | Unique identifier for each user |
  | username | String | Username of user to login |
  | hash | String | Hash/Password of user to login |
  | user_img | string | User profile image |
  
  
### birds

  | Column Name | Data Type | Purpose |
  | --- | --- | --- |
  | id | integer | Unique identifier for each bird |
  | bird_name | string | Māori name of bird |
  | bird_english_name | string | English name of bird |
  | bird_img | string | Image of bird |
  | bird_tag | string | Tagline for bird |
  | bird_info | string | Short description of bird |
  | bird_rarity | string | How rare the bird is - rare/uncommon/common  |
  | bird_nocturnal | boolean | Is the bird nocturnal? True/False |


### scrapbooks

 | Column Name | Data Type | Purpose |
 | --- | --- | --- |
 | user_id | integer | ID of the user |
 | bird_id | integer | ID of the bird |
 | date_spotted | datetime | Date the user spotted the bird |
 
 
### habitats

 | Column Name | Data Type | Purpose |
 | --- | --- | --- |
 | id | integer | ID of the habitat |
 | habitat_name | string | Name of habitat |
 
 
### birds_habitats

 | Column Name | Data Type | Purpose |
 | --- | --- | --- |
 | bird_id | integer | ID of the bird |
 | habitat_id | integer | ID of the habitat |


### locations

 | Column Name | Data Type | Purpose |
 | --- | --- | --- |
 | id | integer | Unique identifier for each location |
 | lat | decimal | Latitude of the location |
 | long | decimal |  Longitude of the location |


---


# Full Stack Boilerplate

## The Tech

A Boilerplate is already set up for you with everything you will need to get started. This boilerplate is set up to use:

* [React](https://reactjs.org/docs/getting-started.html)
* [Redux](https://redux.js.org/)
* [Express](https://expressjs.com/en/api.html)
* [Knex.js (SQL)](https://knexjs.org/)
* [Bulma (CSS framework)](https://bulma.io/documentation/)
* [JWT Auth (Local)](https://jwt.io/)

The Migration and seeds for the users table, and all login functionality is already set up!

The mobile responsiveness is also being handled by some neat JS and Bulma classes, be sure to incorporate that view in your project goals!


## Setup

Run the following commands in your terminal:

```sh
npm install
npx knex migrate:latest
npx knex seed:run
cp .env.example .env
```

To run in development:
```sh
npm run dev
```

To run in production:
```sh
npm start
```


## Heroku!!!

### Creating your app

Create your app with `heroku create [name]`

You can check that this was successful by running `heroku apps` to view a list of your apps


### Adding postgres

Add postgresql (hobby dev) to your app at `https://dashboard.heroku.com/apps/[APP NAME HERE]/resources`

Check that pg has been added by running `heroku addons` to ensure the postgresql db is on your app


### Deploying!

I have created several npm scripts that will be useful for deploying your app to heroku easily.

To push your local master branch to your heroku app:
```sh
npm run h:deploy
```

Run heroku migrations:
```sh
npm run h:migrate
```

Run heroku seeds:
```sh
npm run h:seed
```

If ever you need to rollback, you can also:
```sh
npm run h:rollback
```


### Ta-Da!
Your app should be deployed!
