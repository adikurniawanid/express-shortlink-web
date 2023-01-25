"use strict";
const axios = require("axios");
const { API_URL } = process.env;
class AuthController {
  static async index(req, res, next) {
    try {
      res.render("auth/login", {
        layout: "layouts/auth",
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const fetchApiLogin = await axios({
        method: "post",
        url: API_URL + "/auth/login",
        data: {
          email,
          password,
        },
      });

      if (fetchApiLogin.status === 200) {
        res.cookie("token", fetchApiLogin.data.data.token, {
          maxAge: 1000 * 60 * 60 * 24 * 7,
          httpOnly: true,
        });
        res.redirect("/link");
      }
    } catch (error) {
      next(error);
    }
  }

  static async logout(req, res, next) {
    try {
      res.clearCookie("token");
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
