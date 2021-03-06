enum HttpStatusCodes {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  FOUND = 302,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  REQUEST_TIMEOUT = 408,
  UUNPROCESSABLE_ENTITY = 422,
  TOO_MANY_REQUESTS = 429,
  INTERNAL_SERVER_ERROR = 500,
  NOT_IMPLEMENTED = 501,
  SERVICE_UNAVAILABLE = 503,
}

export { HttpStatusCodes };
