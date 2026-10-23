export type TimeUnit = 'dia' | 'mes' | 'semestre' | 'ano';

export const TIME_UNIT_LABELS: Record<TimeUnit, string> = {
  dia: 'Dia',
  mes: 'Mês',
  semestre: 'Semestre',
  ano: 'Ano',
};

export const TIME_UNIT_PLURAL_LABELS: Record<TimeUnit, string> = {
  dia: 'dias',
  mes: 'meses',
  semestre: 'semestres',
  ano: 'anos',
};

export type Regime = 'simples' | 'composta';

export const REGIME_OPTIONS: { value: Regime; label: string }[] = [
  { value: 'simples', label: 'Capitalização Simples' },
  { value: 'composta', label: 'Capitalização Composta' },
];

export type CalculationType =
  | 'montante'
  | 'capital'
  | 'juros'
  | 'taxa'
  | 'tempo'
  | 'conversao'
  | 'valorAtualDesconto'
  | 'descontoComercial'
  | 'taxaDescontoComercial'
  | 'taxaEfetiva'
  | 'montanteComposto'
  | 'capitalComposto'
  | 'jurosComposto'
  | 'taxaComposta'
  | 'tempoComposto'
  | 'conversaoComposta'
  | 'taxaNominalEfetiva';

export interface CalculationOption {
  value: CalculationType;
  label: string;
  regime: Regime;
}

export const CALCULATION_OPTIONS: CalculationOption[] = [
  { value: 'montante', label: 'Montante (VF)', regime: 'simples' },
  { value: 'capital', label: 'Capital (VP)', regime: 'simples' },
  { value: 'juros', label: 'Juros (J)', regime: 'simples' },
  { value: 'taxa', label: 'Taxa (i)', regime: 'simples' },
  { value: 'tempo', label: 'Tempo (n)', regime: 'simples' },
  { value: 'conversao', label: 'Conversão de Taxas', regime: 'simples' },
  { value: 'valorAtualDesconto', label: 'Valor Atual (Desconto Comercial)', regime: 'simples' },
  { value: 'descontoComercial', label: 'Desconto Comercial (Dc)', regime: 'simples' },
  { value: 'taxaDescontoComercial', label: 'Taxa de Desconto (d)', regime: 'simples' },
  { value: 'taxaEfetiva', label: 'Taxa Efetiva (i)', regime: 'simples' },
  { value: 'montanteComposto', label: 'Montante (VF)', regime: 'composta' },
  { value: 'capitalComposto', label: 'Capital (VP)', regime: 'composta' },
  { value: 'jurosComposto', label: 'Juros (J)', regime: 'composta' },
  { value: 'taxaComposta', label: 'Taxa (i)', regime: 'composta' },
  { value: 'tempoComposto', label: 'Tempo (n)', regime: 'composta' },
  { value: 'conversaoComposta', label: 'Conversão de Taxas (Equivalentes)', regime: 'composta' },
  { value: 'taxaNominalEfetiva', label: 'Taxa Nominal / Efetiva', regime: 'composta' },
];

export type FieldKind = 'money' | 'rate' | 'time' | 'unit';

export interface FieldConfig {
  key: string;
  label: string;
  kind: FieldKind;
}
