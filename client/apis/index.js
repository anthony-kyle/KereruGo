import request from "superagent";

import { getEncodedToken } from "../auth/session";

const apiUrl = "/api/v1/birds";

function prepHeaders() {
  return {
    Accept: "application/json",
    Authorization: `Bearer ${getEncodedToken()}`,
  };
}

// The following line needs to be set immediately after the request (get/post/patch/delete) to access secure routes
// .set(jsonHeader)

export function apiGetAllBirds() {
  return request
    .get(apiUrl + "/birdTypes")
    .set(prepHeaders())
    .then((res) => res.body)
    .catch(errorHandler);
}

export function apiGetOneBird(id) {
  return request
    .get(apiUrl + "/bird/" + id)
    .set(prepHeaders())
    .then((res) => res.body)
    .catch(errorHandler);
}

export function apiGetAllLocations() {
  return request
    .get(apiUrl + "/locations")
    .set(prepHeaders())
    .then((res) => res.body)
    .catch(errorHandler);
}

export function apiGetUserScrapbook(user_id) {
  return request
    .get(apiUrl + "/scrapbook/" + user_id)
    .set(prepHeaders())
    .then((res) => res.body)
    .catch(errorHandler);
}

export function apiAddScrapbookEntry(user_id, bird_id) {
  return request
    .post(apiUrl + "/scrapbook")
    .set(prepHeaders())
    .send({ user_id: user_id, bird_id: bird_id })
    .then((res) => res.body)
    .catch(errorHandler);
}

export function apiGetAllHabitats() {
  return request
    .get(apiUrl + "/habitats")
    .set(prepHeaders())
    .then((res) => res.body)
    .catch(errorHandler);
}

export function apiCurrentCount(userId, badgeId) {
  return request
    .post(apiUrl + "/badges/" + userId)
    .set(prepHeaders())
    .send({ userId: userId, badgeId: badgeId })
    .then((res) => res.body)
    .catch(errorHandler);
}

export function apiGetUserBadges(userId) {
  return request
    .get(apiUrl + "/badges/" + userId)
    .set(prepHeaders())
    .then((res) => res.body)
    .catch(errorHandler);
}

//when this function is fired by the React Component it parses the data to the backend

export function apiPostProfileImage(user_id, file) {
  return request
    .post(apiUrl + "/profile/" + user_id)
    .set(prepHeaders())
    .attach("profile-pic", file)
    .then((res) => res.body)
    .catch(errorHandler);
}

export function apiGetProfileImage(userId) {
  return request.get(apiUrl + "profile/");
}

// Global error handler for front end api's
function errorHandler(err) {
  const detail =
    err?.response?.body ??
    err?.response?.text ??
    err?.message ??
    (typeof err?.status === "number" ? `HTTP ${err.status}` : null);
  console.error("API error:", detail ?? err, err);
}
