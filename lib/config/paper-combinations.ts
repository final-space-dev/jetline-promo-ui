// Paper System - interwoven combinations
// Each paper type has specific GSM options, size constraints, and coating options

export interface PaperCombination {
  paperId: string;
  paperName: string;
  allowedGSM: number[];
  allowedSizes: string[];
  allowedCoatings: string[];
}

export const PAPER_COMBINATIONS: PaperCombination[] = [
  {
    paperId: 'brilliant-white',
    paperName: 'Brilliant White',
    allowedGSM: [80, 100, 120],
    allowedSizes: ['A3', 'A4', 'A5'],
    allowedCoatings: ['uncoated', 'matt', 'gloss'],
  },
  {
    paperId: 'bond-white',
    paperName: 'Bond White',
    allowedGSM: [80, 100],
    allowedSizes: ['A3', 'A4', 'A5', 'A6'],
    allowedCoatings: ['uncoated'],
  },
  {
    paperId: 'galaxy-gloss',
    paperName: 'Galaxy Gloss',
    allowedGSM: [130, 170, 250, 300],
    allowedSizes: ['A2', 'A3', 'A4'],
    allowedCoatings: ['gloss'],
  },
  {
    paperId: 'galaxy-silk',
    paperName: 'Galaxy Silk',
    allowedGSM: [130, 170, 250, 300],
    allowedSizes: ['A2', 'A3', 'A4'],
    allowedCoatings: ['matt'],
  },
  {
    paperId: 'business-card-white',
    paperName: 'Business Card Board White',
    allowedGSM: [350],
    allowedSizes: ['A6', 'A7'],
    allowedCoatings: ['uncoated'],
  },
];

// Product sizes (independent - these are cut sizes)
export const PRODUCT_SIZES = ['DL', 'A7', 'A6', 'A5', 'A4', 'A3', 'A2', 'A1'];

// Orientation options
export const ORIENTATIONS = ['Portrait', 'Landscape'];

// Sides options
export const SIDES = ['Single', 'Double'];

// Coating options (for the paper system)
export const COATINGS = [
  { id: 'uncoated', label: 'No Coating' },
  { id: 'matt', label: 'Matt' },
  { id: 'gloss', label: 'Gloss' },
];

// Finishing options with sub-configurations
export interface FinishingOption {
  id: string;
  label: string;
  hasSubOptions: boolean;
  subOptions?: {
    [key: string]: string[];
  };
}

export const FINISHING_OPTIONS: FinishingOption[] = [
  {
    id: 'lamination',
    label: 'Lamination',
    hasSubOptions: true,
    subOptions: {
      sides: ['Single Sided', 'Double Sided'],
      finish: ['Matt', 'Gloss'],
    },
  },
  {
    id: 'wirobind',
    label: 'Wirobind',
    hasSubOptions: true,
    subOptions: {
      edge: ['Short Edge', 'Long Edge'],
      color: ['Black', 'White', 'Silver', 'Green', 'Blue', 'Red'],
      calendarHook: ['Yes', 'No'],
    },
  },
  {
    id: 'folding',
    label: 'Folding',
    hasSubOptions: false,
  },
  {
    id: 'spot-varnish',
    label: 'Spot Varnish',
    hasSubOptions: false,
  },
];
