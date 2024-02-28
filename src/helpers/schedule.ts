import { timeZones } from "@/settings/schedule";

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

export const prepareDate = (date?: number | null) => {
  if (!date) {
    throw new Error("Date is not specified for method.");
  }

  const strDate = date.toString();
  return (
    strDate.substring(0, 4) +
    "/" +
    strDate.substring(4, 6) +
    "/" +
    strDate.substring(6, 8)
  );
};

export const convertTime = (
  hour: number,
  timezoneName: string,
  targetTimezoneName: string
): string | null => {
  const timezone = timeZones.find((item) => item.name === timezoneName);
  const targetTimezone = timeZones.find(
    (item) => item.name === targetTimezoneName
  );

  if (!timezone || !targetTimezone) {
    return null;
  }

  let newHour = hour + (targetTimezone.value - timezone.value);

  if (newHour < 0) {
    newHour = 24 + newHour;
  }

  return newHour.toString().length === 1 ? `0${newHour}` : `${newHour}`;
};
