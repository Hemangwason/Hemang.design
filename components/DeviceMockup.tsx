import type { DeviceType } from "@/lib/projects";

interface Props {
  device: DeviceType;
  gradient: readonly [string, string];
  videoSrc?: string;
}

export default function DeviceMockup({ device, gradient, videoSrc }: Props) {
  return device === "phone" ? (
    <PhoneMockup gradient={gradient} videoSrc={videoSrc} />
  ) : (
    <LaptopMockup gradient={gradient} videoSrc={videoSrc} />
  );
}

function PhoneMockup({
  gradient,
  videoSrc,
}: {
  gradient: readonly [string, string];
  videoSrc?: string;
}) {
  return (
    <div
      style={{
        position: "relative",
        width: 120,
        height: 240,
        borderRadius: 30,
        background: "linear-gradient(160deg, #2c2c2e, #1c1c1e)",
        boxShadow:
          "0 0 0 1px rgba(255,255,255,0.12), 0 24px 64px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.1)",
        flexShrink: 0,
        overflow: "hidden",
      }}
    >
      {/* Bezel inset */}
      <div
        style={{
          position: "absolute",
          inset: 6,
          borderRadius: 24,
          overflow: "hidden",
          background: "#000",
        }}
      >
        {/* Screen content */}
        {videoSrc ? (
          <video
            src={videoSrc}
            autoPlay
            muted
            loop
            playsInline
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              background: `linear-gradient(160deg, ${gradient[0]}, ${gradient[1]})`,
              opacity: 0.7,
            }}
          />
        )}

        {/* Dynamic island */}
        <div
          style={{
            position: "absolute",
            top: 10,
            left: "50%",
            transform: "translateX(-50%)",
            width: 52,
            height: 14,
            borderRadius: 7,
            background: "#000",
            zIndex: 10,
          }}
        />

        {/* Home indicator */}
        <div
          style={{
            position: "absolute",
            bottom: 6,
            left: "50%",
            transform: "translateX(-50%)",
            width: 36,
            height: 4,
            borderRadius: 2,
            background: "rgba(255,255,255,0.3)",
            zIndex: 10,
          }}
        />
      </div>

      {/* Side button right */}
      <div
        style={{
          position: "absolute",
          right: -3,
          top: 72,
          width: 3,
          height: 36,
          borderRadius: "0 2px 2px 0",
          background: "rgba(255,255,255,0.15)",
        }}
      />
      {/* Volume buttons left */}
      {[44, 80].map((top) => (
        <div
          key={top}
          style={{
            position: "absolute",
            left: -3,
            top,
            width: 3,
            height: 28,
            borderRadius: "2px 0 0 2px",
            background: "rgba(255,255,255,0.12)",
          }}
        />
      ))}
    </div>
  );
}

function LaptopMockup({
  gradient,
  videoSrc,
}: {
  gradient: readonly [string, string];
  videoSrc?: string;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      {/* Screen lid */}
      <div
        style={{
          width: 256,
          height: 160,
          borderRadius: "10px 10px 0 0",
          background: "linear-gradient(160deg, #2c2c2e, #1c1c1e)",
          boxShadow:
            "0 0 0 1px rgba(255,255,255,0.1), 0 -8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Screen bezel */}
        <div
          style={{
            position: "absolute",
            inset: "8px 8px 4px",
            borderRadius: "4px 4px 2px 2px",
            overflow: "hidden",
            background: "#000",
          }}
        >
          {videoSrc ? (
            <video
              src={videoSrc}
              autoPlay
              muted
              loop
              playsInline
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                background: `linear-gradient(135deg, ${gradient[0]}, ${gradient[1]})`,
                opacity: 0.7,
              }}
            />
          )}
        </div>

        {/* Camera */}
        <div
          style={{
            position: "absolute",
            top: 4,
            left: "50%",
            transform: "translateX(-50%)",
            width: 5,
            height: 5,
            borderRadius: "50%",
            background: "#3a3a3c",
            zIndex: 10,
          }}
        />
      </div>

      {/* Hinge line */}
      <div
        style={{
          width: 256,
          height: 2,
          background: "rgba(255,255,255,0.06)",
        }}
      />

      {/* Keyboard base */}
      <div
        style={{
          width: 272,
          height: 10,
          borderRadius: "0 0 6px 6px",
          background: "linear-gradient(to bottom, #2a2a2c, #1c1c1e)",
          boxShadow: "0 6px 20px rgba(0,0,0,0.4)",
        }}
      />
    </div>
  );
}
