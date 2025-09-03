// Simple disposable email domain checker.
// This file contains a short list of common disposable email domains.
// Extend the list as needed or replace with a maintained package.

const disposableDomains = new Set([
  'mailinator.com',
  '10minutemail.com',
  'temp-mail.org',
  'guerrillamail.com',
  'yopmail.com',
  'maildrop.cc',
  'dispostable.com',
  'fakeinbox.com',
]);

export const isDisposableEmail = async (email) => {
  if (!email || typeof email !== 'string') return false;
  const domain = email.split('@')[1]?.toLowerCase();
  if (!domain) return false;
  return disposableDomains.has(domain);
};

export default isDisposableEmail;
