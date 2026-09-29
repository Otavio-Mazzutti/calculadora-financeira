export type TimeUnit = 'dia' | 'mes' | 'ano';

export const TIME_UNIT_LABELS: Record<TimeUnit, string> = {
  dia: 'Dia',
  mes: 'Mês',
  ano: 'Ano',
};

export const TIME_UNIT_PLURAL_LABELS: Record<TimeUnit, string> = {
  dia: 'dias',
  mes: 'meses',
  ano: 'anos',
};

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
  | 'taxaEfetiva';

export interface CalculationOption {
  value: CalculationType;
  label: string;
}

export const CALCULATION_OPTIONS: CalculationOption[] = [
  { value: 'montante', label: 'Montante (VF)' },
  { value: 'capital', label: 'Capital (VP)' },
  { value: 'juros', label: 'Juros (J)' },
  { value: 'taxa', label: 'Taxa (i)' },
  { value: 'tempo', label: 'Tempo (n)' },
  { value: 'conversao', label: 'Conversão de Taxas' },
  { value: 'valorAtualDesconto', label: 'Valor Atual (Desconto Comercial)' },
  { value: 'descontoComercial', label: 'Desconto Comercial (Dc)' },
  { value: 'taxaDescontoComercial', label: 'Taxa de Desconto (d)' },
  { value: 'taxaEfetiva', label: 'Taxa Efetiva (i)' },
];

export type FieldKind = 'money' | 'rate' | 'time' | 'unit';

export interface FieldConfig {
  key: string;
  label: string;
  kind: FieldKind;
}
