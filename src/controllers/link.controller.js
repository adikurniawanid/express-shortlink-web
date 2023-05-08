"use strict";
const axios = require("axios");
const { API_URL } = process.env;

class LinkController {
  static async list(req, res, next) {
    try {
      const data = await axios({
        method: "get",
        url: API_URL + "/link",
        headers: {
          Authorization: req.cookies.accessToken,
        },
      });
      const result = [[], [], []];

      let temp = 1;
      data.data.data.forEach((element) => {
        switch (temp) {
          case 1:
            result[1].push(element);
            temp++;
            break;
          case 2:
            result[2].push(element);
            temp++;
            break;
          default:
            result[0].push(element);
            temp = 1;
            break;
        }
      });

      res.render("link", {
        layout: "layouts/master",
        data: { result, apiUrl: API_URL },
      });
    } catch (error) {
      next(error);
    }
  }

  static async create(req, res, next) {
    try {
      const { title, originalUrl, customUrl } = req.body;
      const data = await axios({
        method: "post",
        url: API_URL + "/link",
        headers: {
          Authorization: req.cookies.accessToken,
        },
        data: {
          title,
          originalUrl,
          customUrl,
        },
      });

      req.flash("msg", "Link created successfully");
      res.redirect("/link");
    } catch (error) {
      next(error);
    }
  }

  static async remove(req, res, next) {
    try {
      const shortLink = req.params.shortLink;
      const data = await axios({
        method: "delete",
        url: API_URL + "/link/" + shortLink,
        headers: {
          Authorization: req.cookies.accessToken,
        },
      });

      req.flash("msg", "Link deleted successfully");
      res.redirect("/link");
    } catch (error) {
      next(error);
    }
  }

  static async favorite(req, res, next) {
    try {
      const shortLink = req.params.shortLink;
      const data = await axios({
        method: "patch",
        url: API_URL + "/link/" + shortLink,
        headers: {
          Authorization: req.cookies.accessToken,
        },
      });

      req.flash("msg", "Link favorited successfully");
      res.redirect("/link");
    } catch (error) {
      next(error);
    }
  }
}

module.exports = LinkController;
