"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

interface GyroState {
  tiltX: number;  // -1 to 1, left/right (gamma)
  tiltY: number;  // -1 to 1, forward/back (beta)
  active: boolean;
}

const GyroContext = createContext<GyroState>({ tiltX: 0, tiltY: 0, active: false });

export function useGyro() {
  return useContext(GyroContext);
}

// iOS 13+ requires requestPermission to be called synchronously inside a button click.
// Non-iOS Android fires deviceorientation without any permission gate.
function needsPermission(): boolean {
  const DOE = DeviceOrientationEvent as unknown as { requestPermission?: () => Promise<string> };
  return typeof DOE.requestPermission === "function";
}

export function GyroProvider({ children }: { children: React.ReactNode }) {
  const [gyro, setGyro] = useState<GyroState>({ tiltX: 0, tiltY: 0, active: false });
  const [showPrompt, setShowPrompt] = useState(false);
  const baseRef = useRef<{ beta: number; gamma: number } | null>(null);
  const smoothRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  const attachListener = () => {
    const handler = (e: DeviceOrientationEvent) => {
      if (e.beta == null || e.gamma == null) return;

      if (!baseRef.current) {
        baseRef.current = { beta: e.beta, gamma: e.gamma };
        return;
      }

      const rawX = (e.gamma - baseRef.current.gamma) / 18;
      const rawY = (e.beta - baseRef.current.beta) / 18;

      smoothRef.current.x = smoothRef.current.x * 0.75 + rawX * 0.25;
      smoothRef.current.y = smoothRef.current.y * 0.75 + rawY * 0.25;

      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        setGyro({
          tiltX: Math.max(-1, Math.min(1, smoothRef.current.x)),
          tiltY: Math.max(-1, Math.min(1, smoothRef.current.y)),
          active: true,
        });
      });
    };

    window.addEventListener("deviceorientation", handler);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (!isTouch) return;

    if (needsPermission()) {
      // iOS — show the permission prompt button
      setShowPrompt(true);
    } else {
      // Android / non-gated browsers — attach directly
      attachListener();
    }

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Called synchronously from a button onClick — required for iOS permission dialog
  const requestGyro = async () => {
    const DOE = DeviceOrientationEvent as unknown as { requestPermission?: () => Promise<string> };
    if (typeof DOE.requestPermission === "function") {
      try {
        const result = await DOE.requestPermission();
        if (result === "granted") {
          attachListener();
          setShowPrompt(false);
        }
      } catch {
        setShowPrompt(false);
      }
    }
  };

  return (
    <GyroContext.Provider value={gyro}>
      {children}
      {showPrompt && (
        <button
          onClick={requestGyro}
          aria-label="Enable tilt animation"
          style={{
            position: "fixed",
            bottom: 28,
            right: 20,
            zIndex: 200,
            display: "flex",
            alignItems: "center",
            gap: 7,
            padding: "9px 16px",
            borderRadius: 100,
            background: "rgba(26,25,23,0.82)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: "1px solid rgba(255,255,255,0.14)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.18)",
            color: "rgba(255,255,255,0.88)",
            fontSize: 12,
            fontWeight: 500,
            letterSpacing: "0.02em",
            cursor: "pointer",
          }}
        >
          <span style={{ fontSize: 14 }}>✦</span>
          <span>Enable tilt</span>
        </button>
      )}
    </GyroContext.Provider>
  );
}
