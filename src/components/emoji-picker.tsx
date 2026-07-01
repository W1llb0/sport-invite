import type { Mood } from '../state/invite-types';
import { moodOptions } from '../config/slides';

type EmojiPickerProps = {
  onSelect: (mood: Mood) => void;
};

export function EmojiPicker({ onSelect }: EmojiPickerProps) {
  return (
    <div className="emoji-picker">
      {moodOptions.map((option) => (
        <button
          key={option.id}
          type="button"
          className="emoji-choice"
          aria-label={option.label}
          onClick={() => onSelect(option.id)}
        >
          {option.emoji}
        </button>
      ))}
    </div>
  );
}
