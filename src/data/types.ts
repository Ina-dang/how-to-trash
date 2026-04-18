export type WasteCategory = {
  label: string;
  time: string;
  method: string;
  place: string;
};

export type WasteZone = {
  name: string;
  targetAreas: string;
  categories: WasteCategory[];
};

export type WasteGuide = {
  regionKey: string;
  region: string;
  color: {
    base: string;
    hover: string;
  };
  updatedAt: string;
  nonCollectionDays: string;
  contact: {
    department: string;
    phone: string;
  };
  categories: WasteCategory[];
  zones: WasteZone[];
  source: {
    name: string;
    scope: string;
  };
};
