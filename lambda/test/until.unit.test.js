const until = require('../untils/until');

test("validateUrl work", () => {
    let res = until.validateUrl("www.google.com");
    expect(res).toBe(true);

     res = until.validateUrl("1234W");
    expect(res).toBe(false);
  });


test("idToShortURL work", () => {
    const res = until.idToShortURL(1);
    expect(typeof res).toBe("string");
  });  