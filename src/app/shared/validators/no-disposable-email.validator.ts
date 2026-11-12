import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Common disposable / temporary email domains.
 * Client-side checks are only a first line of defense: also validate on the backend.
 */
export const DISPOSABLE_EMAIL_DOMAINS: ReadonlySet<string> = new Set([
  '10minutemail.com', '10minutemail.net', '10minmail.com', '20minutemail.com',
  'temp-mail.org', 'temp-mail.io', 'tempmail.com', 'tempmail.net', 'tempmail.dev',
  'tempmailo.com', 'tempail.com', 'tempinbox.com', 'temporary-mail.net',
  'guerrillamail.com', 'guerrillamail.net', 'guerrillamail.org', 'guerrillamail.biz',
  'guerrillamail.de', 'guerrillamailblock.com', 'sharklasers.com', 'grr.la', 'pokemail.net', 'spam4.me',
  'mailinator.com', 'mailinator.net', 'mailinator2.com', 'notmailinator.com',
  'yopmail.com', 'yopmail.net', 'yopmail.fr', 'cool.fr.nf', 'jetable.fr.nf',
  'throwawaymail.com', 'trashmail.com', 'trashmail.net', 'trashmail.de', 'trash-mail.com',
  'getnada.com', 'nada.email', 'dispostable.com', 'maildrop.cc', 'mailnesia.com',
  'fakeinbox.com', 'fakemail.net', 'fakemailgenerator.com', 'emailondeck.com',
  'mohmal.com', 'mytemp.email', 'mintemail.com', 'mailcatch.com', 'mailtemp.net',
  'moakt.com', 'moakt.cc', 'disposablemail.com', 'discard.email', 'discardmail.com',
  'spamgourmet.com', 'getairmail.com', 'anonbox.net', 'anonymbox.com', 'burnermail.io',
  'inboxkitten.com', 'emailfake.com', 'email-fake.com', 'crazymailing.com', 'luxusmail.org',
  'harakirimail.com', 'mailforspam.com', 'spambox.us', 'spamex.com', 'tmpmail.org', 'tmpmail.net',
  'tmail.ws', 'tmails.net', 'mail.tm', 'internxt.com', 'dropmail.me', 'emltmp.com',
  'minuteinbox.com', 'mailpoof.com', 'linshiyouxiang.net', 'bccto.me', 'zetmail.com',
  'owlymail.com', 'mailsac.com', 'tempr.email', 'trbvm.com', 'vmail.top', 'mail7.io',
  'cuvox.de', 'dayrep.com', 'einrot.com', 'fleckens.hu', 'gustr.com', 'jourrapide.com',
  'rhyta.com', 'superrito.com', 'teleworm.us', 'armyspy.com',
]);

export function isDisposableEmail(email: string): boolean {
  const domain = email.trim().toLowerCase().split('@').pop() ?? '';
  if (!domain) return false;

  // Match the domain itself and any subdomain of a listed domain.
  const parts = domain.split('.');
  for (let i = 0; i < parts.length - 1; i++) {
    if (DISPOSABLE_EMAIL_DOMAINS.has(parts.slice(i).join('.'))) {
      return true;
    }
  }
  return false;
}

export const noDisposableEmailValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const value = control.value;
  if (typeof value !== 'string' || !value.includes('@')) return null;
  return isDisposableEmail(value) ? { disposableEmail: true } : null;
};
