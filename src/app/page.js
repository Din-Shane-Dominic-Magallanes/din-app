"use client";
import Image from "next/image";
import { useRef, useState } from "react";

function randomBetween(a, b) {
  return Math.random() * (b - a) + a;
}

export default function Home() {
  const [pointer, setPointer] = useState({ x: -9999, y: -9999 });
  const [hearts, setHearts] = useState([]);
  const bgRef = useRef(null);

  const handlePointerMove = (e) => {
    let x, y;
    if (e.touches) {
      x = e.touches[0].clientX;
      y = e.touches[0].clientY;
    } else {
      x = e.clientX;
      y = e.clientY;
    }
    setPointer({ x, y });
  };

  const handlePointerDown = () => {
    const burst = Array.from({ length: 8 }).map((_, i) => ({
      id: Date.now() + Math.random(),
      x: pointer.x,
      y: pointer.y,
      angle: randomBetween(0, 2 * Math.PI),
      distance: randomBetween(60, 120),
      size: randomBetween(18, 32),
      duration: randomBetween(0.8, 1.3),
    }));
    setHearts((prev) => [...prev, ...burst]);
    setTimeout(() => {
      setHearts((prev) => prev.slice(burst.length));
    }, 1300);
  };

  const gradientStyle = {
    background: `
      radial-gradient(
        circle at ${pointer.x}px ${pointer.y}px,
        rgba(252, 165, 165, 0.25) 0%, 
        rgba(255, 228, 230, 0.15) 40%, 
        transparent 100%
      )
    `,
    transition: "background 0.3s"
  };

  return (
    <div
      ref={bgRef}
      className="min-h-screen flex items-center justify-center"
      style={gradientStyle}
      onMouseMove={handlePointerMove}
      onTouchMove={handlePointerMove}
      onMouseDown={handlePointerDown}
      onTouchStart={handlePointerDown}
    >
      {hearts.map((heart) => (
        <span
          key={heart.id}
          className="heart-burst"
          style={{
            left: heart.x,
            top: heart.y,
            fontSize: heart.size,
            animationDuration: `${heart.duration}s`,
            transform: `translate(-50%, -50%)`,
            '--burst-x': `${Math.cos(heart.angle) * heart.distance}px`,
            '--burst-y': `${Math.sin(heart.angle) * heart.distance}px`,
          }}
        >
          💖
        </span>
      ))}
      <div className="bg-white rounded-3xl shadow-xl px-8 py-8 w-full max-w-2xl flex flex-col items-center gap-6 border border-pink-100 backdrop-blur-lg transition-all duration-300">
        <div className="flex justify-center w-full mt-2 mb-2">
          <div className="rounded-full shadow-xl overflow-hidden w-44 h-44 flex items-center justify-center bg-pink-100">
            <Image
              src="/Picture.png"
              alt="Your Engineer"
              width={176}
              height={176}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
        <div className="w-full flex flex-col items-center justify-center pt-2 pb-2 px-2">
          <div className="text-5xl mb-2 animate-bounce">👷‍♀️</div>
          <h1 className="text-4xl font-extrabold mb-3 text-center bg-gradient-to-r from-pink-500 via-red-400 to-pink-500 bg-clip-text text-transparent drop-shadow-lg font-[Pacifico,cursive]">
            To My Engineer!
          </h1>
          <div className="text-pink-400 text-lg font-semibold mb-2 text-center font-[Quicksand,sans-serif]">
            November 19, 2025
          </div>
          <p className="text-gray-700 text-center mb-4 break-words leading-relaxed font-[Quicksand,sans-serif] text-lg">
            Hey pretty gurl! I am very excited ma engineer naka baby.
            I just want to say that you are always on my wishes and prayers,
            everyday I wake up telling myself that ma Engineer jud ka this year.
            You are so amazing, hardworking, smart so you deserve everything
            nice pudd. I love you so much baby and I miss you every single
            moment that you are not with me. I love that you are determined 
            and focused to reach your goals. I am always proud of you for that.
            Goodluck Yana koo and I am always here for you, to support you and 
            atleast just be with you, I always believe in you! You will do great! Go my Engineer!
            I love youuuuuu veryyy muchhhhhhhhh!! 
          </p>
          <div className="text-pink-500 text-3xl font-extrabold text-center animate-fade-in mt-2 font-[Pacifico,cursive]">
            — Din Shane Pogi 
          </div>
        </div>
      </div>
      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 2s ease-in;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .heart-burst {
          position: fixed;
          pointer-events: none;
          animation: burst 1s cubic-bezier(0.4, 0, 0.2, 1);
          opacity: 0.85;
          z-index: 30;
        }
        @keyframes burst {
          0% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
          80% {
            opacity: 1;
            transform: translate(calc(-50% + var(--burst-x)), calc(-50% + var(--burst-y))) scale(1.2);
          }
          100% {
            opacity: 0;
            transform: translate(calc(-50% + var(--burst-x)), calc(-50% + var(--burst-y))) scale(0.7);
          }
        }
      `}</style>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Pacifico&family=Quicksand:wght@400;700&display=swap');
      `}</style>
    </div>
  );
}
