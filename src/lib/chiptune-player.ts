type ChiptuneStep = {
  frequency: number;
  duration: number;
};

type ChiptuneTrack = {
  melody: readonly ChiptuneStep[];
  counter: readonly ChiptuneStep[];
  bass: readonly ChiptuneStep[];
};

const BEAT_DURATION = 0.24;
const REST_FREQUENCY = 0;

const NOTE = {
  C2: 65.41,
  D2: 73.42,
  E2: 82.41,
  F2: 87.31,
  G2: 98.0,
  A2: 110.0,
  B2: 123.47,
  C3: 130.81,
  D3: 146.83,
  E3: 164.81,
  F3: 174.61,
  G3: 196.0,
  A3: 220.0,
  B3: 246.94,
  C4: 261.63,
  D4: 293.66,
  E4: 329.63,
  F4: 349.23,
  G4: 392.0,
  A4: 440.0,
  B4: 493.88,
  C5: 523.25,
  D5: 587.33,
  E5: 659.25,
  F5: 698.46,
  G5: 783.99,
  A5: 880.0,
  B5: 987.77,
  C6: 1046.5,
} as const;

type NoteDef = readonly [number, number];

function buildSteps(definitions: readonly NoteDef[]): ChiptuneStep[] {
  return definitions.map(([frequency, beats]) => ({
    frequency,
    duration: beats * BEAT_DURATION,
  }));
}

function getTrackDuration(steps: readonly ChiptuneStep[]): number {
  return steps.reduce((total, step) => total + step.duration, 0);
}

const melodyDefs: readonly NoteDef[] = [
  [NOTE.G5, 1], [NOTE.E5, 1], [NOTE.C5, 1], [NOTE.E5, 1],
  [NOTE.G5, 1], [NOTE.A5, 1], [NOTE.G5, 2],
  [NOTE.E5, 1], [NOTE.G5, 1], [NOTE.A5, 1], [NOTE.B5, 1],
  [NOTE.A5, 1], [NOTE.G5, 1], [NOTE.E5, 2],
  [NOTE.F5, 1], [NOTE.E5, 1], [NOTE.D5, 1], [NOTE.E5, 1],
  [NOTE.C5, 1], [NOTE.E5, 1], [NOTE.G5, 2],
  [NOTE.A5, 1], [NOTE.G5, 1], [NOTE.E5, 1], [NOTE.C5, 1],
  [NOTE.D5, 2], [NOTE.C5, 2],
  [NOTE.E5, 1], [NOTE.G5, 1], [NOTE.A5, 1], [NOTE.G5, 1],
  [NOTE.E5, 1], [NOTE.C5, 1], [NOTE.D5, 1], [NOTE.E5, 2],
  [NOTE.G5, 1], [NOTE.F5, 1], [NOTE.E5, 1], [NOTE.D5, 1],
  [NOTE.C5, 1], [NOTE.D5, 1], [NOTE.E5, 1], [NOTE.G5, 2],
  [NOTE.A5, 1], [NOTE.G5, 1], [NOTE.F5, 1], [NOTE.E5, 1],
  [NOTE.D5, 1], [NOTE.C5, 2], [REST_FREQUENCY, 2],
  [NOTE.C5, 1], [NOTE.E5, 1], [NOTE.G5, 1], [NOTE.C6, 1],
  [NOTE.B5, 1], [NOTE.A5, 1], [NOTE.G5, 2],
  [NOTE.F5, 1], [NOTE.A5, 1], [NOTE.G5, 1], [NOTE.E5, 1],
  [NOTE.F5, 1], [NOTE.D5, 1], [NOTE.E5, 2],
  [NOTE.G5, 1], [NOTE.E5, 1], [NOTE.C5, 1], [NOTE.E5, 1],
  [NOTE.A5, 1], [NOTE.G5, 1], [NOTE.E5, 2],
  [NOTE.D5, 1], [NOTE.E5, 1], [NOTE.F5, 1], [NOTE.G5, 1],
  [NOTE.A5, 2], [NOTE.G5, 2],
  [NOTE.E5, 1], [NOTE.C5, 1], [NOTE.G4, 1], [NOTE.C5, 1],
  [NOTE.E5, 1], [NOTE.G5, 1], [NOTE.A5, 2],
  [NOTE.G5, 1], [NOTE.E5, 1], [NOTE.D5, 1], [NOTE.C5, 1],
  [NOTE.D5, 1], [NOTE.E5, 2], [REST_FREQUENCY, 2],
  [NOTE.A4, 1], [NOTE.C5, 1], [NOTE.E5, 1], [NOTE.A5, 1],
  [NOTE.G5, 1], [NOTE.E5, 1], [NOTE.C5, 2],
  [NOTE.D5, 1], [NOTE.F5, 1], [NOTE.A5, 1], [NOTE.G5, 1],
  [NOTE.F5, 1], [NOTE.E5, 1], [NOTE.D5, 2],
  [NOTE.C5, 1], [NOTE.E5, 1], [NOTE.G5, 1], [NOTE.E5, 1],
  [NOTE.C5, 1], [NOTE.A4, 1], [NOTE.G4, 2],
  [NOTE.A4, 1], [NOTE.C5, 1], [NOTE.D5, 1], [NOTE.E5, 1],
  [NOTE.G5, 2], [NOTE.E5, 2],
  [NOTE.F5, 1], [NOTE.E5, 1], [NOTE.D5, 1], [NOTE.C5, 1],
  [NOTE.B4, 1], [NOTE.C5, 1], [NOTE.D5, 2],
  [NOTE.E5, 1], [NOTE.G5, 1], [NOTE.A5, 1], [NOTE.G5, 1],
  [NOTE.E5, 1], [NOTE.C5, 1], [NOTE.G4, 2],
  [NOTE.A4, 1], [NOTE.C5, 1], [NOTE.E5, 1], [NOTE.C5, 1],
  [NOTE.D5, 2], [NOTE.C5, 3],
];

const counterDefs: readonly NoteDef[] = [
  [REST_FREQUENCY, 8],
  [NOTE.C5, 1], [NOTE.E5, 1], [NOTE.G5, 1], [NOTE.E5, 1],
  [NOTE.C5, 2], [REST_FREQUENCY, 2],
  [NOTE.D5, 1], [NOTE.F5, 1], [NOTE.A5, 1], [NOTE.F5, 1],
  [NOTE.D5, 2], [REST_FREQUENCY, 2],
  [NOTE.E5, 1], [NOTE.G5, 1], [NOTE.B5, 1], [NOTE.G5, 1],
  [NOTE.E5, 2], [REST_FREQUENCY, 6],
  [REST_FREQUENCY, 8],
  [NOTE.G4, 1], [NOTE.B4, 1], [NOTE.D5, 1], [NOTE.B4, 1],
  [NOTE.G4, 2], [REST_FREQUENCY, 2],
  [NOTE.A4, 1], [NOTE.C5, 1], [NOTE.E5, 1], [NOTE.C5, 1],
  [NOTE.A4, 2], [REST_FREQUENCY, 2],
  [NOTE.G4, 1], [NOTE.B4, 1], [NOTE.D5, 1], [NOTE.G5, 1],
  [NOTE.E5, 2], [REST_FREQUENCY, 6],
  [REST_FREQUENCY, 8],
  [NOTE.E5, 1], [NOTE.C5, 1], [NOTE.G4, 1], [NOTE.C5, 1],
  [NOTE.E5, 2], [REST_FREQUENCY, 2],
  [NOTE.F5, 1], [NOTE.D5, 1], [NOTE.A4, 1], [NOTE.D5, 1],
  [NOTE.F5, 2], [REST_FREQUENCY, 2],
  [NOTE.G5, 1], [NOTE.E5, 1], [NOTE.C5, 1], [NOTE.E5, 1],
  [NOTE.G5, 2], [REST_FREQUENCY, 6],
  [REST_FREQUENCY, 8],
  [NOTE.C5, 1], [NOTE.E5, 1], [NOTE.A5, 1], [NOTE.E5, 1],
  [NOTE.C5, 2], [REST_FREQUENCY, 2],
  [NOTE.D5, 1], [NOTE.F5, 1], [NOTE.A5, 1], [NOTE.F5, 1],
  [NOTE.D5, 2], [REST_FREQUENCY, 2],
  [NOTE.E5, 1], [NOTE.G5, 1], [NOTE.C6, 1], [NOTE.G5, 1],
  [NOTE.E5, 2], [REST_FREQUENCY, 6],
  [REST_FREQUENCY, 8],
  [NOTE.G4, 1], [NOTE.C5, 1], [NOTE.E5, 1], [NOTE.C5, 1],
  [NOTE.G4, 2], [REST_FREQUENCY, 2],
  [NOTE.A4, 1], [NOTE.D5, 1], [NOTE.F5, 1], [NOTE.D5, 1],
  [NOTE.A4, 2], [REST_FREQUENCY, 2],
  [NOTE.G4, 1], [NOTE.C5, 1], [NOTE.E5, 1], [NOTE.G5, 1],
  [NOTE.C5, 3],
];

const bassDefs: readonly NoteDef[] = [
  [NOTE.C3, 4], [NOTE.G2, 4],
  [NOTE.A2, 4], [NOTE.F2, 4],
  [NOTE.C3, 4], [NOTE.G2, 4],
  [NOTE.A2, 2], [NOTE.G2, 2], [NOTE.F2, 4],
  [NOTE.C3, 4], [NOTE.E3, 4],
  [NOTE.F3, 4], [NOTE.G3, 4],
  [NOTE.C3, 4], [NOTE.G2, 4],
  [NOTE.A2, 4], [NOTE.D3, 4],
  [NOTE.G2, 4], [NOTE.E2, 4],
  [NOTE.F2, 4], [NOTE.C3, 4],
  [NOTE.A2, 4], [NOTE.D3, 4],
  [NOTE.G2, 4], [NOTE.C3, 4],
  [NOTE.F2, 4], [NOTE.A2, 4],
  [NOTE.E2, 4], [NOTE.G2, 4],
  [NOTE.C3, 4], [NOTE.G2, 4],
  [NOTE.A2, 4], [NOTE.E3, 4],
  [NOTE.F3, 4], [NOTE.C3, 4],
  [NOTE.D3, 4], [NOTE.G2, 4],
  [NOTE.C3, 4], [NOTE.A2, 4],
  [NOTE.F2, 4], [NOTE.G2, 4],
  [NOTE.C3, 6],
];

const PLATFORMER_TRACK: ChiptuneTrack = {
  melody: buildSteps(melodyDefs),
  counter: buildSteps(counterDefs),
  bass: buildSteps(bassDefs),
};

const LOOP_DURATION = Math.max(
  getTrackDuration(PLATFORMER_TRACK.melody),
  getTrackDuration(PLATFORMER_TRACK.counter),
  getTrackDuration(PLATFORMER_TRACK.bass),
);

const DEFAULT_VOLUME = 0.16;

/**
 * Lightweight square-wave chiptune loop for background ambience.
 */
export class ChiptunePlayer {
  private audioContext: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private loopTimerId: number | null = null;
  private isPlaying = false;
  private isMuted = false;

  public async resume(): Promise<void> {
    if (this.audioContext === null) {
      this.audioContext = new AudioContext();
      this.masterGain = this.audioContext.createGain();
      this.masterGain.gain.value = this.isMuted ? 0 : DEFAULT_VOLUME;
      this.masterGain.connect(this.audioContext.destination);
    }
    if (this.audioContext.state === 'suspended') {
      await this.audioContext.resume();
    }
  }

  public start(): void {
    if (this.isPlaying) {
      return;
    }
    if (this.audioContext === null || this.masterGain === null) {
      return;
    }
    this.isPlaying = true;
    this.scheduleLoop(this.audioContext.currentTime + 0.05);
  }

  public stop(): void {
    this.isPlaying = false;
    if (this.loopTimerId !== null) {
      window.clearTimeout(this.loopTimerId);
      this.loopTimerId = null;
    }
  }

  public setMuted(isMuted: boolean): void {
    this.isMuted = isMuted;
    if (this.masterGain !== null) {
      this.masterGain.gain.value = isMuted ? 0 : DEFAULT_VOLUME;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  private scheduleLoop(startTime: number): void {
    if (!this.isPlaying || this.audioContext === null || this.masterGain === null) {
      return;
    }
    this.playTrack(PLATFORMER_TRACK.melody, startTime, 'square', 0.07);
    this.playTrack(PLATFORMER_TRACK.counter, startTime, 'triangle', 0.045);
    this.playTrack(PLATFORMER_TRACK.bass, startTime, 'triangle', 0.12);
    this.loopTimerId = window.setTimeout(() => {
      if (!this.isPlaying || this.audioContext === null) {
        return;
      }
      this.scheduleLoop(this.audioContext.currentTime + 0.04);
    }, LOOP_DURATION * 1000);
  }

  private playTrack(
    steps: readonly ChiptuneStep[],
    startTime: number,
    waveType: OscillatorType,
    volume: number,
  ): void {
    if (this.audioContext === null || this.masterGain === null) {
      return;
    }
    let cursor = startTime;
    for (const step of steps) {
      if (step.frequency > 0) {
        this.playTone({
          frequency: step.frequency,
          startTime: cursor,
          duration: step.duration,
          waveType,
          volume,
        });
      }
      cursor += step.duration;
    }
  }

  private playTone(params: {
    frequency: number;
    startTime: number;
    duration: number;
    waveType: OscillatorType;
    volume: number;
  }): void {
    if (this.audioContext === null || this.masterGain === null) {
      return;
    }
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    oscillator.type = params.waveType;
    oscillator.frequency.setValueAtTime(params.frequency, params.startTime);
    gainNode.gain.setValueAtTime(0.0001, params.startTime);
    gainNode.gain.exponentialRampToValueAtTime(params.volume, params.startTime + 0.015);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, params.startTime + params.duration);
    oscillator.connect(gainNode);
    gainNode.connect(this.masterGain);
    oscillator.start(params.startTime);
    oscillator.stop(params.startTime + params.duration + 0.02);
  }
}
