import { TIME_UNIT_LABELS } from '../types/financial';
import type { TimeUnit } from '../types/financial';

interface UnitFieldProps {
  id: string;
  label: string;
  value: TimeUnit;
  onChange: (unit: TimeUnit) => void;
}

const TIME_UNITS: TimeUnit[] = ['dia', 'mes', 'ano'];

function UnitField({ id, label, value, onChange }: UnitFieldProps) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <select id={id} value={value} onChange={(event) => onChange(event.target.value as TimeUnit)}>
        {TIME_UNITS.map((unit) => (
          <option key={unit} value={unit}>
            {TIME_UNIT_LABELS[unit]}
          </option>
        ))}
      </select>
    </div>
  );
}

export default UnitField;
