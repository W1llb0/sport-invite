import type { InviteState } from '../state/invite-types';
import { SkillAvatar } from './skill-avatar';

type AvatarPreviewProps = {
  state: InviteState;
};

export function AvatarPreview({ state }: AvatarPreviewProps) {
  return (
    <div className="avatar-preview-wrap">
      <SkillAvatar state={state} />
    </div>
  );
}
