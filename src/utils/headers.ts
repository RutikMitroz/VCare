export const HEADERS_WITH_JSON = {
  "Content-Type": "application/json",
};

export const HEADERS_WITH_TOKEN = (token?: string) => ({
  Authorization: token ? `Bearer ${token}` : "",
});

export const HEADERS_WITH_TOKEN_AND_JSON = (token?: string) => ({
  "Content-Type": "application/json",
  Authorization: token ? `Bearer ${token}` : "",
});
