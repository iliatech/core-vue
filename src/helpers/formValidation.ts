import type { ApiValidationError } from "@/types/common";
import langError from "@/lang/langError";

export const showErrors = (isStarted: boolean, errors: string[]) => {
  return isStarted ? errors : [];
};

export const getValidationErrors = (
  validationErrors: ApiValidationError[] | undefined,
  fieldName: string
): string[] => {
  const isError = !!validationErrors?.find((item) => item.path === fieldName)
    ?.path;

  return isError ? [langError.fieldError(fieldName)] : [];
};
