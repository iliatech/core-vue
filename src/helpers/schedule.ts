export const parseSlotTime = (time: string) => {
  const hour = time.substring(0, 2);
  const minute = time.substring(3, 5);
  const timezone = time.substring(5, 8);

  return [hour, minute, timezone];
};

export const stringifySlotTime = (
  hour: string,
  minute: string,
  timezone: string
) => {
  return `${hour}:${minute}${timezone}`;
};
