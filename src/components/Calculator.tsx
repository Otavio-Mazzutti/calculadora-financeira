import { useState } from 'react';
import type { FormEvent } from 'react';
import InputField from './InputField';
import RateSelector from './RateSelector';
import UnitField from './UnitField';
import Result from './Result';
import { CALCULATION_OPTIONS } from '../types/financial';
import type { CalculationType, FieldConfig, TimeUnit } from '../types/financial';
import {
  calculateCapital,
  calculateDescontoComercial,
  calculateJuros,
  calculateMontante,
  calculateTaxa,
  calculateTaxaDescontoComercial,
  calculateTempo,
  calculateValorAtualComercial,
  convertRate,
  percentToDecimal,
} from '../services/financial';

interface CalculationDefinition {
  fields: FieldConfig[];
  resultLabel: string;
  resultKind: 'money' | 'percentage' | 'time';
  resultUnitFieldKey?: string;
  compute: (values: Record<string, number>, units: Record<string, TimeUnit>) => number;
}

const CALCULATION_DEFINITIONS: Record<CalculationType, CalculationDefinition> = {
  montante: {
    fields: [
      { key: 'vp', label: 'Capital (VP)', kind: 'money' },
      { key: 'rate', label: 'Taxa (i)', kind: 'rate' },
      { key: 'time', label: 'Tempo (n)', kind: 'time' },
    ],
    resultLabel: 'Montante (VF)',
    resultKind: 'money',
    compute: (values, units) => {
      const rate = convertRate(percentToDecimal(values.rate), units.rate, units.time);
      return calculateMontante(values.vp, rate, values.time);
    },
  },
  capital: {
    fields: [
      { key: 'vf', label: 'Montante (VF)', kind: 'money' },
      { key: 'rate', label: 'Taxa (i)', kind: 'rate' },
      { key: 'time', label: 'Tempo (n)', kind: 'time' },
    ],
    resultLabel: 'Capital (VP)',
    resultKind: 'money',
    compute: (values, units) => {
      const rate = convertRate(percentToDecimal(values.rate), units.rate, units.time);
      return calculateCapital(values.vf, rate, values.time);
    },
  },
  juros: {
    fields: [
      { key: 'vp', label: 'Capital (VP)', kind: 'money' },
      { key: 'rate', label: 'Taxa (i)', kind: 'rate' },
      { key: 'time', label: 'Tempo (n)', kind: 'time' },
    ],
    resultLabel: 'Juros (J)',
    resultKind: 'money',
    compute: (values, units) => {
      const rate = convertRate(percentToDecimal(values.rate), units.rate, units.time);
      return calculateJuros(values.vp, rate, values.time);
    },
  },
  taxa: {
    fields: [
      { key: 'vp', label: 'Capital (VP)', kind: 'money' },
      { key: 'vf', label: 'Montante (VF)', kind: 'money' },
      { key: 'time', label: 'Tempo (n)', kind: 'time' },
    ],
    resultLabel: 'Taxa (i)',
    resultKind: 'percentage',
    resultUnitFieldKey: 'time',
    compute: (values) => calculateTaxa(values.vp, values.vf, values.time),
  },
  tempo: {
    fields: [
      { key: 'vp', label: 'Capital (VP)', kind: 'money' },
      { key: 'vf', label: 'Montante (VF)', kind: 'money' },
      { key: 'rate', label: 'Taxa (i)', kind: 'rate' },
    ],
    resultLabel: 'Tempo (n)',
    resultKind: 'time',
    resultUnitFieldKey: 'rate',
    compute: (values) => calculateTempo(values.vp, values.vf, percentToDecimal(values.rate)),
  },
  conversao: {
    fields: [
      { key: 'rate', label: 'Taxa (i)', kind: 'rate' },
      { key: 'targetUnit', label: 'Converter para', kind: 'unit' },
    ],
    resultLabel: 'Taxa Convertida',
    resultKind: 'percentage',
    resultUnitFieldKey: 'targetUnit',
    compute: (values, units) => convertRate(percentToDecimal(values.rate), units.rate, units.targetUnit),
  },
  valorAtualDesconto: {
    fields: [
      { key: 'nominal', label: 'Valor Nominal (N)', kind: 'money' },
      { key: 'rate', label: 'Taxa de Desconto (d)', kind: 'rate' },
      { key: 'time', label: 'Tempo (n)', kind: 'time' },
    ],
    resultLabel: 'Valor Atual (A)',
    resultKind: 'money',
    compute: (values, units) => {
      const rate = convertRate(percentToDecimal(values.rate), units.rate, units.time);
      return calculateValorAtualComercial(values.nominal, rate, values.time);
    },
  },
  descontoComercial: {
    fields: [
      { key: 'nominal', label: 'Valor Nominal (N)', kind: 'money' },
      { key: 'rate', label: 'Taxa de Desconto (d)', kind: 'rate' },
      { key: 'time', label: 'Tempo (n)', kind: 'time' },
    ],
    resultLabel: 'Desconto Comercial (Dc)',
    resultKind: 'money',
    compute: (values, units) => {
      const rate = convertRate(percentToDecimal(values.rate), units.rate, units.time);
      return calculateDescontoComercial(values.nominal, rate, values.time);
    },
  },
  taxaDescontoComercial: {
    fields: [
      { key: 'nominal', label: 'Valor Nominal (N)', kind: 'money' },
      { key: 'atual', label: 'Valor Atual (A)', kind: 'money' },
      { key: 'time', label: 'Tempo (n)', kind: 'time' },
    ],
    resultLabel: 'Taxa de Desconto (d)',
    resultKind: 'percentage',
    resultUnitFieldKey: 'time',
    compute: (values) => calculateTaxaDescontoComercial(values.nominal, values.atual, values.time),
  },
  taxaEfetiva: {
    fields: [
      { key: 'atual', label: 'Valor Atual (A)', kind: 'money' },
      { key: 'nominal', label: 'Valor Nominal (N)', kind: 'money' },
      { key: 'time', label: 'Tempo (n)', kind: 'time' },
    ],
    resultLabel: 'Taxa Efetiva (i)',
    resultKind: 'percentage',
    resultUnitFieldKey: 'time',
    compute: (values) => calculateTaxa(values.atual, values.nominal, values.time),
  },
};

const DEFAULT_UNIT: TimeUnit = 'mes';

function buildInitialUnits(fields: FieldConfig[]): Record<string, TimeUnit> {
  const units: Record<string, TimeUnit> = {};
  for (const field of fields) {
    if (field.kind !== 'money') {
      units[field.key] = DEFAULT_UNIT;
    }
  }
  return units;
}

function Calculator() {
  const [calculationType, setCalculationType] = useState<CalculationType>('montante');
  const definition = CALCULATION_DEFINITIONS[calculationType];

  const [values, setValues] = useState<Record<string, string>>({});
  const [units, setUnits] = useState<Record<string, TimeUnit>>(() =>
    buildInitialUnits(definition.fields),
  );

  const [result, setResult] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleCalculationTypeChange(type: CalculationType) {
    setCalculationType(type);
    setValues({});
    setUnits(buildInitialUnits(CALCULATION_DEFINITIONS[type].fields));
    setResult(null);
    setError(null);
  }

  function handleFieldChange(key: string, value: string) {
    setValues((previous) => ({ ...previous, [key]: value }));
  }

  function handleUnitChange(key: string, unit: TimeUnit) {
    setUnits((previous) => ({ ...previous, [key]: unit }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setResult(null);

    const parsedValues: Record<string, number> = {};

    for (const field of definition.fields) {
      if (field.kind === 'unit') {
        continue;
      }

      const rawValue = values[field.key];
      if (!rawValue) {
        setError('Preencha todos os campos.');
        return;
      }

      const numericValue = Number(rawValue);
      if (Number.isNaN(numericValue)) {
        setError('Os valores informados devem ser numéricos.');
        return;
      }

      parsedValues[field.key] = numericValue;
    }

    const output = definition.compute(parsedValues, units);
    setResult(output);
  }

  const resultUnit = definition.resultUnitFieldKey
    ? units[definition.resultUnitFieldKey]
    : undefined;

  function renderField(field: FieldConfig) {
    if (field.kind === 'money') {
      return (
        <InputField
          key={field.key}
          id={field.key}
          label={field.label}
          value={values[field.key] ?? ''}
          onChange={(value) => handleFieldChange(field.key, value)}
          placeholder="0,00"
          prefix="R$"
        />
      );
    }

    if (field.kind === 'unit') {
      return (
        <UnitField
          key={field.key}
          id={field.key}
          label={field.label}
          value={units[field.key] ?? DEFAULT_UNIT}
          onChange={(unit) => handleUnitChange(field.key, unit)}
        />
      );
    }

    return (
      <RateSelector
        key={field.key}
        id={field.key}
        label={field.label}
        value={values[field.key] ?? ''}
        onValueChange={(value) => handleFieldChange(field.key, value)}
        unit={units[field.key] ?? DEFAULT_UNIT}
        onUnitChange={(unit) => handleUnitChange(field.key, unit)}
        placeholder="0"
      />
    );
  }

  return (
    <div className="calculator">
      <h1>Calculadora Financeira</h1>

      <div className="field">
        <label htmlFor="calculation-type">O que deseja calcular?</label>
        <select
          id="calculation-type"
          value={calculationType}
          onChange={(event) => handleCalculationTypeChange(event.target.value as CalculationType)}
        >
          {CALCULATION_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <form onSubmit={handleSubmit} className="calculator-form">
        {definition.fields.map((field) => renderField(field))}

        <button type="submit">Calcular</button>
      </form>

      {error && <p className="error">{error}</p>}

      <Result
        label={definition.resultLabel}
        value={result}
        kind={definition.resultKind}
        unit={resultUnit}
      />
    </div>
  );
}

export default Calculator;
