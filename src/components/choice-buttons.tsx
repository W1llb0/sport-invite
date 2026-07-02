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
    <div className="actions-row actions-row--choices">
      {options.map((option, index) => (
        <button
          key={option.id}
          type="button"
          className={`lego-button${modifierClass}`}
          style={{ animationDelay: `${index * 0.08}s` }}
          onClick={() => onSelect(option.id)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
