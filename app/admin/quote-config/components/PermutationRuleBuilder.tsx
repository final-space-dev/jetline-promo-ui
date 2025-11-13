'use client';

import { useState } from 'react';
import {
  PermutationRule,
  ComponentConfig,
  PermutationOperator,
} from '@/lib/config/calculator-schema';

interface PermutationRuleBuilderProps {
  rules: PermutationRule[];
  components: Record<string, ComponentConfig>;
  onAddRule: (rule: PermutationRule) => void;
  onUpdateRule: (ruleId: string, updates: Partial<PermutationRule>) => void;
  onDeleteRule: (ruleId: string) => void;
  onToggleRule: (ruleId: string, enabled: boolean) => void;
}

export default function PermutationRuleBuilder({
  rules,
  components,
  onAddRule,
  onUpdateRule,
  onDeleteRule,
  onToggleRule,
}: PermutationRuleBuilderProps) {
  const [isCreating, setIsCreating] = useState(false);
  const [editingRuleId, setEditingRuleId] = useState<string | null>(null);

  // New rule form state
  const [newRuleName, setNewRuleName] = useState('');
  const [newRuleDescription, setNewRuleDescription] = useState('');
  const [newRuleOperator, setNewRuleOperator] =
    useState<PermutationOperator>('if-then-disable');
  const [newRuleSourceComponent, setNewRuleSourceComponent] = useState('');
  const [newRuleSourceValues, setNewRuleSourceValues] = useState<string[]>([]);
  const [newRuleTargetComponent, setNewRuleTargetComponent] = useState('');
  const [newRuleTargetValues, setNewRuleTargetValues] = useState<string[]>([]);

  const operatorOptions: { value: PermutationOperator; label: string; description: string }[] =
    [
      {
        value: 'if-then-disable',
        label: 'If-Then-Disable',
        description: 'When source is selected, disable target options',
      },
      {
        value: 'if-then-enable',
        label: 'If-Then-Enable',
        description: 'When source is selected, enable target options',
      },
      {
        value: 'requires',
        label: 'Requires',
        description: 'Source selection requires target to be selected',
      },
      {
        value: 'conflicts-with',
        label: 'Conflicts With',
        description: 'Source and target cannot both be selected',
      },
    ];

  const handleCreateRule = () => {
    if (!newRuleName || !newRuleSourceComponent || !newRuleTargetComponent) {
      alert('Please fill in all required fields');
      return;
    }

    const newRule: PermutationRule = {
      id: `rule-${Date.now()}`,
      name: newRuleName,
      description: newRuleDescription,
      operator: newRuleOperator,
      sourceComponent: newRuleSourceComponent,
      sourceValues: newRuleSourceValues,
      targetComponent: newRuleTargetComponent,
      targetValues: newRuleTargetValues,
      enabled: true,
    };

    onAddRule(newRule);
    resetForm();
    setIsCreating(false);
  };

  const resetForm = () => {
    setNewRuleName('');
    setNewRuleDescription('');
    setNewRuleOperator('if-then-disable');
    setNewRuleSourceComponent('');
    setNewRuleSourceValues([]);
    setNewRuleTargetComponent('');
    setNewRuleTargetValues([]);
  };

  const getOperatorIcon = (operator: PermutationOperator) => {
    switch (operator) {
      case 'if-then-disable':
        return 'X';
      case 'if-then-enable':
        return '✓';
      case 'requires':
        return '→';
      case 'conflicts-with':
        return '!';
      default:
        return '•';
    }
  };

  const getOperatorColor = (operator: PermutationOperator) => {
    switch (operator) {
      case 'if-then-disable':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'if-then-enable':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'requires':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'conflicts-with':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Permutation Rules</h2>
            <p className="text-sm text-gray-500 mt-1">
              Define rules to control which options can be selected together
            </p>
          </div>
          <button
            onClick={() => setIsCreating(true)}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium text-sm transition-colors flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add Rule
          </button>
        </div>
      </div>

      {/* Rules List */}
      <div className="flex-1 overflow-y-auto p-6">
        {rules.length === 0 && !isCreating ? (
          <div className="text-center py-16">
            <svg
              className="w-16 h-16 mx-auto mb-4 text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            <p className="text-lg text-gray-400 mb-2">No permutation rules yet</p>
            <p className="text-sm text-gray-500 mb-4">
              Create rules to control which options can be selected together
            </p>
            <button
              onClick={() => setIsCreating(true)}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium text-sm transition-colors"
            >
              Create Your First Rule
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Existing Rules */}
            {rules.map((rule) => {
              const sourceComp = components[rule.sourceComponent];
              const targetComp = components[rule.targetComponent];

              return (
                <div
                  key={rule.id}
                  className={`border-2 rounded-lg p-4 transition-all ${
                    rule.enabled
                      ? 'border-gray-200 bg-white'
                      : 'border-gray-100 bg-gray-50 opacity-60'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">{getOperatorIcon(rule.operator)}</span>
                        <h3 className="font-semibold text-gray-900">{rule.name}</h3>
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium border ${getOperatorColor(
                            rule.operator
                          )}`}
                        >
                          {rule.operator}
                        </span>
                      </div>
                      {rule.description && (
                        <p className="text-sm text-gray-600 ml-11">{rule.description}</p>
                      )}
                    </div>

                    <div className="flex items-center gap-2 ml-4">
                      {/* Enable/Disable Toggle */}
                      <button
                        onClick={() => onToggleRule(rule.id, !rule.enabled)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          rule.enabled ? 'bg-green-600' : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            rule.enabled ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>

                      {/* Delete Button */}
                      <button
                        onClick={() => {
                          if (confirm('Are you sure you want to delete this rule?')) {
                            onDeleteRule(rule.id);
                          }
                        }}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Rule Logic Display */}
                  <div className="ml-11 bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center gap-3 text-sm">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-700">When</span>
                        <span className="px-3 py-1 bg-white border border-gray-300 rounded font-medium text-gray-900">
                          {sourceComp?.label || rule.sourceComponent}
                        </span>
                        {rule.sourceValues.length > 0 && (
                          <>
                            <span className="text-gray-500">is</span>
                            <span className="px-3 py-1 bg-blue-50 border border-blue-200 rounded text-blue-700 font-medium">
                              {rule.sourceValues.join(', ')}
                            </span>
                          </>
                        )}
                      </div>

                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>

                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-700">Then</span>
                        <span className="px-3 py-1 bg-white border border-gray-300 rounded font-medium text-gray-900">
                          {targetComp?.label || rule.targetComponent}
                        </span>
                        {rule.targetValues && rule.targetValues.length > 0 && (
                          <>
                            <span className="text-gray-500">options</span>
                            <span className="px-3 py-1 bg-orange-50 border border-orange-200 rounded text-orange-700 font-medium">
                              {rule.targetValues.join(', ')}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* New Rule Form */}
            {isCreating && (
              <div className="border-2 border-red-300 rounded-lg p-6 bg-red-50">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Rule</h3>

                <div className="space-y-4">
                  {/* Rule Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Rule Name *
                    </label>
                    <input
                      type="text"
                      value={newRuleName}
                      onChange={(e) => setNewRuleName(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-100"
                      placeholder="e.g., Business Card Board size restriction"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={newRuleDescription}
                      onChange={(e) => setNewRuleDescription(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-100"
                      placeholder="Describe what this rule does..."
                      rows={2}
                    />
                  </div>

                  {/* Operator */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Rule Type *
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {operatorOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => setNewRuleOperator(option.value)}
                          className={`p-3 border-2 rounded-lg text-left transition-all ${
                            newRuleOperator === option.value
                              ? 'border-red-500 bg-red-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="font-medium text-gray-900 mb-1">{option.label}</div>
                          <div className="text-xs text-gray-600">{option.description}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Source Component */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Source Component *
                    </label>
                    <select
                      value={newRuleSourceComponent}
                      onChange={(e) => setNewRuleSourceComponent(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-100"
                    >
                      <option value="">Select a component...</option>
                      {Object.values(components).map((comp) => (
                        <option key={comp.id} value={comp.id}>
                          {comp.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Target Component */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Target Component *
                    </label>
                    <select
                      value={newRuleTargetComponent}
                      onChange={(e) => setNewRuleTargetComponent(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-100"
                    >
                      <option value="">Select a component...</option>
                      {Object.values(components)
                        .filter((comp) => comp.id !== newRuleSourceComponent)
                        .map((comp) => (
                          <option key={comp.id} value={comp.id}>
                            {comp.label}
                          </option>
                        ))}
                    </select>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4">
                    <button
                      onClick={handleCreateRule}
                      className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
                    >
                      Create Rule
                    </button>
                    <button
                      onClick={() => {
                        setIsCreating(false);
                        resetForm();
                      }}
                      className="px-4 py-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg font-medium transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
