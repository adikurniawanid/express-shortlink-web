"use strict";
const axios = require("axios");

class LinkController {
  static async list(req, res, next) {
    try {
      const data = await axios({
        method: "get",
        url: "http://127.0.0.1:3000/v1/link",
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwdWJsaWNJZCI6IjliMjBkZjg0LWZiYmMtNDcwMC1hYjAyLWJhM2QyNTIwYjYwOCIsImVtYWlsIjoiYWRpa3Vybmlhd2FuQG1haWwuY29tIiwiaWF0IjoxNjc0NDU3NjE2fQ.Zblzc4t6i-p_ZxA6l2xT59a9Yk8REAbCnsd188GXRvM",
        },
      });

      const result = [[], [], []];

      let temp = 1;
      data.data.data.forEach((element) => {
        switch (temp) {
          case 1:
            result[0].push(element);
            temp++;
            break;
          case 2:
            result[1].push(element);
            temp++;
            break;
          default:
            result[2].push(element);
            temp = 1;
            break;
        }
      });

      res.render("link", {
        layout: "layouts/master",
        data: result,
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
        url: "http://127.0.0.1:3000/v1/link/short",
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwdWJsaWNJZCI6IjliMjBkZjg0LWZiYmMtNDcwMC1hYjAyLWJhM2QyNTIwYjYwOCIsImVtYWlsIjoiYWRpa3Vybmlhd2FuQG1haWwuY29tIiwiaWF0IjoxNjc0NDU3NjE2fQ.Zblzc4t6i-p_ZxA6l2xT59a9Yk8REAbCnsd188GXRvM",
        },
        data: {
          title,
          originalUrl,
          customUrl,
        },
      });

      req.flash("msg", "Link created successfully");
      res.redirect("/link/");
    } catch (error) {
      next(error);
    }
  }
}

module.exports = LinkController;
