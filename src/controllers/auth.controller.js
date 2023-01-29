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
        res.cookie("accessToken", fetchApiLogin.data.token.accessToken, {
          maxAge: 1000 * 60 * 60 * 24 * 7,
          httpOnly: true,
        });
        res.cookie("refreshToken", fetchApiLogin.data.token.refreshToken, {
          maxAge: 1000 * 60 * 60 * 24 * 7,
          httpOnly: true,
        });

        res.cookie("user", fetchApiLogin.data.data.name, {
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
      res.clearCookie("accessToken");
      res.clearCookie("refreshToken");
      res.clearCookie("user");
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
