const Responses = require("../untils/API_Responses");

test("Responses is an Object", () => {
  expect(typeof Responses).toBe("object");
});

test("Responses_200 work", () => {
  const res = Responses._200({ shortUrl: "wwlek" });
  expect(res.statusCode).toBe(200);
  expect(typeof res.body).toBe("string");
  expect(res.headers["Content-Type"]).toBe("application/json");
});

test("Responses_302 work", () => {
  const res = Responses._302("www.google.com");
  expect(res.statusCode).toBe(302);
  expect(res.headers.Location).toBe("www.google.com");
});

test("Responses_400 work", () => {
  const res = Responses._400({
    status_code: 400,
    error_message: "error-request-data",
  });
  expect(res.statusCode).toBe(400);
  expect(res.headers["Content-Type"]).toBe("application/json");
  expect(typeof res.body).toBe("string");
  expect(res.body).toBe(
    JSON.stringify({ status_code: 400, error_message: "error-request-data" })
  );
});

test("Responses_404 work", () => {
    const res = Responses._404({
      status_code: 404,
      error_message: "URL NOT FOUND",
    });
    expect(res.statusCode).toBe(404);
    expect(res.headers["Content-Type"]).toBe("application/json");
    expect(typeof res.body).toBe("string");
    expect(res.body).toBe(
      JSON.stringify({ status_code: 404, error_message: "URL NOT FOUND" })
    );
  });


