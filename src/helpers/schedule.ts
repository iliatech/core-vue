export const parseSlotTime = (time: string) => {
  const hour = time.substring(0, 2);
  const minute = time.substring(3, 5);
  const timezone = time.substring(5, 8);
  console.log("A", time);
  console.log("A1", hour);
  console.log("A2", minute);
  console.log("A3", timezone);
  return [hour, minute, timezone];
};
