"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const QUOTES = [
  {
    headline: "Drake started as an actor on a Canadian teen show.",
    sub: "Degrassi to global superstar. Your early work doesn't have to be your best work.",
  },
  {
    headline: "Frank Ocean took 4 years to drop Blonde.",
    sub: "Nobody complained once they heard it. Sometimes the wait is the promise.",
  },
  {
    headline: "Kanye described himself as 'the greatest living artist.'",
    sub: "That's a creative brief with no client feedback. Honestly, respect.",
  },
  {
    headline: "Dieter Rams wrote 10 design principles in 1978.",
    sub: "Figma now has 400 plugins that all claim to do the same thing.",
  },
  {
    headline: "Paul Rand showed Steve Jobs exactly one logo concept.",
    sub: "'Take it or leave it.' Jobs took it. Confidence is a design tool.",
  },
  {
    headline: "Milton Glaser made I ♥ NY for $2,000.",
    sub: "It became the most recognized logo on earth. Budget and brilliance are unrelated.",
  },
  {
    headline: "Pharrell was 40 years old when he made 'Happy.'",
    sub: "Best case scenario: you haven't even peaked yet.",
  },
  {
    headline: "Virgil Abloh put quote marks around everything. 'Chair.' 'Jacket.' 'Shoelaces.'",
    sub: "Questioning the obvious is a legitimate design strategy. Or he was just vibing.",
  },
  {
    headline: "Tyler the Creator art directs everything himself.",
    sub: "The logo, the campaign, the fit, the record. A clear point of view is defensible.",
  },
  {
    headline: "Someone invented Comic Sans and still hasn't apologized.",
    sub: "The healing continues. This site uses Poppins. You're safe here.",
  },
  {
    headline: "A product manager once asked for 'something that pops but also feels calm.'",
    sub: "This is that thing. Allegedly.",
  },
  {
    headline: "Kendrick Lamar won a Pulitzer Prize. For rap.",
    sub: "The award committee had no idea what to do with themselves. Good.",
  },
  {
    headline: "Steve Jobs wore the same outfit every day to avoid decision fatigue.",
    sub: "That's a design system for a human. The man was always on brand.",
  },
  {
    headline: "Billie Eilish recorded her debut album in a bedroom closet.",
    sub: "Your excuses about the setup are officially retired.",
  },
];

export default function Loader() {
  const [visible, setVisible] = useState(true);
  const [quote, setQuote] = useState(QUOTES[0]);

  useEffect(() => {
    setQuote(QUOTES[Math.floor(Math.random() * QUOTES.length)]);
    const t = setTimeout(() => setVisible(false), 2400);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "#f0ece6",
            overflow: "hidden",
          }}
        >
          {/* Ambient warm glow */}
          <div
            style={{
              position: "absolute",
              width: 600,
              height: 600,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(200,170,120,0.18) 0%, transparent 68%)",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              pointerEvents: "none",
            }}
          />

          {/* Wordmark */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{
              position: "absolute",
              top: 28,
              left: 32,
              fontSize: 11,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(26,25,23,0.28)",
              fontFamily: "inherit",
            }}
          >
            Jexlin
          </motion.p>

          {/* Center stack */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 36,
            }}
          >
            {/* Spinner */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
              style={{
                width: 30,
                height: 30,
                borderRadius: "50%",
                border: "1.5px solid rgba(26,25,23,0.10)",
                borderTopColor: "rgba(26,25,23,0.55)",
              }}
            />

            {/* Quote */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{ textAlign: "center", maxWidth: 460, padding: "0 28px" }}
            >
              <p
                className="font-poppins"
                style={{
                  fontSize: "clamp(1.05rem, 2.4vw, 1.45rem)",
                  fontWeight: 600,
                  color: "#1a1917",
                  letterSpacing: "-0.025em",
                  lineHeight: 1.35,
                  marginBottom: 12,
                }}
              >
                {quote.headline}
              </p>
              <p
                style={{
                  fontSize: 12,
                  color: "rgba(26,25,23,0.38)",
                  letterSpacing: "0.02em",
                  lineHeight: 1.6,
                }}
              >
                {quote.sub}
              </p>
            </motion.div>
          </div>

          {/* Progress bar */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 1.5,
              background: "rgba(26,25,23,0.06)",
            }}
          >
            <motion.div
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 2.4, ease: [0.4, 0, 0.6, 1] }}
              style={{
                height: "100%",
                background:
                  "linear-gradient(to right, rgba(26,25,23,0.15), rgba(26,25,23,0.5))",
                transformOrigin: "left",
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
