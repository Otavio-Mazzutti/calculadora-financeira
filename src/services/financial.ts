import { TIME_UNIT_LABELS, TIME_UNIT_PLURAL_LABELS } from '../types/financial';
import type { TimeUnit } from '../types/financial';

export function percentToDecimal(percent: number): number {
  return percent / 100;
}

export function decimalToPercent(decimal: number): number {
  return decimal * 100;
}

export const UNIT_IN_DAYS: Record<TimeUnit, number> = {
  dia: 1,
  mes: 30,
  semestre: 180,
  ano: 360,
};

export function convertRate(rate: number, fromUnit: TimeUnit, toUnit: TimeUnit): number {
  return rate * (UNIT_IN_DAYS[toUnit] / UNIT_IN_DAYS[fromUnit]);
}

export function convertRateComposta(rate: number, fromUnit: TimeUnit, toUnit: TimeUnit): number {
  const ratio = UNIT_IN_DAYS[toUnit] / UNIT_IN_DAYS[fromUnit];
  return Math.pow(1 + rate, ratio) - 1;
}

export function calculateMontante(principal: number, rate: number, time: number): number {
  return principal * (1 + rate * time);
}

export function calculateCapital(montante: number, rate: number, time: number): number {
  return montante / (1 + rate * time);
}

export function calculateJuros(principal: number, rate: number, time: number): number {
  return principal * rate * time;
}

export function calculateTaxa(principal: number, montante: number, time: number): number {
  return (montante - principal) / (principal * time);
}

export function calculateTempo(principal: number, montante: number, rate: number): number {
  return (montante - principal) / (principal * rate);
}

export function calculateValorAtualComercial(
  nominal: number,
  discountRate: number,
  time: number,
): number {
  return nominal * (1 - discountRate * time);
}

export function calculateDescontoComercial(
  nominal: number,
  discountRate: number,
  time: number,
): number {
  return nominal * discountRate * time;
}

export function calculateTaxaDescontoComercial(
  nominal: number,
  valorAtual: number,
  time: number,
): number {
  return (nominal - valorAtual) / (nominal * time);
}

export function calculateMontanteComposto(principal: number, rate: number, time: number): number {
  return principal * Math.pow(1 + rate, time);
}

export function calculateCapitalComposto(montante: number, rate: number, time: number): number {
  return montante / Math.pow(1 + rate, time);
}

export function calculateJurosComposto(principal: number, rate: number, time: number): number {
  return principal * (Math.pow(1 + rate, time) - 1);
}

export function calculateTaxaComposta(principal: number, montante: number, time: number): number {
  return Math.pow(montante / principal, 1 / time) - 1;
}

export function calculateTempoComposto(principal: number, montante: number, rate: number): number {
  return Math.log(montante / principal) / Math.log(1 + rate);
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

export function formatPercentage(decimal: number, unit: TimeUnit): string {
  const percent = decimalToPercent(decimal).toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return `${percent}% ao ${TIME_UNIT_LABELS[unit].toLowerCase()}`;
}

export function formatTime(value: number, unit: TimeUnit): string {
  const formatted = value.toLocaleString('pt-BR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return `${formatted} ${TIME_UNIT_PLURAL_LABELS[unit]}`;
}
