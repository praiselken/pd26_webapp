interface Props {
  label: string;
  name: string;
  value: string;
  options: string[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function FormSelect({
  label,
  name,
  value,
  options,
  onChange,
}: Props) {
  return (
    <div className="form-group">
      <label className="form-label">{label}</label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        required
        className="form-input"
      >
        <option value="">Select</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}