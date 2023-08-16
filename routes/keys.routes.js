const express = require("express");
const router = express.Router();
const auth_middleware = require("../middleware/auth.middleware");
const limit = require("express-limit").limit;

module.exports = (app) => {
  const keysController = require("../controllers/keys.controller");
  router.get(
    "/",
    limit({
      max: 50,
      period: 60 * 1000,
      status: 429,
      message: "Too many requests",
    }),
    auth_middleware,
    keysController.connection,
  );
  router.get(
    "/user/public/:id",
    limit({
      max: 200,
      period: 60 * 1000,
      status: 429,
      message: "Too many requests",
    }),
    auth_middleware,
    keysController.getUserPublicKey,
  );
  router.get(
    "/user/private/:id",
    limit({
      max: 200,
      period: 60 * 1000,
      status: 429,
      message: "Too many requests",
    }),
    auth_middleware,
    keysController.getUserPrivateKey,
  );
  router.post(
    "/user",
    limit({
      max: 100,
      period: 60 * 1000,
      status: 429,
      message: "Too many requests",
    }),
    auth_middleware,
    keysController.createUserKeys,
  );
  router.patch(
    "/user/:id",
    limit({
      max: 100,
      period: 60 * 1000,
      status: 429,
      message: "Too many requests",
    }),
    auth_middleware,
    keysController.updateUserKeys,
  );
  router.delete(
    "/user/:id",
    limit({
      max: 100,
      period: 60 * 1000,
      status: 429,
      message: "Too many requests",
    }),
    auth_middleware,
    keysController.deleteUserKeys,
  );
  router.get(
    "/election/public/:id",
    limit({
      max: 200,
      period: 60 * 1000,
      status: 429,
      message: "Too many requests",
    }),
    auth_middleware,
    keysController.getElectionPublicKey,
  );
  router.get(
    "/election/private/:id",
    limit({
      max: 200,
      period: 60 * 1000,
      status: 429,
      message: "Too many requests",
    }),
    auth_middleware,
    keysController.getElectionPrivateKey,
  );
  router.post(
    "/election",
    limit({
      max: 100,
      period: 60 * 1000,
      status: 429,
      message: "Too many requests",
    }),
    auth_middleware,
    keysController.createElectionKeys,
  );
  router.patch(
    "/election/:id",
    limit({
      max: 100,
      period: 60 * 1000,
      status: 429,
      message: "Too many requests",
    }),
    auth_middleware,
    keysController.updateElectionKeys,
  );
  router.delete(
    "/election/:id",
    limit({
      max: 100,
      period: 60 * 1000,
      status: 429,
      message: "Too many requests",
    }),
    auth_middleware,
    keysController.deleteElectionKeys,
  );
  app.use("/keys", router);
};
