import { formatCurrency, formatPercentage, formatTime } from '../services/financial';
import type { TimeUnit } from '../types/financial';

interface ResultProps {
  label: string;
  value: number | null;
  kind: 'money' | 'percentage' | 'time';
  unit?: TimeUnit;
}

function Result({ label, value, kind, unit }: ResultProps) {
  if (value === null) {
    return null;
  }

  const formattedValue =
    kind === 'money'
      ? formatCurrency(value)
      : kind === 'percentage'
        ? formatPercentage(value, unit!)
        : formatTime(value, unit!);

  return (
    <div className="result">
      <span className="result-label">{label}</span>
      <span className="result-value">{formattedValue}</span>
    </div>
  );
}

export default Result;
