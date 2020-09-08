const https = require("https"),
  Stream = require("stream").Transform,
  fs = require("fs");
const Util = require("./Util");
const Links = require("./Links.json");

function Options(host, path) {
  this.hostname = host;
  this.port = 443;
  this.path = path;
  this.method = "GET";
}

function fetchPhotos(array) {
  array.forEach((url) => {
    const parsedUrl = Util.parseUri(url);
    const options = new Options(parsedUrl.host, parsedUrl.path);
    https
      .request(options, (res) => {
        const data = new Stream();

        res.on("data", function (chunk) {
          data.push(chunk);
        });

        res.on("end", function () {
          fs.writeFileSync(`./photos/${parsedUrl.file}`, data.read());
          console.log("done");
        });
      })
      .end();
  });
}

fetchPhotos(Links.data);
