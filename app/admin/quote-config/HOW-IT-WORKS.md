# Simplified Quote Config - How It Works

## The Problem (Solved!)

**Before**: Complex interface with separate tabs for components and permutation rules. You had to:
1. Configure components in one place
2. Configure options separately
3. Create permutation rules in another tab
4. Hard to understand relationships between options

**Now**: ONE simple interface where you configure everything in one place!

## The New Approach

### Single-Screen Configuration

**Left Sidebar**: Select which component to configure
- Material (with GSM sub-options)
- Size
- Colour
- Finishing Options

**Right Panel**: Configure the selected component in 3 simple steps

## Example: Material Configuration

### Step 1: Select Allowed Materials
Check the boxes for materials you want to allow:
- ✓ Brilliant White
- ✓ Bond White
- ✗ Business Card Board (unchecked = not available to users)
- ✗ Chromolux (unchecked = not available to users)

### Step 2: Configure GSM for Each Material
For each selected material, pick which GSM weights are allowed:

**Brilliant White**
- ✓ 135 GSM (button selected/highlighted)
- ✓ 200 GSM (button selected/highlighted)
- ✗ 80 GSM (not selected = users can't pick this)
- ✗ 100 GSM (not selected)

**Bond White**
- ✓ 80 GSM (button selected/highlighted)
- ✓ 90 GSM (button selected/highlighted)
- ✗ 135 GSM (not selected)

### Step 3: Save
Click "Save Changes" and you're done!

## What Users See

Based on your configuration above, store users will see:

**Material Dropdown:**
- Brilliant White
- Bond White

**When "Brilliant White" is selected, GSM Dropdown shows:**
- 135 GSM
- 200 GSM

**When "Bond White" is selected, GSM Dropdown shows:**
- 80 GSM
- 90 GSM

## Key Features

### Mutually Exclusive Options
- Options only appear when their parent is selected
- No impossible combinations
- No complex "if-this-then-that" rules needed

### Visual Configuration
- Checkboxes for main options
- Button toggles for sub-options (GSM)
- Selected items highlighted in red
- Clear visual feedback

### Quick Actions
- "Select All" - pick all available sub-options
- "Clear All" - deselect all sub-options
- "Remove" - remove an option entirely

### Smart Filtering
The system automatically filters sub-options based on metadata:
- Brilliant White's metadata says it supports [80, 100, 120] GSM
- System only shows those GSM options for Brilliant White
- Prevents configuration errors

## Components You Can Configure

### 1. Material (with GSM sub-options)
- Select which paper types
- For each paper, select allowed GSM weights
- System respects material-specific GSM availability

### 2. Size
- Simple checkbox list
- No sub-options
- Pick which sizes (A1-A7, DL) users can select

### 3. Colour
- Full Colour
- Black and White
- Simple on/off selection

### 4. Finishing Options
- Multi-select (users can pick multiple)
- Simple checkbox list
- No sub-options needed

## Export/Import

**Export**: Download your configuration as JSON
- Share with other team members
- Backup your settings
- Version control

**Import**: (Feature ready for implementation)
- Load saved configurations
- Quickly switch between presets

## No More Complex Rules!

**Old way (complex):**
```
IF Material = "Brilliant White"
AND GSM = "80"
THEN DISABLE (because 80 GSM not available for Brilliant White)
```

**New way (simple):**
Just don't select 80 GSM for Brilliant White. Done!

## Benefits

1. **Intuitive**: Configure parent and children together
2. **Visual**: See exactly what users will see
3. **Fast**: No complex rule creation needed
4. **Error-proof**: System prevents invalid configurations
5. **Maintainable**: Easy to update when products change

## Access

Navigate to: http://localhost:3002/admin/quote-config

Click "Quote Config" in the top navigation.
