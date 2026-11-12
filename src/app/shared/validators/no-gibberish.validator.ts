import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Detects random-looking strings like "KwzkHFAPAFNScMAX": a single long token
 * with repeated lower->UPPER case jumps. Real names/sentences contain spaces
 * or at most one case jump (McDonald, MohamedAli).
 */
export function looksLikeGibberish(value: string): boolean {
  const text = value.trim();
  if (text.length < 10 || /\s/.test(text)) return false;
  const jumps = (text.match(/[a-z][A-Z]/g) ?? []).length;
  return jumps >= 2;
}

export const noGibberishValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const value = control.value;
  return typeof value === 'string' && looksLikeGibberish(value) ? { gibberish: true } : null;
};

/** Minimum time (ms) a human needs to fill the form. */
export const MIN_FILL_TIME_MS = 3000;

/** True when a submission looks automated (honeypot filled or submitted too fast). */
export function isBotSubmission(honeypot: string, openedAt: number): boolean {
  return honeypot.trim().length > 0 || Date.now() - openedAt < MIN_FILL_TIME_MS;
}
