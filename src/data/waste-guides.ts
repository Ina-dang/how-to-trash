import { wasteGuide as gwanakWasteGuide } from './gwanak';
import { wasteGuide as yeongdeungpoWasteGuide } from './yeongdeungpo';
import { wasteGuide as yangcheonWasteGuide } from './yangcheon';

export const wasteGuides = {
  [gwanakWasteGuide.regionKey]: gwanakWasteGuide,
  [yeongdeungpoWasteGuide.regionKey]: yeongdeungpoWasteGuide,
  [yangcheonWasteGuide.regionKey]: yangcheonWasteGuide,
} as const;

export type RegionKey = keyof typeof wasteGuides;
