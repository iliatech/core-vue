import { RegisteredError } from "@/types/errors";
import { capitalize } from "lodash";

export default {
  interactionDuplicate: "Interaction with same name already exists",
  duplicateFound: "Duplicate found",
  fieldShouldNotBeEmpty: (name: string): string =>
    `${name} should not be empty`,
  fieldError: (fieldName: string): string =>
    `${capitalize(fieldName)} is incorrect`,
  loginFailed: "Login failed",
  notCopiedToClipboard: (entityLabel: string) =>
    `${entityLabel} not copied to clipboard`,
  unknownError: "Unknown error",
  passwordNotChanged: "Error when try to change password",
  passwordAndConfirmationAreDifferent:
    "Password confirmation and password are different",
  registeredErrors: {
    [RegisteredError.UnknownError]: "Something went wrong",
    [RegisteredError.ServerNotAccessible]: "Server is not accessible",
  },
  registerFailed: "User registration failed",
  secretKeyIsNotDefined: "Secret key is not defined",
  secretKeyIsWrong: "Secret key is wrong",
};
