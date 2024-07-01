import type { ApiValidationError } from "@/types/common";
import langError from "@/lang/langError";

export const showErrors = (isStarted: boolean, errors: string[]) => {
  return isStarted ? errors : [];
};

export const getValidationErrors = (
  validationErrors: ApiValidationError[] | undefined,
  fieldName: string
): string[] => {
  const error = validationErrors?.find((item) => item.path === fieldName);

  if (!error) {
    return [];
  }

  if (error.customMessage) {
    return [error.customMessage];
  }

  return [langError.fieldError(fieldName)];
};
