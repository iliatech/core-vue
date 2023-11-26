import type { TimeZone } from "@/types/schedule";

export const scheduleColors: Record<string, string> = {
  forestGreen: "forestgreen",
  grey: "#666",
  lightBlue: "#549ed3",
  lightGreen: "#67d540",
  lightMagenta: "#ce7bd7",
  magenta: "#c02dd0",
  orange: "#d56819",
  paleOrange: "#e3a968",
  pink: "#f593a4",
  superLightMagenta: "#cd8dd3",
};

export enum TimeZoneName {
  Esp = "ESP",
  Geo = "GEO",
  Msk = "MSK",
}

export const timeZones: TimeZone[] = [
  {
    name: TimeZoneName.Esp,
    value: 1,
    summerTime: true,
  },
  {
    name: TimeZoneName.Msk,
    value: 3,
    summerTime: false,
  },
  {
    name: TimeZoneName.Geo,
    value: 4,
    summerTime: false,
  },
];
