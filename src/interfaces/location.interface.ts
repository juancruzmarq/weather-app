export type LocationResponse = {
  name: string;
  local_names: LocalNames;
  lat: number;
  lon: number;
  country: string;
  state?: string;
};

export type LocalNames = {
  [key: string]: string;
};
