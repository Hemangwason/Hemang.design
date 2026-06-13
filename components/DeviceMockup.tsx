import type { DeviceType } from "@/lib/projects";

interface Props {
  device: DeviceType;
  gradient: readonly [string, string];
  videoSrc?: string;
  size?: "card" | "modal";
  videoPaused?: boolean;
}

export default function DeviceMockup({ device, gradient, videoSrc, size = "card", videoPaused = false }: Props) {
  return device === "phone" ? (
    <PhoneMockup gradient={gradient} videoSrc={videoSrc} size={size} videoPaused={videoPaused} />
  ) : (
    <LaptopMockup gradient={gradient} videoSrc={videoSrc} size={size} videoPaused={videoPaused} />
  );
}

function PhoneMockup({
  gradient,
  videoSrc,
  size,
  videoPaused,
}: {
  gradient: readonly [string, string];
  videoSrc?: string;
  size: "card" | "modal";
  videoPaused: boolean;
}) {
  // iPhone 15-like proportions: width × 2.165 = height
  const w = size === "modal" ? 176 : 122;
  const h = Math.round(w * 2.165);
  const r = Math.round(w * 0.28); // ~34 at card
  const frame = size === "modal" ? 6 : 4; // aluminum edge thickness
  // Dynamic Island: ~52% of screen width, accurate iPhone 15 proportion
  const screenW = w - frame * 2;
  const islandW = Math.round(screenW * 0.48);
  const islandH = Math.round(islandW * 0.285);
  const islandTop = Math.round(frame + 8);

  return (
    <div
      style={{
        position: "relative",
        width: w,
        height: h,
        borderRadius: r,
        // Natural silver aluminum — clean, matches reference aesthetic
        background: "linear-gradient(170deg, #f2f2f4 0%, #e4e4e6 40%, #d4d4d6 100%)",
        boxShadow: [
          "0 0 0 1px rgba(0,0,0,0.10)",
          "inset 0 1.5px 0 rgba(255,255,255,0.85)",
          "inset 0 -1px 0 rgba(0,0,0,0.06)",
          "0 28px 56px rgba(0,0,0,0.18)",
          "0 8px 18px rgba(0,0,0,0.10)",
        ].join(", "),
        flexShrink: 0,
      }}
    >
      {/* Screen glass — dark, fills inside of frame */}
      <div
        style={{
          position: "absolute",
          inset: frame,
          borderRadius: r - frame,
          overflow: "hidden",
          background: "#000",
        }}
      >
        {videoSrc ? (
          <video
            src={videoSrc}
            autoPlay={!videoPaused}
            muted
            loop
            playsInline
            preload="metadata"
            style={{ width: "100%", height: "100%", objectFit: "contain", display: "block", background: "#000" }}
          />
        ) : (
          <div style={{ width: "100%", height: "100%", background: `linear-gradient(160deg, ${gradient[0]}, ${gradient[1]})` }} />
        )}

        {/* Dynamic Island */}
        <div
          style={{
            position: "absolute",
            top: islandTop - frame,
            left: "50%",
            transform: "translateX(-50%)",
            width: islandW,
            height: islandH,
            borderRadius: islandH / 2,
            background: "#000",
            zIndex: 10,
          }}
        />

        {/* Home indicator */}
        <div
          style={{
            position: "absolute",
            bottom: size === "modal" ? 10 : 7,
            left: "50%",
            transform: "translateX(-50%)",
            width: Math.round(screenW * 0.30),
            height: size === "modal" ? 4 : 3,
            borderRadius: 2,
            background: "rgba(255,255,255,0.32)",
            zIndex: 10,
          }}
        />

        {/* Glass specular — subtle screen shine */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 50%)",
            pointerEvents: "none",
            zIndex: 9,
          }}
        />
      </div>

      {/* Right: power button */}
      <div
        style={{
          position: "absolute",
          right: -1.5,
          top: "26%",
          width: 2.5,
          height: size === "modal" ? 52 : 34,
          borderRadius: "0 2px 2px 0",
          background: "linear-gradient(to bottom, #bcbdbe, #aaabac)",
        }}
      />

      {/* Left: volume buttons */}
      {(["18%", "30%"] as const).map((top, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: -1.5,
            top,
            width: 2.5,
            height: size === "modal" ? 36 : 24,
            borderRadius: "2px 0 0 2px",
            background: "linear-gradient(to bottom, #bcbdbe, #aaabac)",
          }}
        />
      ))}
    </div>
  );
}

function LaptopMockup({
  gradient,
  videoSrc,
  size,
  videoPaused,
}: {
  gradient: readonly [string, string];
  videoSrc?: string;
  size: "card" | "modal";
  videoPaused: boolean;
}) {
  const screenW = size === "modal" ? 420 : 268;
  const screenH = Math.round(screenW * 0.625); // 16:10
  const camBarH = size === "modal" ? 9 : 6; // ultra-slim notch bar
  const lidH = screenH + camBarH;
  const baseW = screenW + (size === "modal" ? 8 : 5);
  const baseH = size === "modal" ? 12 : 8; // barely-there base strip
  const trackpadW = size === "modal" ? 44 : 28;
  const trackpadH = size === "modal" ? 11 : 7;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        // No filter — drop-shadow forces full re-rasterization on every 3D tilt frame
      }}
    >
      {/* Lid */}
      <div
        style={{
          width: screenW,
          height: lidH,
          borderRadius: size === "modal" ? "8px 8px 0 0" : "6px 6px 0 0",
          background: "#0b0b0d",
          border: "1px solid rgba(155,157,160,0.80)",
          borderBottom: "1px solid rgba(100,101,103,0.65)",
          boxShadow: "0 20px 40px rgba(0,0,0,0.20), 0 3px 8px rgba(0,0,0,0.10)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Slim camera bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: camBarH,
            background: "#0b0b0d",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: size === "modal" ? 4 : 3,
              height: size === "modal" ? 4 : 3,
              borderRadius: "50%",
              background: "#1e1e21",
              boxShadow: "0 0 0 1px rgba(255,255,255,0.03)",
            }}
          />
        </div>

        {/* Screen */}
        <div
          style={{
            position: "absolute",
            top: camBarH,
            left: 0,
            right: 0,
            bottom: 0,
            overflow: "hidden",
            background: "#000",
          }}
        >
          {videoSrc ? (
            <video
              src={videoSrc}
              autoPlay={!videoPaused}
              muted
              loop
              playsInline
              preload="metadata"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                display: "block",
                background: gradient[0],
              }}
            />
          ) : (
            <div style={{ width: "100%", height: "100%", background: `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})` }} />
          )}
          {/* Subtle screen sheen */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(140deg, rgba(255,255,255,0.03) 0%, transparent 55%)",
              pointerEvents: "none",
            }}
          />
        </div>

        {/* Top edge highlight */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 1,
            background: "rgba(255,255,255,0.28)",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Hinge — hairline */}
      <div style={{ width: screenW + 1, height: 1, background: "rgba(90,91,93,0.5)" }} />

      {/* Base — ultra slim keyboard deck */}
      <div
        style={{
          width: baseW,
          height: baseH,
          borderRadius: "0 0 4px 4px",
          background: "linear-gradient(to bottom, #cecfd1 0%, #bfc0c2 100%)",
          border: "1px solid rgba(0,0,0,0.09)",
          borderTop: "none",
          position: "relative",
        }}
      >
        {/* Trackpad — subtle indent */}
        <div
          style={{
            position: "absolute",
            bottom: size === "modal" ? 2 : 1,
            left: "50%",
            transform: "translateX(-50%)",
            width: trackpadW,
            height: trackpadH,
            borderRadius: size === "modal" ? 2 : 1.5,
            background: "rgba(0,0,0,0.06)",
            border: "1px solid rgba(0,0,0,0.05)",
          }}
        />
      </div>
    </div>
  );
}
