import React, { useState, useEffect } from 'react';

const App = () => {
  const launchDate = new Date('2025-07-01T00:00:00').getTime();
  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = launchDate - now;

      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft({ days: '00', hours: '00', minutes: '00', seconds: '00' });
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (distance % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft({
          days: days < 10 ? '0' + days : days,
          hours: hours < 10 ? '0' + hours : hours,
          minutes: minutes < 10 ? '0' + minutes : minutes,
          seconds: seconds < 10 ? '0' + seconds : seconds,
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [launchDate]);

  return (
    <div
      className="relative w-full min-h-screen bg-cover bg-center flex flex-col justify-between text-white font-poppins"
      style={{ backgroundImage: `url('/background.png')` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 flex-grow py-10">
        <img
          src="/logo.png"
          alt="Nourax Logo"
          className="w-60 mb-6 drop-shadow-lg"
        />
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-wide">
          Empowering Tomorrow, Today
        </h1>
        <p className="text-lg max-w-xl mb-8">
          Our website is coming soon. Stay tuned for an amazing experience!
        </p>
        <div className="flex flex-wrap gap-4 justify-center mt-4">
          {Object.entries(timeLeft).map(([unit, value]) => (
            <div
              key={unit}
              className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg px-5 py-4"
            >
              <span className="text-4xl font-bold">{value}</span>
              <div className="text-sm mt-1 capitalize opacity-70">{unit}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 bg-black bg-opacity-70 py-4 px-6 flex flex-col md:flex-row justify-between items-center text-sm">
        <div className="mb-2 md:mb-0">
          &copy; {new Date().getFullYear()} Nourax. All rights reserved.
        </div>
        <div className="flex items-center space-x-4">
          <a
            href="mailto:sales@nourax.in"
            className="hover:text-gray-300 transition-colors duration-200"
          >
            📧 sales@nourax.in
          </a>
          <a
            href="tel:+918489989337"
            className="hover:text-gray-300 transition-colors duration-200"
          >
            📞 +91 84899 89337
          </a>
        </div>
      </footer>
    </div>
  );
};

export default App;
