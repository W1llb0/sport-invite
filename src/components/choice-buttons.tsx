type ChoiceButtonsProps = {
  options: ReadonlyArray<{ id: string; label: string }>;
  onSelect: (id: string) => void;
  variant?: 'primary' | 'secondary' | 'green' | 'red';
};

export function ChoiceButtons({
  options,
  onSelect,
  variant = 'primary',
}: ChoiceButtonsProps) {
  const modifierClass =
    variant === 'secondary'
      ? ' lego-button--secondary'
      : variant === 'green'
        ? ' lego-button--green'
        : variant === 'red'
          ? ' lego-button--red'
          : '';
  return (
    <div className="actions-row">
      {options.map((option) => (
        <button
          key={option.id}
          type="button"
          className={`lego-button${modifierClass}`}
          onClick={() => onSelect(option.id)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
