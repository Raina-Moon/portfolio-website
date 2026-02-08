import { useEffect, useState, type CSSProperties } from "react";

const SYNODIC_MONTH = 29.53058867;
const KNOWN_NEW_MOON_UTC = Date.UTC(2000, 0, 6, 18, 14, 0);

const getMoonPhaseName = (date: Date) => {
  const daysSinceKnown =
    (date.getTime() - KNOWN_NEW_MOON_UTC) / (1000 * 60 * 60 * 24);
  const phaseAge =
    (((daysSinceKnown % SYNODIC_MONTH) + SYNODIC_MONTH) % SYNODIC_MONTH);

  if (phaseAge < 1.84566) return "NEW MOON";
  if (phaseAge < 5.53699) return "WAXING CRESCENT";
  if (phaseAge < 9.22831) return "FIRST QUARTER";
  if (phaseAge < 12.91963) return "WAXING GIBBOUS";
  if (phaseAge < 16.61096) return "FULL MOON";
  if (phaseAge < 20.30228) return "WANING GIBBOUS";
  if (phaseAge < 23.99361) return "LAST QUARTER";
  if (phaseAge < 27.68493) return "WANING CRESCENT";
  return "NEW MOON";
};

const MoonPhaseBoard = ({ className = "" }: { className?: string }) => {
  const [displayText, setDisplayText] = useState("TODAY MOON: LOADING");

  useEffect(() => {
    const phase = getMoonPhaseName(new Date());
    setDisplayText(`TODAY MOON: ${phase}`);
  }, []);

  return (
    <div className={`moon-phase-board ${className}`.trim()} aria-live="polite">
      {displayText.split("").map((char, index) => (
        <span
          key={`${char}-${index}`}
          className="moon-phase-cell"
          style={{ "--cell-delay": `${index * 36}ms` } as CSSProperties}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </div>
  );
};

export default MoonPhaseBoard;
