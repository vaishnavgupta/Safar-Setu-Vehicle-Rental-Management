import React from 'react';
import HeroSection from './HeroSection';
import LoginForm from './LoginForm';
import Footer from './Footer';

const Home = () => {
  return (
      <div
          className="min-h-screen flex flex-col"
          style={{
              background: 'linear-gradient(160deg, #fff5f5 0%, #ffffff 50%, #fef2f2 100%)',
              fontFamily: "'Segoe UI', sans-serif",
          }}
      >
          {/* Top accent bar */}
          <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, #c0392b, #ef4444, #7f1d1d)' }} />

          {/* Main content */}
          <main className="flex-1 flex flex-col">
              <HeroSection />
              <LoginForm />
          </main>

          <Footer />
      </div>
  );
};

export default Home;
