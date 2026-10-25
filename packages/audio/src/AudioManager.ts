export class AudioManager {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private musicGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;

  init(): void {
    if (this.ctx) return;
    this.ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    this.masterGain = this.ctx.createGain();
    this.masterGain.connect(this.ctx.destination);
    this.musicGain = this.ctx.createGain();
    this.musicGain.connect(this.masterGain);
    this.sfxGain = this.ctx.createGain();
    this.sfxGain.connect(this.masterGain);
  }

  setMasterVolume(v: number): void {
    if (this.masterGain) this.masterGain.gain.value = v;
  }

  setMusicVolume(v: number): void {
    if (this.musicGain) this.musicGain.gain.value = v;
  }

  setSfxVolume(v: number): void {
    if (this.sfxGain) this.sfxGain.gain.value = v;
  }

  async playSfx(url: string): Promise<void> {
    if (!this.ctx || !this.sfxGain) this.init();
    if (!this.ctx || !this.sfxGain) return;
    const res = await fetch(url);
    const buf = await res.arrayBuffer();
    const audio = await this.ctx.decodeAudioData(buf);
    const src = this.ctx.createBufferSource();
    src.buffer = audio;
    src.connect(this.sfxGain);
    src.start();
  }

  dispose(): void {
    this.ctx?.close();
    this.ctx = null;
  }
}

export const audioManager = new AudioManager();
