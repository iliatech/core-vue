import { timeZones } from "@/settings/schedule";

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
