// for prod
// export const BASE_URL = "/api";

// for local run
// export const BASE_URL = "http://localhost:7777";

export const BASE_URL =
  location.hostname === "localhost" ? "http://localhost:7777" : "/api";
