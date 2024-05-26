import { RegisteredError } from "@/types/errors";

export default {
  clientDuplicate: "Client with same name already exists",
  duplicateFound: "Duplicate found",
  loginFailed: "Login failed",
  unknownError: "Unknown error",
  registeredErrors: {
    [RegisteredError.UnknownError]: "Something went wrong",
    [RegisteredError.ServerNotAccessible]: "Server is not accessible",
  },
  secretKeyIsNotDefined: "Secret key is not defined",
};
