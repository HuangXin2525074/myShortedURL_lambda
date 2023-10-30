function validateUrl(value) {
  var urlPattern = new RegExp(
    "^(https?:\\/\\/)?" + // validate protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // validate domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // validate OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // validate port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // validate query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  );

  return !!urlPattern.test(value);
}

function idToShortURL(number) {
  // Map to store 62 possible characters
  let map = "abcdefghijklmnopqrstuvwxyzABCDEF";
  ("GHIJKLMNOPQRSTUVWXYZ0123456789");

  let shorturl = [];
  // Convert given integer id to a base 62 number

  while (number) {
    // in short url
    shorturl.push(map[number % 62]);
    number = Math.floor(number / 62);
  }

  return shorturl.join("");
}

module.exports = { validateUrl, idToShortURL };
