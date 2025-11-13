# Quote Config - Calculator Configuration Management

## Overview

The Quote Config interface is an admin panel that allows technical and business users to manage calculator configurations without touching code. It provides an intuitive UI for controlling which components and options are available in calculators, and for defining permutation rules to prevent impossible product configurations.

## Features

### 1. Component Management
- **Enable/Disable Components**: Toggle entire calculator components on/off
- **Searchable Options**: Fuzzy search across large option lists (handles hundreds of options elegantly)
- **Visual Tag System**: Selected options displayed as removable tags
- **Bulk Operations**: Select all, clear all, or add custom options
- **Component Types Supported**:
  - Single-select (dropdowns)
  - Multi-select (checkboxes)
  - Numeric input (quantity fields)
  - Toggle (yes/no switches)

### 2. Permutation Rules
- **Visual Rule Builder**: Create rules without writing code
- **Rule Types**:
  - `if-then-disable`: When source is selected, disable target options
  - `if-then-enable`: When source is selected, enable target options
  - `requires`: Source selection requires target to be selected
  - `conflicts-with`: Source and target cannot both be selected
- **Enable/Disable Rules**: Toggle rules on/off without deleting them
- **Visual Feedback**: Color-coded rule types with icons

### 3. Configuration Management
- **Export Configuration**: Download config as JSON file
- **Import Configuration**: Load previously saved configurations
- **Save Configuration**: Persist changes (currently local, ready for API integration)
- **Version Tracking**: Track config version and last updated timestamp

### 4. Live Preview
- **Coming Soon**: See how the calculator appears to end users in real-time

## File Structure

```
/app/admin/quote-config/
├── page.tsx                          # Main admin page with tabs
├── components/
│   ├── ComponentList.tsx             # Left sidebar - component selector
│   ├── ComponentConfigPanel.tsx      # Right panel - configure selected component
│   ├── SearchableMultiSelect.tsx     # Reusable search + multi-select component
│   ├── OptionTagList.tsx            # Display selected options as tags
│   └── PermutationRuleBuilder.tsx   # Visual rule creation UI

/lib/config/
├── calculator-schema.ts              # TypeScript interfaces and types
├── default-configs.ts                # Sample data and default configurations
└── validation-rules.ts               # [Future] Validation logic
```

## Data Models

### CalculatorConfig
Main configuration object containing:
- Component definitions
- Permutation rules
- Metadata (id, name, version, timestamps)

### ComponentConfig
Individual component configuration:
- Label, description, type
- Enabled status
- Options array
- Searchable flag
- Required flag

### PermutationRule
Rule definition for controlling option relationships:
- Source and target components
- Operator type
- Affected values
- Enabled status

## Usage

### Accessing the Admin Panel
1. Navigate to `/admin/quote-config` or click "Quote Config" in the top navigation
2. The interface opens to the Components tab by default

### Managing Components
1. Select a component from the left sidebar
2. Use the toggle switch to enable/disable the component
3. Search for options using the searchable dropdown
4. Click options to add them to the active list
5. Remove options by clicking the X on tags
6. Use bulk actions to select/clear all options

### Creating Permutation Rules
1. Switch to the "Permutation Rules" tab
2. Click "Add Rule" button
3. Fill in:
   - Rule name and description
   - Rule type (operator)
   - Source component
   - Target component
4. Click "Create Rule"
5. Toggle rules on/off as needed

### Exporting/Importing Configurations
- **Export**: Click "Export" button to download JSON file
- **Import**: Click "Import" button and select a JSON file
- **Save**: Click "Save Configuration" to persist changes

## Component Options Available

### Sizes
A1, A2, A3, A4, A5, A6, A7, DL

### Materials
- Custom Paper
- Bond Tint (80, 100 GSM)
- Bond White (80, 100 GSM)
- Brilliant White (80, 100, 120 GSM)
- Business Card Board White (350 GSM)
- Camelot Cartridge White (170, 250 GSM)
- Chromolux (250, 700 GSM)
- Colourplan (135, 270, 350 GSM)
- And many more...

### Finishing Options
- Folding
- Lamination
- Hand Gluing
- Spot Varnish
- Wirobind
- Perfect Binding
- Saddle Stitch
- Scoring
- Punching
- Finishing Outsourced

### Colors
- Full Colour
- Black and White

### Other Components
- GSM Weight (80-700 GSM range)
- Spot Colours (Yes/No)
- Quantity (numeric input)

## Sample Permutation Rules

### Example 1: Business Card Board Size Restriction
```
When: Material is "Business Card Board White"
Then: Disable sizes A1, A2, A3, A4, A5, DL
```

### Example 2: Spot Colours Require Full Colour
```
When: Spot Colours is "Yes"
Then: Colour must be "Full Colour"
```

### Example 3: Lamination vs Spot Varnish Conflict
```
When: Finishing includes "Lamination"
Then: Cannot select "Spot Varnish"
```

## Future Enhancements

1. **API Integration**: Connect to backend for persistent storage
2. **Live Preview**: Real-time calculator preview with current configuration
3. **Custom Options**: Add entirely new options via UI
4. **Advanced Permutation Logic**: Complex multi-condition rules
5. **Template Library**: Save and reuse common configurations
6. **Audit Log**: Track who changed what and when
7. **Validation Preview**: See all valid/invalid combinations
8. **Bulk Import**: CSV/Excel import for large option lists
9. **User Permissions**: Role-based access control
10. **Multi-language Support**: Translate labels and options

## Technical Details

### Search Implementation
- Fuzzy search algorithm matches characters in order
- Supports both exact and approximate matches
- Searches across option labels and values
- Real-time filtering with no lag

### State Management
- Local state with React useState
- Immutable updates for all configuration changes
- Automatic timestamp updates on changes

### Keyboard Navigation
- Arrow keys to navigate dropdown
- Enter to select
- Escape to close
- Full accessibility support

### Styling
- Tailwind CSS utility classes
- Red color theme matching brand
- Responsive design (desktop optimized)
- Smooth transitions and animations

## Access URL

**Development**: http://localhost:3002/admin/quote-config

## Notes for Development Team

1. **Export/Import is functional**: Configurations can be shared via JSON files
2. **Data is currently hardcoded**: Will need API endpoints for production
3. **Validation is client-side only**: Add server-side validation when integrating API
4. **Preview tab is placeholder**: Needs implementation to show live calculator
5. **Permission system needed**: Add auth checks before deploying to production

## Support

For questions or issues with the Quote Config interface, please contact the development team or create an issue in the project repository.
