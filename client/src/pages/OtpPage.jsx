import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

const OtpPage = () => {
  const navigate = useNavigate();
  const { pendingEmail, otpPreview, verifyOtp, resendOtp } = useAuthStore();
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  if (!pendingEmail) {
    navigate('/login');
    return null;
  }

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await verifyOtp({ email: pendingEmail, otp });
    setLoading(false);
    if (res.success) {
      navigate('/');
    } else {
      alert(res.message || 'Verification failed');
    }
  };

  const handleResend = async () => {
    setLoading(true);
    const res = await resendOtp(pendingEmail);
    setLoading(false);
    if (res.success) {
      alert('OTP resent');
      if (res.preview) window.open(res.preview, '_blank');
    } else {
      alert(res.message || 'Resend failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg p-8 shadow">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Enter OTP</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          We sent an OTP to <strong>{pendingEmail}</strong>. Enter it below to continue.
        </p>

        <form onSubmit={handleVerify} className="space-y-4">
          <input
            type="text"
            value={otp}
            onChange={e => setOtp(e.target.value)}
            placeholder="Enter OTP"
            maxLength={6}
            className="w-full px-3 py-2 border rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
            required
          />

          <div className="flex items-center justify-between">
            <button 
              type="submit" 
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 disabled:opacity-50" 
              disabled={loading}
            >
              {loading ? 'Verifying...' : 'Verify'}
            </button>
            <button 
              type="button" 
              onClick={handleResend} 
              className="text-sm text-purple-600 hover:text-purple-700 disabled:opacity-50"
              disabled={loading}
            >
              Resend OTP
            </button>
          </div>
        </form>

        {otpPreview && (
          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900 rounded">
            <div className="text-sm text-blue-800 dark:text-blue-200 mb-2">
              Development Mode - Email Preview:
            </div>
            <a 
              href={otpPreview} 
              target="_blank" 
              rel="noreferrer" 
              className="text-blue-600 dark:text-blue-400 underline text-sm"
            >
              Open email to view OTP
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default OtpPage;
