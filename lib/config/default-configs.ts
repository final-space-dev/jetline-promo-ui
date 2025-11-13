import { CalculatorConfig, ComponentConfig, Option } from './calculator-schema';

// Sample paper options with GSM metadata
export const PAPER_OPTIONS: Option[] = [
  { id: 'custom-paper', label: 'Custom Paper', value: 'custom-paper' },
  { id: 'bond-tint', label: 'Bond Tint', value: 'bond-tint', metadata: { gsm: [80, 100] } },
  { id: 'bond-white', label: 'Bond White', value: 'bond-white', metadata: { gsm: [80, 100] } },
  { id: 'brilliant-white', label: 'Brilliant White', value: 'brilliant-white', metadata: { gsm: [80, 100, 120] } },
  { id: 'business-card-white', label: 'Business Card Board White', value: 'business-card-white', metadata: { gsm: [350] } },
  { id: 'camelot-white', label: 'Camelot Cartridge White', value: 'camelot-white', metadata: { gsm: [170, 250] } },
  { id: 'chromolux', label: 'Chromolux', value: 'chromolux', metadata: { gsm: [250, 700] } },
  { id: 'colourplan', label: 'Colourplan', value: 'colourplan', metadata: { gsm: [135, 270, 350] } },
  { id: 'conqueror-laid', label: 'Conqueror Laid', value: 'conqueror-laid', metadata: { gsm: [100, 120, 300] } },
  { id: 'galaxy-gloss', label: 'Galaxy Gloss', value: 'galaxy-gloss', metadata: { gsm: [130, 170, 250, 300] } },
  { id: 'galaxy-silk', label: 'Galaxy Silk', value: 'galaxy-silk', metadata: { gsm: [130, 170, 250, 300] } },
  { id: 'hammer-white', label: 'Hammer White', value: 'hammer-white', metadata: { gsm: [100, 120] } },
  { id: 'linen-white', label: 'Linen White', value: 'linen-white', metadata: { gsm: [100, 120] } },
  { id: 'uncoated-white', label: 'Uncoated White', value: 'uncoated-white', metadata: { gsm: [80, 100, 120, 160, 200, 250, 300, 350] } },
];

// Size options
export const SIZE_OPTIONS: Option[] = [
  { id: 'a1', label: 'A1', value: 'A1' },
  { id: 'a2', label: 'A2', value: 'A2' },
  { id: 'a3', label: 'A3', value: 'A3' },
  { id: 'a4', label: 'A4', value: 'A4' },
  { id: 'a5', label: 'A5', value: 'A5' },
  { id: 'a6', label: 'A6', value: 'A6' },
  { id: 'a7', label: 'A7', value: 'A7' },
  { id: 'dl', label: 'DL', value: 'DL' },
];

// Colour options
export const COLOUR_OPTIONS: Option[] = [
  { id: 'full-colour', label: 'Full Colour', value: 'full-colour' },
  { id: 'black-white', label: 'Black and White', value: 'black-white' },
];

// Finishing options
export const FINISHING_OPTIONS: Option[] = [
  { id: 'finishing-outsourced', label: 'Finishing Outsourced', value: 'finishing-outsourced' },
  { id: 'folding', label: 'Folding', value: 'folding' },
  { id: 'hand-gluing', label: 'Hand Gluing', value: 'hand-gluing' },
  { id: 'lamination', label: 'Lamination', value: 'lamination' },
  { id: 'spot-varnish', label: 'Spot Varnish', value: 'spot-varnish' },
  { id: 'wirobind', label: 'Wirobind', value: 'wirobind' },
  { id: 'perfect-binding', label: 'Perfect Binding', value: 'perfect-binding' },
  { id: 'saddle-stitch', label: 'Saddle Stitch', value: 'saddle-stitch' },
  { id: 'scoring', label: 'Scoring', value: 'scoring' },
  { id: 'punching', label: 'Punching', value: 'punching' },
];

// GSM Weight options
export const GSM_OPTIONS: Option[] = [
  { id: 'gsm-80', label: '80 GSM', value: '80' },
  { id: 'gsm-100', label: '100 GSM', value: '100' },
  { id: 'gsm-120', label: '120 GSM', value: '120' },
  { id: 'gsm-130', label: '130 GSM', value: '130' },
  { id: 'gsm-135', label: '135 GSM', value: '135' },
  { id: 'gsm-160', label: '160 GSM', value: '160' },
  { id: 'gsm-170', label: '170 GSM', value: '170' },
  { id: 'gsm-200', label: '200 GSM', value: '200' },
  { id: 'gsm-250', label: '250 GSM', value: '250' },
  { id: 'gsm-270', label: '270 GSM', value: '270' },
  { id: 'gsm-300', label: '300 GSM', value: '300' },
  { id: 'gsm-350', label: '350 GSM', value: '350' },
  { id: 'gsm-700', label: '700 GSM', value: '700' },
];

// Default component configurations
export const DEFAULT_COMPONENTS: Record<string, ComponentConfig> = {
  size: {
    id: 'size',
    label: 'Size',
    description: 'Paper size selection',
    enabled: true,
    type: 'single-select',
    options: SIZE_OPTIONS,
    searchable: true,
    required: true,
    placeholder: 'Select a size...',
  },
  material: {
    id: 'material',
    label: 'Material',
    description: 'Paper material type',
    enabled: true,
    type: 'single-select',
    options: PAPER_OPTIONS,
    searchable: true,
    required: true,
    placeholder: 'Search for paper type...',
  },
  gsm: {
    id: 'gsm',
    label: 'GSM Weight',
    description: 'Paper weight in grams per square meter',
    enabled: true,
    type: 'single-select',
    options: GSM_OPTIONS,
    searchable: true,
    required: true,
    placeholder: 'Select paper weight...',
  },
  colour: {
    id: 'colour',
    label: 'Colour',
    description: 'Print colour mode',
    enabled: true,
    type: 'single-select',
    options: COLOUR_OPTIONS,
    searchable: false,
    required: true,
  },
  spotColours: {
    id: 'spotColours',
    label: 'Spot Colours',
    description: 'Enable spot colour printing',
    enabled: true,
    type: 'toggle',
    options: [
      { id: 'spot-yes', label: 'Yes', value: 'yes' },
      { id: 'spot-no', label: 'No', value: 'no' },
    ],
    searchable: false,
    required: false,
    defaultValue: 'no',
  },
  finishing: {
    id: 'finishing',
    label: 'Additional Finishing',
    description: 'Post-printing finishing options',
    enabled: true,
    type: 'multi-select',
    options: FINISHING_OPTIONS,
    searchable: true,
    required: false,
    placeholder: 'Select finishing options...',
  },
  quantity: {
    id: 'quantity',
    label: 'Quantity',
    description: 'Number of units to produce',
    enabled: true,
    type: 'numeric-input',
    options: [],
    searchable: false,
    required: true,
    placeholder: 'Enter quantity...',
  },
};

// Sample calculator configuration
export const DEFAULT_CALCULATOR_CONFIG: CalculatorConfig = {
  id: 'default-calculator',
  name: 'Default Print Calculator',
  description: 'Standard configuration for print product calculations',
  category: 'general-print',
  components: DEFAULT_COMPONENTS,
  permutationRules: [
    {
      id: 'rule-1',
      name: 'Business Card Board requires specific sizes',
      description: 'Business Card Board is only available in A6 and A7 sizes',
      operator: 'if-then-disable',
      sourceComponent: 'material',
      sourceValues: ['business-card-white'],
      targetComponent: 'size',
      targetValues: ['a1', 'a2', 'a3', 'a4', 'a5', 'dl'],
      enabled: true,
    },
    {
      id: 'rule-2',
      name: 'Spot colours require full colour',
      description: 'Spot colours can only be used with full colour printing',
      operator: 'requires',
      sourceComponent: 'spotColours',
      sourceValues: ['spot-yes'],
      targetComponent: 'colour',
      targetValues: ['full-colour'],
      enabled: true,
    },
    {
      id: 'rule-3',
      name: 'Lamination conflicts with spot varnish',
      description: 'Lamination and spot varnish cannot both be selected',
      operator: 'conflicts-with',
      sourceComponent: 'finishing',
      sourceValues: ['lamination'],
      targetComponent: 'finishing',
      targetValues: ['spot-varnish'],
      enabled: true,
    },
  ],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  version: 1,
};

// Helper function to create a new calculator config
export function createNewCalculatorConfig(
  name: string,
  category: string,
  description?: string
): CalculatorConfig {
  return {
    id: `calculator-${Date.now()}`,
    name,
    description,
    category,
    components: { ...DEFAULT_COMPONENTS },
    permutationRules: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    version: 1,
  };
}

// Helper to clone a config
export function cloneCalculatorConfig(
  config: CalculatorConfig,
  newName: string
): CalculatorConfig {
  return {
    ...config,
    id: `calculator-${Date.now()}`,
    name: newName,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    version: 1,
  };
}
