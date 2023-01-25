"use strict";
module.exports = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).json({ message: err.message });
  } else {
    console.error(err);
    res.render("error/500", {
      layout: "layouts/error",
    });
  }
};
