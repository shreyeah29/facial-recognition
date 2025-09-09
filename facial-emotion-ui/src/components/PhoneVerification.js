
import React, { useState } from 'react';

const PhoneVerification = () => {
  const [phone, setPhone] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [verified, setVerified] = useState(false);

  const sendOtp = async () => {
    const res = await fetch('http://localhost:5000/send-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone }),
    });
    const data = await res.json();
    if (res.ok) {
      alert('OTP sent!');
      setOtpSent(true);
    } else {
      alert(data.error);
    }
  };

  const verifyOtp = async () => {
    const res = await fetch('http://localhost:5000/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, otp }),
    });
    const data = await res.json();
    if (res.ok) {
      setVerified(true);
    } else {
      alert(data.error);
    }
  };

  return (
    <div>
      {!verified ? (
        <>
          <input
            type="tel"
            placeholder="Enter phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <button onClick={sendOtp}>Send OTP</button>

          {otpSent && (
            <>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
              <button onClick={verifyOtp}>Verify OTP</button>
            </>
          )}
        </>
      ) : (
        <h3>Phone verified! Thank-you message sent.</h3>
      )}
    </div>
  );
};

export default PhoneVerification;
