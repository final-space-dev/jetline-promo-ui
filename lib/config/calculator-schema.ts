// Core types for calculator configuration system

export type ComponentType =
  | 'single-select'   // Dropdown with single selection
  | 'multi-select'    // Checkboxes or multi-select dropdown
  | 'numeric-input'   // Number input field
  | 'toggle';         // Yes/No or On/Off

export type PermutationOperator =
  | 'if-then-disable'      // If A selected, disable B
  | 'if-then-enable'       // If A selected, enable B
  | 'requires'             // A requires B to be selected
  | 'conflicts-with';      // A and B cannot both be selected

export interface Option {
  id: string;
  label: string;
  value: string;
  metadata?: Record<string, any>;  // For GSM weights, prices, etc.
}

export interface ComponentConfig {
  id: string;
  label: string;
  description?: string;
  enabled: boolean;
  type: ComponentType;
  options: Option[];
  searchable: boolean;
  required: boolean;
  defaultValue?: string | string[];
  placeholder?: string;
}

export interface PermutationRule {
  id: string;
  name: string;
  description?: string;
  operator: PermutationOperator;
  sourceComponent: string;       // Component ID
  sourceValues: string[];         // Option IDs that trigger the rule
  targetComponent: string;        // Component ID affected
  targetValues?: string[];        // Specific options affected (empty = all)
  enabled: boolean;
}

export interface CalculatorConfig {
  id: string;
  name: string;
  description?: string;
  category: string;                        // 'calendar', 'flyer', 'brochure', etc.
  components: Record<string, ComponentConfig>;
  permutationRules: PermutationRule[];
  createdAt: string;
  updatedAt: string;
  version: number;
}

// Helper type for component updates
export interface ComponentUpdate {
  enabled?: boolean;
  options?: Option[];
  defaultValue?: string | string[];
}

// Type guard functions
export function isMultiSelectComponent(config: ComponentConfig): boolean {
  return config.type === 'multi-select';
}

export function isSingleSelectComponent(config: ComponentConfig): boolean {
  return config.type === 'single-select';
}

export function isNumericComponent(config: ComponentConfig): boolean {
  return config.type === 'numeric-input';
}

// Validation helpers
export function validateComponentConfig(config: ComponentConfig): string[] {
  const errors: string[] = [];

  if (!config.id || config.id.trim() === '') {
    errors.push('Component ID is required');
  }

  if (!config.label || config.label.trim() === '') {
    errors.push('Component label is required');
  }

  if (config.type === 'single-select' || config.type === 'multi-select') {
    if (!config.options || config.options.length === 0) {
      errors.push('Select components must have at least one option');
    }
  }

  return errors;
}

export function validatePermutationRule(
  rule: PermutationRule,
  components: Record<string, ComponentConfig>
): string[] {
  const errors: string[] = [];

  if (!rule.sourceComponent || !components[rule.sourceComponent]) {
    errors.push('Source component does not exist');
  }

  if (!rule.targetComponent || !components[rule.targetComponent]) {
    errors.push('Target component does not exist');
  }

  if (rule.sourceComponent === rule.targetComponent) {
    errors.push('Source and target components cannot be the same');
  }

  if (!rule.sourceValues || rule.sourceValues.length === 0) {
    errors.push('At least one source value must be specified');
  }

  return errors;
}
