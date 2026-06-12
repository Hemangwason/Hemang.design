import type { DeviceType } from "@/lib/projects";

interface Props {
  device: DeviceType;
  gradient: readonly [string, string];
  videoSrc?: string;
  size?: "card" | "modal";
}

export default function DeviceMockup({ device, gradient, videoSrc, size = "card" }: Props) {
  return device === "phone" ? (
    <PhoneMockup gradient={gradient} videoSrc={videoSrc} size={size} />
  ) : (
    <LaptopMockup gradient={gradient} videoSrc={videoSrc} size={size} />
  );
}

function PhoneMockup({
  gradient,
  videoSrc,
  size,
}: {
  gradient: readonly [string, string];
  videoSrc?: string;
  size: "card" | "modal";
}) {
  const w = size === "modal" ? 140 : 190;
  const h = size === "modal" ? 280 : 400;
  const radius = size === "modal" ? 30 : 40;
  const bezel = size === "modal" ? 5 : 7;
  const islandW = size === "modal" ? 52 : 70;
  const islandH = size === "modal" ? 14 : 18;

  return (
    <div
      style={{
        position: "relative",
        width: w,
        height: h,
        borderRadius: radius,
        background: "linear-gradient(160deg, #3a3a3c, #1c1c1e)",
        boxShadow:
          "0 0 0 1px rgba(255,255,255,0.14), 0 32px 80px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.12)",
        flexShrink: 0,
        overflow: "hidden",
      }}
    >
      {/* Screen inset */}
      <div
        style={{
          position: "absolute",
          inset: bezel,
          borderRadius: radius - bezel,
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
              background: `linear-gradient(160deg, ${gradient[0]}, ${gradient[1]})`,
              opacity: 0.65,
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
            bottom: 7,
            left: "50%",
            transform: "translateX(-50%)",
            width: w * 0.28,
            height: 4,
            borderRadius: 2,
            background: "rgba(255,255,255,0.28)",
            zIndex: 10,
          }}
        />
      </div>

      {/* Right power button */}
      <div
        style={{
          position: "absolute",
          right: -2,
          top: "28%",
          width: 3,
          height: 40,
          borderRadius: "0 2px 2px 0",
          background: "rgba(255,255,255,0.18)",
        }}
      />
      {/* Left volume buttons */}
      {["20%", "32%"].map((top) => (
        <div
          key={top}
          style={{
            position: "absolute",
            left: -2,
            top,
            width: 3,
            height: 30,
            borderRadius: "2px 0 0 2px",
            background: "rgba(255,255,255,0.14)",
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
}: {
  gradient: readonly [string, string];
  videoSrc?: string;
  size: "card" | "modal";
}) {
  const screenW = size === "modal" ? 260 : 330;
  const screenH = size === "modal" ? 164 : 208;
  const baseW = screenW + 24;
  const baseH = 12;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      {/* Screen lid */}
      <div
        style={{
          width: screenW,
          height: screenH,
          borderRadius: "12px 12px 0 0",
          background: "linear-gradient(160deg, #3a3a3c, #1c1c1e)",
          boxShadow:
            "0 0 0 1px rgba(255,255,255,0.12), 0 -12px 48px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.1)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Camera */}
        <div
          style={{
            position: "absolute",
            top: 6,
            left: "50%",
            transform: "translateX(-50%)",
            width: 5,
            height: 5,
            borderRadius: "50%",
            background: "#3a3a3c",
            zIndex: 10,
          }}
        />

        {/* Screen content */}
        <div
          style={{
            position: "absolute",
            top: 14,
            left: 8,
            right: 8,
            bottom: 6,
            borderRadius: "2px 2px 0 0",
            overflow: "hidden",
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
                opacity: 0.65,
              }}
            />
          )}
        </div>
      </div>

      {/* Hinge */}
      <div
        style={{
          width: screenW,
          height: 2,
          background: "rgba(255,255,255,0.05)",
        }}
      />

      {/* Keyboard base */}
      <div
        style={{
          width: baseW,
          height: baseH,
          borderRadius: "0 0 8px 8px",
          background: "linear-gradient(to bottom, #2c2c2e, #1c1c1e)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
        }}
      />
    </div>
  );
}
