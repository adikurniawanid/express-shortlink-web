"use strict";
class AuthController {
  static async login(req, res, next) {
    try {
      res.render("auth/login", {
        layout: "layouts/auth",
      });
    } catch (error) {
      next(error);
    }
  }

  static async register(req, res, next) {
    try {
      res.render("auth/register", {
        layout: "layouts/auth",
      });
    } catch (error) {
      next(error);
    }
  }

  static async forgotPassword(req, res, next) {
    try {
      res.render("auth/forgot-password", {
        layout: "layouts/auth",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AuthController;
