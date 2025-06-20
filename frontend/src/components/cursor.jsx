import React, { useState, useEffect, useRef } from "react";

const CURSOR_SIZE = 18;
const CURSOR_RADIUS = CURSOR_SIZE / 2;

const AnimatedCursor = () => {
  const [mouse, setMouse] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const [cursor, setCursor] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const [isVisible, setIsVisible] = useState(true);
  const [cursorColor, setCursorColor] = useState("#000");
  const [rotation, setRotation] = useState(0);
  const [isIdle, setIsIdle] = useState(false);
  const [borderColor, setBorderColor] = useState("#000");
  const [ripples, setRipples] = useState([]);

  const rotationRef = useRef(0);
  const animationRef = useRef();
  const prevCursorRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const prevMouseRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const targetRotationRef = useRef(0);
  const idleTimeout = useRef();
  const rippleId = useRef(0);

  const isTouchDevice = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0);

  useEffect(() => {
    const updateColor = () => {
      const color = getComputedStyle(document.documentElement).getPropertyValue('--text-primary').trim() || '#000';
      setCursorColor(color);
      const theme = document.documentElement.getAttribute('data-theme');
      setBorderColor(theme === 'dark' ? '#fff' : '#000');
    };
    updateColor();
    const observer = new MutationObserver(updateColor);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    window.addEventListener('resize', updateColor);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateColor);
    };
  }, []);

  useEffect(() => {
    if (!isTouchDevice && isVisible) {
      document.body.style.cursor = 'none';
      document.documentElement.style.cursor = 'none';
    } else {
      document.body.style.cursor = 'auto';
      document.documentElement.style.cursor = 'auto';
    }
    return () => {
      document.body.style.cursor = 'auto';
      document.documentElement.style.cursor = 'auto';
    };
  }, [isTouchDevice, isVisible]);

  useEffect(() => {
    if (isTouchDevice) return;
    const resetIdle = () => {
      setIsIdle(false);
      clearTimeout(idleTimeout.current);
      idleTimeout.current = setTimeout(() => setIsIdle(true), 1000);
    };
    window.addEventListener('mousemove', resetIdle);
    window.addEventListener('mousedown', resetIdle);
    resetIdle();
    return () => {
      window.removeEventListener('mousemove', resetIdle);
      window.removeEventListener('mousedown', resetIdle);
      clearTimeout(idleTimeout.current);
    };
  }, [isTouchDevice]);

  useEffect(() => {
    if (isTouchDevice) return;
    const handleMouseMove = (e) => {
      const x = Math.max(CURSOR_RADIUS, Math.min(window.innerWidth - CURSOR_RADIUS, e.clientX));
      const y = Math.max(CURSOR_RADIUS, Math.min(window.innerHeight - CURSOR_RADIUS, e.clientY));
      setMouse({ x, y });
      setIsVisible(true);
    };
    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isTouchDevice]);

  useEffect(() => {
    if (isTouchDevice) return;

    const animate = () => {
      setCursor(prev => {
        const dx = mouse.x - prev.x;
        const dy = mouse.y - prev.y;
        const lag = 0.12;
        const newX = prev.x + dx * lag;
        const newY = prev.y + dy * lag;
        prevCursorRef.current = { x: newX, y: newY };
        return { x: newX, y: newY };
      });

      const prevMouse = prevMouseRef.current;
      const dxMouse = mouse.x - prevMouse.x;
      const dyMouse = mouse.y - prevMouse.y;
      let angle = rotationRef.current;
      if (dxMouse !== 0 || dyMouse !== 0) {
        angle = Math.atan2(dyMouse, dxMouse) * (180 / Math.PI);
      }
      prevMouseRef.current = { x: mouse.x, y: mouse.y };
      targetRotationRef.current = angle;

      const prev = rotationRef.current;
      const target = targetRotationRef.current;
      const diff = target - prev;
      const normDiff = ((diff + 180) % 360) - 180;
      const nextRotation = prev + normDiff * 0.05;
      rotationRef.current = nextRotation;
      setRotation(nextRotation);

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, [mouse, isTouchDevice]);

  useEffect(() => {
    if (!isTouchDevice) return;
    const handleTouchStart = (e) => {
      const touch = e.touches[0];
      if (!touch) return;
      const x = touch.clientX;
      const y = touch.clientY;
      const id = rippleId.current++;
      setRipples((prev) => [...prev, { x, y, id }]);
      setTimeout(() => {
        setRipples((prev) => prev.filter(r => r.id !== id));
      }, 500);
    };
    window.addEventListener('touchstart', handleTouchStart);
    return () => window.removeEventListener('touchstart', handleTouchStart);
  }, [isTouchDevice]);

  if (isTouchDevice) {
    return (
      <>
        {ripples.map(ripple => (
          <span
            key={ripple.id}
            style={{
              position: 'fixed',
              left: ripple.x - 30,
              top: ripple.y - 30,
              width: 60,
              height: 60,
              borderRadius: '50%',
              background: 'rgba(0,0,0,0.15)',
              pointerEvents: 'none',
              zIndex: 9999,
              animation: 'cursorRipple 0.5s linear',
            }}
          />
        ))}
        <style>{`
          @keyframes cursorRipple {
            0% { opacity: 0.5; transform: scale(0.5); }
            100% { opacity: 0; transform: scale(1.5); }
          }
        `}</style>
      </>
    );
  }

  return (
    <div
      role="presentation"
      aria-hidden="true"
      className="custom-animated-cursor"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 9999,
        opacity: isVisible ? 1 : 0,
        width: 0,
        height: 0,
      }}
    >
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: CURSOR_SIZE,
          height: CURSOR_SIZE,
          pointerEvents: 'none',
          transform: `translate(${cursor.x}px, ${cursor.y}px) rotate(${rotation}deg) translate(-${CURSOR_SIZE/2}px, -${CURSOR_SIZE/2}px) scale(${!isIdle ? 1.18 : 1})`,
          transformOrigin: 'center center',
          transition: 'transform 0.18s cubic-bezier(0.22, 1, 0.36, 1)',
          willChange: 'transform',
        }}
      >
        {/* Shining background effect */}
        <svg
          width={CURSOR_SIZE * 2}
          height={CURSOR_SIZE * 2}
          style={{
            position: 'absolute',
            left: `-${CURSOR_SIZE/2}px`,
            top: `-${CURSOR_SIZE/2}px`,
            pointerEvents: 'none',
            zIndex: 0,
            filter: 'blur(2.5px)',
            opacity: !isIdle ? 0.7 : 0.4,
            transition: 'opacity 0.3s',
            animation: !isIdle ? 'cursorShine 1.2s linear infinite' : 'none',
          }}
        >
          <defs>
            <radialGradient id="cursor-shine" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fff" stopOpacity="0.7" />
              <stop offset="60%" stopColor={cursorColor} stopOpacity="0.15" />
              <stop offset="100%" stopColor={cursorColor} stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle
            cx={CURSOR_SIZE}
            cy={CURSOR_SIZE}
            r={CURSOR_SIZE * 0.85}
            fill="url(#cursor-shine)"
          />
        </svg>
        <style>{`
          @keyframes cursorShine {
            0% { filter: blur(2.5px) brightness(1.1); }
            50% { filter: blur(3.5px) brightness(1.4); }
            100% { filter: blur(2.5px) brightness(1.1); }
          }
        `}</style>
        <svg
          width={CURSOR_SIZE}
          height={CURSOR_SIZE}
          viewBox={`0 0 ${CURSOR_SIZE} ${CURSOR_SIZE}`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ display: 'block' }}
        >
          <polygon
            points={`
              ${CURSOR_SIZE / 2},2
              ${CURSOR_SIZE - 2},${CURSOR_SIZE - 2}
              2,${CURSOR_SIZE - 2}
            `}
            fill={!isIdle ? (borderColor === '#fff' ? '#444' : '#bbb') : cursorColor}
            stroke={borderColor}
            strokeWidth="1.2"
            opacity="0.95"
          />
        </svg>
      </div>
    </div>
  );
};

export default AnimatedCursor;