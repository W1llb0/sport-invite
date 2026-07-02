import type { Mood } from '../state/invite-types';
import { moodOptions } from '../config/slides';

type EmojiPickerProps = {
  onSelect: (mood: Mood) => void;
};

export function EmojiPicker({ onSelect }: EmojiPickerProps) {
  return (
    <div className="emoji-picker emoji-picker--animated">
      {moodOptions.map((option, index) => (
        <button
          key={option.id}
          type="button"
          className="emoji-choice"
          style={{ animationDelay: `${index * 0.06}s` }}
          aria-label={option.label}
          onClick={() => onSelect(option.id)}
        >
          {option.emoji}
        </button>
      ))}
    </div>
  );
}
