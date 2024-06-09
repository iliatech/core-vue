export const showErrors = (isStarted: boolean, errors: string[]) => {
  return isStarted ? errors : [];
};
