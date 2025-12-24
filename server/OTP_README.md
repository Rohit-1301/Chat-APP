OTP email verification

Required environment variables (add to your .env):

- SMTP_HOST - SMTP host (eg: smtp.gmail.com)
- SMTP_PORT - SMTP port (eg: 587)
- SMTP_SECURE - 'true' or 'false'
- SMTP_USER - SMTP username (email)
- SMTP_PASS - SMTP password or app password
- SMTP_FROM - optional from address

Endpoints added:

- POST /api/user/signup  - body: { username, email, password } -> returns { message: 'OTP_SENT', email }
- POST /api/user/login   - body: { email, password } -> if unverified returns { message: 'OTP_SENT' }
- POST /api/user/verify-otp - body: { email, otp } -> verifies and issues token
- POST /api/user/resend-otp - body: { email } -> resends otp

Notes:
- The backend rejects disposable/temporary emails using the is-disposable-email package and returns 400 with message 'Unauthorized mail'.
- OTP expires in 10 minutes.
