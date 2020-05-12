const validUrl = require("valid-url");
const shortid = require("shortid");

const Url = require("../../models/url");
const { successResponse, errorHelper } = require("../helpers/response");

module.exports = {
  async CreateShortUrl(req, res) {
    const { longUrl } = req.body;
    const baseUrl = "http://localhost:4000";

    // Check base url
    if (!validUrl.isUri(baseUrl)) {
      errorHelper(res, 401, "Invalid base url");
    }

    // Create url code
    const urlCode = shortid.generate();

    // Check long url
    if (validUrl.isUri(longUrl)) {
      try {
        let url = await Url.findOne({ longUrl });

        if (url) {
          res.json(url);
        } else {
          const shortUrl = baseUrl + "/" + urlCode;

          url = new Url({
            longUrl,
            shortUrl,
            urlCode,
            date: new Date()
          });

          await url.save();

          successResponse(res, 201, url);
        }
      } catch (err) {
        errorHelper(res, 500, "Server error");
      }
    } else {
      errorHelper(res, 401, "Invalid long url");
    }
  },
  async getShortLink(req, res) {
    try {
      const url = await Url.findOne({ urlCode: req.params.code });

      if (url) {
        return res.redirect(url.longUrl);
      } else {
        errorHelper(res, 404, "No url found");
      }
    } catch (err) {
      errorHelper(res, 500, "Server error");
    }
  }
};
