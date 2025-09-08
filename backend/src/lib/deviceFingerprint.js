import crypto from 'crypto';

export const generateDeviceFingerprint = (req) => {
  const userAgent = req.headers['user-agent'] || '';
  const acceptLanguage = req.headers['accept-language'] || '';
  const acceptEncoding = req.headers['accept-encoding'] || '';
  const ip = req.ip || req.connection.remoteAddress || req.headers['x-forwarded-for'] || '';
  
  // Create a unique fingerprint based on browser/device characteristics
  const fingerprintData = `${userAgent}|${acceptLanguage}|${acceptEncoding}|${ip}`;
  
  return crypto.createHash('sha256').update(fingerprintData).digest('hex');
};

export const isDeviceTrusted = (user, deviceFingerprint) => {
  if (!user.trustedDevices || user.trustedDevices.length === 0) {
    return false;
  }
  
  const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;
  const now = new Date();
  
  return user.trustedDevices.some(device => {
    const isMatchingDevice = device.fingerprint === deviceFingerprint;
    const isWithinTimeLimit = device.verifiedAt && (now - device.verifiedAt) < SEVEN_DAYS;
    return isMatchingDevice && isWithinTimeLimit;
  });
};

export const addTrustedDevice = async (user, deviceFingerprint, userAgent) => {
  const now = new Date();
  
  // Remove old entries for this device if exists
  user.trustedDevices = user.trustedDevices.filter(
    device => device.fingerprint !== deviceFingerprint
  );
  
  // Add new trusted device
  user.trustedDevices.push({
    fingerprint: deviceFingerprint,
    userAgent: userAgent,
    lastUsed: now,
    verifiedAt: now,
  });
  
  // Keep only last 10 devices to prevent unlimited growth
  if (user.trustedDevices.length > 10) {
    user.trustedDevices = user.trustedDevices
      .sort((a, b) => b.lastUsed - a.lastUsed)
      .slice(0, 10);
  }
  
  await user.save();
};

export const updateDeviceLastUsed = async (user, deviceFingerprint) => {
  const device = user.trustedDevices.find(d => d.fingerprint === deviceFingerprint);
  if (device) {
    device.lastUsed = new Date();
    await user.save();
  }
};
