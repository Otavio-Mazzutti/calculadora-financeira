import { TIME_UNIT_LABELS } from '../types/financial';
import type { TimeUnit } from '../types/financial';

interface RateSelectorProps {
  id: string;
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  unit: TimeUnit;
  onUnitChange: (unit: TimeUnit) => void;
  placeholder?: string;
}

const TIME_UNITS: TimeUnit[] = ['dia', 'mes', 'ano'];

function RateSelector({
  id,
  label,
  value,
  onValueChange,
  unit,
  onUnitChange,
  placeholder,
}: RateSelectorProps) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <div className="field-input field-input-with-unit">
        <input
          id={id}
          type="text"
          inputMode="decimal"
          value={value}
          placeholder={placeholder}
          onChange={(event) => onValueChange(event.target.value)}
        />
        <select
          value={unit}
          onChange={(event) => onUnitChange(event.target.value as TimeUnit)}
          aria-label={`Unidade de ${label}`}
        >
          {TIME_UNITS.map((timeUnit) => (
            <option key={timeUnit} value={timeUnit}>
              {TIME_UNIT_LABELS[timeUnit]}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default RateSelector;
