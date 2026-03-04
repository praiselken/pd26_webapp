interface Props {
  label: string;
  name: string;
  type?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FormInput({
  label,
  name,
  type = "text",
  value,
  onChange,
}: Props) {
  return (
    <div className="form-group">
      <label className="form-label">{label}</label>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required
        className="form-input"
      />
    </div>
  );
}