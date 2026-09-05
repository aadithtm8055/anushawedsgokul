import { useState, useEffect, useRef, useCallback } from "react";
import qrCode from "@/imports/url_qrcodecreator.com_16_25_24.png";
import envelopePhoto from "@/imports/Extravagant_Royal_Gujarati_Wedding_in_Ahmedabad___Anar___Dhrumil-1.jpe";
import galleryPhoto1 from "@/imports/Extravagant_Royal_Gujarati_Wedding_in_Ahmedabad___Anar___Dhrumil-2.jpe";
import galleryPhoto2 from "@/imports/_____________-2.jpe";
import galleryPhoto3 from "@/imports/download__4_-1.jpe";

// ─── Scroll-reveal hook ────────────────────────────────────────────────────
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("visible"); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}


// ─── Countdown hook ────────────────────────────────────────────────────────
const RECEPTION = new Date("2026-09-16T18:00:00");
function useCountdown() {
  const calc = () => {
    const d = Math.max(0, RECEPTION.getTime() - Date.now());
    return {
      days:  Math.floor(d / 86_400_000),
      hours: Math.floor((d % 86_400_000) / 3_600_000),
      mins:  Math.floor((d % 3_600_000)  /    60_000),
      secs:  Math.floor((d %    60_000)  /     1_000),
    };
  };
  const [t, setT] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
  }, []);
  return t;
}

// ─── SVG: Rose cluster (right-facing) ─────────────────────────────────────
const Rose = ({ cx = 0, cy = 0, r = 20, tint = "#8b1a2c" }) => (
  <g transform={`translate(${cx},${cy})`}>
    {[0, 55, 110, 165, 220, 275].map((a, i) => {
      const rad = (a * Math.PI) / 180;
      const rx2 = r * 0.65, ry2 = r * 0.45;
      return (
        <ellipse
          key={i}
          cx={Math.cos(rad) * r * 0.72}
          cy={Math.sin(rad) * r * 0.72}
          rx={rx2} ry={ry2}
          fill={tint}
          opacity={0.78 - i * 0.04}
          transform={`rotate(${a} ${Math.cos(rad) * r * 0.72} ${Math.sin(rad) * r * 0.72})`}
        />
      );
    })}
    <circle cx={0} cy={0} r={r * 0.42} fill={tint} opacity={0.92}/>
    <circle cx={0} cy={0} r={r * 0.22} fill={`color-mix(in srgb, ${tint} 70%, #2d0a12)`} opacity={0.95}/>
  </g>
);

const CreamFlower = ({ cx = 0, cy = 0, r = 10 }) => (
  <g transform={`translate(${cx},${cy})`}>
    {[0, 60, 120, 180, 240, 300].map((a, i) => {
      const rad = (a * Math.PI) / 180;
      return (
        <ellipse
          key={i}
          cx={Math.cos(rad) * r * 1.15}
          cy={Math.sin(rad) * r * 1.15}
          rx={r * 0.7} ry={r * 0.45}
          fill="#f0e6d2"
          opacity={0.88}
          transform={`rotate(${a} ${Math.cos(rad) * r * 1.15} ${Math.sin(rad) * r * 1.15})`}
        />
      );
    })}
    <circle cx={0} cy={0} r={r * 0.38} fill="#e8d8b8" opacity={0.95}/>
  </g>
);

const Leaf = ({ x1 = 0, y1 = 0, x2 = 40, y2 = -20 }) => {
  const mx = (x1 + x2) / 2 + (y2 - y1) * 0.3;
  const my = (y1 + y2) / 2 - (x2 - x1) * 0.3;
  return (
    <ellipse
      cx={(x1 + x2) / 2} cy={(y1 + y2) / 2}
      rx={Math.hypot(x2 - x1, y2 - y1) / 2}
      ry={Math.hypot(x2 - x1, y2 - y1) * 0.2}
      fill="#4a6030"
      opacity={0.38}
      transform={`rotate(${Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI} ${(x1+x2)/2} ${(y1+y2)/2})`}
    />
  );
};

// ─── Floral: Right side (for ceremony / schedule cards) ───────────────────
const FloralRight = ({ h = 360, className = "" }: { h?: number; className?: string }) => (
  <svg viewBox={`0 0 160 ${h}`} className={className} xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMaxYMid meet">
    {/* Main stem */}
    <path d={`M130 ${h} Q118 ${h*0.75} 108 ${h*0.55} Q95 ${h*0.38} 100 ${h*0.22} Q108 ${h*0.08} 112 0`}
      stroke="#8b6348" strokeWidth="1.8" fill="none" opacity="0.55"/>
    {/* Branch 1 */}
    <path d={`M110 ${h*0.6} Q80 ${h*0.54} 55 ${h*0.5}`} stroke="#8b6348" strokeWidth="1.2" fill="none" opacity="0.45"/>
    {/* Branch 2 */}
    <path d={`M105 ${h*0.38} Q75 ${h*0.32} 48 ${h*0.28}`} stroke="#8b6348" strokeWidth="1.2" fill="none" opacity="0.42"/>
    {/* Branch 3 */}
    <path d={`M108 ${h*0.18} Q82 ${h*0.12} 62 ${h*0.08}`} stroke="#8b6348" strokeWidth="1" fill="none" opacity="0.38"/>
    {/* Leaves */}
    <Leaf x1={110} y1={h*0.6} x2={70} y2={h*0.52}/>
    <Leaf x1={105} y1={h*0.38} x2={65} y2={h*0.30}/>
    <Leaf x1={108} y1={h*0.18} x2={75} y2={h*0.10}/>
    {/* Large rose 1 */}
    <Rose cx={52} cy={h*0.5} r={28} tint="#8b1a2c"/>
    {/* Large rose 2 */}
    <Rose cx={44} cy={h*0.28} r={22} tint="#7a1428"/>
    {/* Small rose bud */}
    <Rose cx={58} cy={h*0.08} r={14} tint="#6b1020"/>
    {/* Cream flowers */}
    <CreamFlower cx={90} cy={h*0.44} r={11}/>
    <CreamFlower cx={75} cy={h*0.22} r={9}/>
    {/* Berries */}
    <circle cx={40} cy={h*0.62} r={4} fill="#8b1a2c" opacity={0.7}/>
    <circle cx={33} cy={h*0.58} r={3} fill="#8b1a2c" opacity={0.6}/>
    <circle cx={46} cy={h*0.57} r={2.5} fill="#8b1a2c" opacity={0.55}/>
    {/* Dried branch */}
    <path d={`M120 ${h*0.82} Q148 ${h*0.78} 158 ${h*0.88}`} stroke="#a08060" strokeWidth="1" fill="none" opacity="0.38"/>
    <path d={`M138 ${h*0.79} Q145 ${h*0.72} 152 ${h*0.75}`} stroke="#a08060" strokeWidth="0.8" fill="none" opacity="0.32"/>
  </svg>
);

// ─── Floral: Left side (mirror) ───────────────────────────────────────────
const FloralLeft = ({ h = 360, className = "" }: { h?: number; className?: string }) => (
  <svg viewBox={`0 0 160 ${h}`} className={className} style={{ transform: "scaleX(-1)" }}
    xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMaxYMid meet">
    <path d={`M130 ${h} Q118 ${h*0.75} 108 ${h*0.55} Q95 ${h*0.38} 100 ${h*0.22} Q108 ${h*0.08} 112 0`}
      stroke="#8b6348" strokeWidth="1.8" fill="none" opacity="0.55"/>
    <path d={`M110 ${h*0.6} Q80 ${h*0.54} 55 ${h*0.5}`} stroke="#8b6348" strokeWidth="1.2" fill="none" opacity="0.45"/>
    <path d={`M105 ${h*0.38} Q75 ${h*0.32} 48 ${h*0.28}`} stroke="#8b6348" strokeWidth="1.2" fill="none" opacity="0.42"/>
    <path d={`M108 ${h*0.18} Q82 ${h*0.12} 62 ${h*0.08}`} stroke="#8b6348" strokeWidth="1" fill="none" opacity="0.38"/>
    <Leaf x1={110} y1={h*0.6} x2={70} y2={h*0.52}/>
    <Leaf x1={105} y1={h*0.38} x2={65} y2={h*0.30}/>
    <Leaf x1={108} y1={h*0.18} x2={75} y2={h*0.10}/>
    <Rose cx={52} cy={h*0.5} r={28} tint="#8b1a2c"/>
    <Rose cx={44} cy={h*0.28} r={22} tint="#7a1428"/>
    <Rose cx={58} cy={h*0.08} r={14} tint="#6b1020"/>
    <CreamFlower cx={90} cy={h*0.44} r={11}/>
    <CreamFlower cx={75} cy={h*0.22} r={9}/>
    <circle cx={40} cy={h*0.62} r={4} fill="#8b1a2c" opacity={0.7}/>
    <circle cx={33} cy={h*0.58} r={3} fill="#8b1a2c" opacity={0.6}/>
    <circle cx={46} cy={h*0.57} r={2.5} fill="#8b1a2c" opacity={0.55}/>
    <path d={`M120 ${h*0.82} Q148 ${h*0.78} 158 ${h*0.88}`} stroke="#a08060" strokeWidth="1" fill="none" opacity="0.38"/>
  </svg>
);

// ─── Small corner floral (for hero / guestbook) ───────────────────────────
const FloralCorner = ({ className = "", flip = false }: { className?: string; flip?: boolean }) => (
  <svg viewBox="0 0 130 180" className={className}
    style={flip ? { transform: "scaleX(-1)" } : undefined}
    xmlns="http://www.w3.org/2000/svg">
    <path d="M10 175 Q20 130 28 100 Q38 65 32 35 Q28 15 22 0" stroke="#8b6348" strokeWidth="1.5" fill="none" opacity="0.5"/>
    <path d="M22 120 Q50 108 70 112" stroke="#8b6348" strokeWidth="1" fill="none" opacity="0.4"/>
    <path d="M28 80 Q54 68 72 72" stroke="#8b6348" strokeWidth="1" fill="none" opacity="0.38"/>
    <path d="M26 48 Q48 38 64 42" stroke="#8b6348" strokeWidth="0.9" fill="none" opacity="0.35"/>
    <Rose cx={74} cy={112} r={22} tint="#8b1a2c"/>
    <Rose cx={70} cy={72} r={17} tint="#7a1428"/>
    <Rose cx={62} cy={42} r={12} tint="#6b1020"/>
    <CreamFlower cx={42} cy={98} r={10}/>
    <CreamFlower cx={36} cy={58} r={8}/>
    <Leaf x1={22} y1={120} x2={55} y2={108}/>
    <Leaf x1={28} y1={80} x2={58} y2={68}/>
    <circle cx={100} cy={115} r={4} fill="#8b1a2c" opacity={0.65}/>
    <circle cx={93} cy={110} r={3} fill="#8b1a2c" opacity={0.55}/>
    <path d="M8 148 Q30 140 48 155" stroke="#a08060" strokeWidth="0.9" fill="none" opacity="0.35"/>
  </svg>
);

// ─── Temple / Architectural background watermark ──────────────────────────
const Temple = () => (
  <svg viewBox="0 0 900 560" className="absolute inset-0 w-full h-full pointer-events-none"
    xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice"
    style={{ opacity: 0.048 }}>
    <g fill="#5a1828">
      {/* Gopuram tiers */}
      <polygon points="450,18 370,105 530,105"/>
      <polygon points="450,38 385,105 515,105"/>
      <polygon points="450,58 400,105 500,105"/>
      <polygon points="450,75 412,105 488,105"/>
      <rect x="370" y="105" width="160" height="340" rx="3"/>
      {/* Tier decorations */}
      {[130,165,200,235,270,305].map(y => (
        <rect key={y} x={355} y={y} width={190} height={14} rx="2"/>
      ))}
      {/* Arch windows */}
      <path d="M410 380 Q430 355 450 380" stroke="#5a1828" strokeWidth="3" fill="none"/>
      <path d="M450 380 Q470 355 490 380" stroke="#5a1828" strokeWidth="3" fill="none"/>
      {/* Columns */}
      {[350,375,400,500,525,550].map(x => (
        <rect key={x} x={x} y={340} width={10} height={105} rx="3"/>
      ))}
      {/* Side towers */}
      <rect x="220" y="195" width="90" height="250" rx="3"/>
      <polygon points="265,140 220,195 310,195"/>
      <polygon points="265,160 230,195 300,195"/>
      {[220,250,280].map(y => <rect key={y} x={212} y={y} width={106} height={11} rx="1.5"/>)}
      <rect x="590" y="195" width="90" height="250" rx="3"/>
      <polygon points="635,140 590,195 680,195"/>
      <polygon points="635,160 600,195 670,195"/>
      {[220,250,280].map(y => <rect key={y} x={582} y={y} width={106} height={11} rx="1.5"/>)}
      {/* Base platform */}
      <rect x="170" y="435" width="560" height="10" rx="2"/>
      <rect x="140" y="445" width="620" height="14" rx="3"/>
      {/* Finial */}
      <circle cx="450" cy="30" r="14"/>
      <circle cx="450" cy="30" r="8" fill="#f0e8d6"/>
      {/* Lotus motifs along base */}
      {[220,310,400,500,590,680].map(x => (
        <g key={x} transform={`translate(${x},480)`}>
          <circle cx="0" cy="0" r="5"/>
          {[0,45,90,135,180,225,270,315].map((a,j) => (
            <ellipse key={j} cx={Math.cos(a*Math.PI/180)*11} cy={Math.sin(a*Math.PI/180)*11}
              rx="5.5" ry="2.8" opacity="0.7"
              transform={`rotate(${a} ${Math.cos(a*Math.PI/180)*11} ${Math.sin(a*Math.PI/180)*11})`}/>
          ))}
        </g>
      ))}
      {/* Decorative arch border at top */}
      <path d="M0 22 Q90 8 180 22 Q270 36 360 22 Q450 8 540 22 Q630 36 720 22 Q810 8 900 22"
        stroke="#5a1828" strokeWidth="2.5" fill="none" opacity="0.8"/>
    </g>
  </svg>
);

// ─── Wax seal ─────────────────────────────────────────────────────────────
const WaxSeal = () => (
  <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    {/* Outer ring with serrated edge */}
    {Array.from({ length: 24 }, (_, i) => {
      const a = (i / 24) * Math.PI * 2;
      const r1 = 30, r2 = 28;
      return <line key={i}
        x1={32 + Math.cos(a) * r1} y1={32 + Math.sin(a) * r1}
        x2={32 + Math.cos(a) * r2} y2={32 + Math.sin(a) * r2}
        stroke="#b89040" strokeWidth="1.2" opacity="0.8"/>;
    })}
    <circle cx="32" cy="32" r="27" fill="#c9a84c"/>
    <circle cx="32" cy="32" r="23" fill="#b89040"/>
    <circle cx="32" cy="32" r="20" fill="#c9a84c" opacity="0.75"/>
    {/* Inner monogram */}
    <text x="32" y="29" textAnchor="middle" fontFamily="Cinzel, serif" fontSize="9" fontWeight="600" fill="#5a1828" opacity="0.9">A &amp; G</text>
    <text x="32" y="40" textAnchor="middle" fontFamily="Cinzel, serif" fontSize="7" fontWeight="400" fill="#5a1828" opacity="0.7">2026</text>
  </svg>
);

// ─── Mini September 2026 calendar ─────────────────────────────────────────
const MiniCalendar = () => {
  const days = ["S","M","T","W","T","F","S"];
  const START = 2; // Sep 1, 2026 = Tuesday
  const TOTAL = 30;
  const cells: (number | null)[] = [];
  for (let i = 0; i < START; i++) cells.push(null);
  for (let d = 1; d <= TOTAL; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <div className="rounded-xl overflow-hidden" style={{ background: "rgba(0,0,0,0.18)", border: "1px solid rgba(255,255,255,0.1)" }}>
      <div className="py-2 text-center" style={{ background: "rgba(0,0,0,0.2)" }}>
        <span className="font-cinzel tracking-widest" style={{ color: "#c9a84c", fontSize: "11px" }}>September 2026</span>
      </div>
      <div className="px-3 pb-3 pt-2">
        <div className="grid grid-cols-7 mb-1">
          {days.map((d, i) => (
            <div key={i} className="text-center font-cinzel py-0.5" style={{ color: "#c9a84c", fontSize: "9px" }}>{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-y-0.5">
          {cells.map((d, i) => (
            <div key={i} className="flex items-center justify-center py-0.5">
              {d === 16 ? (
                <span className="cal-cell-highlight">{d}</span>
              ) : d === 17 ? (
                <span style={{ color: "#c9a84c", fontSize: "11px", fontWeight: 500 }}>{d}</span>
              ) : (
                <span style={{ color: d ? "rgba(245,237,224,0.65)" : "transparent", fontSize: "11px" }}>{d ?? "·"}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── Static Map ────────────────────────────────────────────────────────────
const StaticMap = () => (
  <div className="relative w-full" style={{ height: 340 }}>
    <svg viewBox="0 0 560 340" className="absolute inset-0 w-full h-full"
      xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      {/* Base */}
      <rect width="560" height="340" fill="#ede5cf"/>
      {/* Parks */}
      <rect x="30"  y="60"  width="100" height="70"  rx="5" fill="#ccd8a8" opacity="0.75"/>
      <rect x="380" y="185" width="110" height="85"  rx="5" fill="#ccd8a8" opacity="0.75"/>
      <rect x="240" y="40"  width="70"  height="50"  rx="4" fill="#ccd8a8" opacity="0.65"/>
      {/* Main roads */}
      <rect x="0"   y="148" width="560" height="18" fill="#f0e8d4"/>
      <rect x="0"   y="242" width="560" height="14" fill="#f0e8d4"/>
      <rect x="138" y="0"   width="18"  height="340" fill="#f0e8d4"/>
      <rect x="282" y="0"   width="15"  height="340" fill="#f0e8d4"/>
      <rect x="418" y="0"   width="14"  height="340" fill="#f0e8d4"/>
      {/* Secondary roads */}
      <rect x="0" y="75"  width="560" height="8" fill="#e8e0ca" opacity="0.9"/>
      <rect x="0" y="198" width="560" height="8" fill="#e8e0ca" opacity="0.9"/>
      <rect x="0" y="288" width="560" height="8" fill="#e8e0ca" opacity="0.9"/>
      <rect x="72"  y="0" width="8" height="340" fill="#e8e0ca" opacity="0.9"/>
      <rect x="210" y="0" width="8" height="340" fill="#e8e0ca" opacity="0.9"/>
      <rect x="352" y="0" width="8" height="340" fill="#e8e0ca" opacity="0.9"/>
      <rect x="494" y="0" width="8" height="340" fill="#e8e0ca" opacity="0.9"/>
      {/* Buildings */}
      {[
        [80,24,50,42],[160,24,65,42],[248,24,55,42],[310,24,88,42],[420,24,55,42],[488,24,55,42],
        [24,210,60,36],[80,210,50,36],[162,210,55,36],[300,210,70,36],[364,210,42,36],[432,210,65,36],[502,210,46,36],
        [24,260,60,24],[80,260,50,24],[162,260,55,24],[300,260,70,24],[432,260,65,24],[502,260,46,24],
        [24,88,45,55],[80,88,55,55],[162,88,60,55],[364,88,42,55],[432,88,65,55],[502,88,46,55],
      ].map(([x,y,w,h],i) => (
        <rect key={i} x={x} y={y} width={w} height={h} rx="2" fill="#d8ccb5" opacity="0.9"/>
      ))}
      {/* Highlighted venue block */}
      <rect x="254" y="110" width="100" height="62" rx="3" fill="#c8b090"/>
      <rect x="258" y="114" width="92"  height="54" rx="2" fill="#d4bc98"/>
      <text x="303" y="143" textAnchor="middle" fontFamily="Cinzel,serif" fontSize="8" fill="#5a1828" fontWeight="600">Marriage Hall</text>
      {/* Pin shadow */}
      <ellipse cx="303" cy="174" rx="9" ry="5" fill="rgba(90,24,40,0.22)"/>
      {/* Location pin */}
      <path d="M303 95 C291 95 281 105 281 117 C281 134 303 158 303 158 C303 158 325 134 325 117 C325 105 315 95 303 95Z" fill="#5a1828"/>
      <circle cx="303" cy="116" r="7" fill="white" opacity="0.92"/>
      {/* Map controls */}
      <rect x="522" y="16" width="28" height="28" rx="5" fill="white" opacity="0.92"/>
      <text x="536" y="34" textAnchor="middle" fontFamily="Arial" fontSize="17" fill="#5a1828" fontWeight="700">+</text>
      <rect x="522" y="48" width="28" height="28" rx="5" fill="white" opacity="0.92"/>
      <text x="536" y="66" textAnchor="middle" fontFamily="Arial" fontSize="17" fill="#5a1828" fontWeight="700">−</text>
      {/* Attribution bar */}
      <rect x="0" y="316" width="560" height="24" fill="rgba(255,255,255,0.72)"/>
      <text x="10" y="332" fontFamily="Arial" fontSize="9" fill="#777">© 2026 Map Data · Bengaluru, Karnataka, India</text>
    </svg>
    {/* Info card */}
    <div className="absolute top-3 left-3 rounded-xl shadow-lg p-3 max-w-[200px]"
      style={{ background: "white", border: "1px solid #ddd4c0" }}>
      <p className="font-cinzel font-semibold" style={{ color: "#5a1828", fontSize: "10.5px" }}>Bengaluru Marriage Hall</p>
      <p className="mt-0.5" style={{ color: "#666", fontSize: "9.5px", fontFamily: "Arial, sans-serif" }}>MRC 245, 5th Main Rd, Ulsoor</p>
      <p style={{ color: "#666", fontSize: "9.5px", fontFamily: "Arial, sans-serif" }}>Bengaluru, Karnataka 560008</p>
      <div className="flex items-center gap-0.5 mt-1">
        {"★★★★★".split("").map((s, i) => (
          <span key={i} style={{ color: "#c9a84c", fontSize: "10px" }}>{s}</span>
        ))}
        <span style={{ color: "#999", fontSize: "8.5px", marginLeft: 3 }}>(128)</span>
      </div>
    </div>
  </div>
);

// ─── Photos ────────────────────────────────────────────────────────────────
const PHOTOS = [
  { src: galleryPhoto1, alt: "Indian couple in traditional wedding attire" },
  { src: galleryPhoto3, alt: "Bride and groom posing in traditional attire" },
  { src: galleryPhoto2, alt: "Wedding couple in traditional Indian ceremony" },
];

// ─── Section wrapper with scroll reveal ───────────────────────────────────
const Reveal = ({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) => {
  const ref = useReveal();
  const cls = delay > 0 ? `reveal reveal-delay-${delay}` : "reveal";
  return <div ref={ref} className={`${cls} ${className}`}>{children}</div>;
};

// ─── Gold ornament divider ─────────────────────────────────────────────────
const GoldDivider = ({ color = "#c9a84c" }: { color?: string }) => (
  <div className="flex items-center justify-center gap-3" style={{ color }}>
    <div className="h-px flex-1 max-w-16" style={{ background: color, opacity: 0.4 }}/>
    <svg viewBox="0 0 24 12" className="w-6 h-3" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="6" r="3" fill="none" stroke={color} strokeWidth="1.2" opacity="0.7"/>
      <circle cx="12" cy="6" r="1.2" fill={color} opacity="0.6"/>
      <circle cx="4" cy="6" r="1.5" fill={color} opacity="0.4"/>
      <circle cx="20" cy="6" r="1.5" fill={color} opacity="0.4"/>
    </svg>
    <div className="h-px flex-1 max-w-16" style={{ background: color, opacity: 0.4 }}/>
  </div>
);

// ─── Section label ──────────────────────────────────────────────────────────
const SectionLabel = ({ children, color = "#5a1828" }: { children: React.ReactNode; color?: string }) => (
  <div className="flex items-center justify-center gap-3 mb-1">
    <div className="h-px w-10" style={{ background: color, opacity: 0.45 }}/>
    <p className="font-cinzel tracking-[0.32em] text-xs" style={{ color, fontSize: "10.5px" }}>{children}</p>
    <div className="h-px w-10" style={{ background: color, opacity: 0.45 }}/>
  </div>
);

// ─── Guestbook wish card ───────────────────────────────────────────────────
interface Wish { name: string; message: string }

// ══════════════════════════════════════════════════════════════════════════════
//  APP
// ══════════════════════════════════════════════════════════════════════════════
export default function App() {
  const [slide, setSlide]   = useState(0);
  const [name, setName]     = useState("");
  const [msg, setMsg]       = useState("");
  const [wishes, setWishes] = useState<Wish[]>([]);
  const countdown = useCountdown();

  const prev = useCallback(() => setSlide(s => (s + PHOTOS.length - 1) % PHOTOS.length), []);
  const next = useCallback(() => setSlide(s => (s + 1) % PHOTOS.length), []);

  const submitWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !msg.trim()) return;
    setWishes(w => [{ name: name.trim(), message: msg.trim() }, ...w]);
    setName(""); setMsg("");
  };

  const left  = (slide + PHOTOS.length - 1) % PHOTOS.length;
  const right = (slide + 1) % PHOTOS.length;
const [entered, setEntered] = useState(false);
const audioRef = useRef<HTMLAudioElement | null>(null);

const handleEnter = async () => {
  console.log("ENTER BUTTON CLICKED");

  try {
    if (audioRef.current) {
      console.log("AUDIO FOUND");
      audioRef.current.volume = 1.0;
      await audioRef.current.play();
      console.log("MUSIC STARTED");
    }

    setEntered(true);
  } catch (error) {
    console.log("MUSIC ERROR:", error);
    setEntered(true);
  }
};
  return (
    <div className="parchment-bg min-h-full relative" style={{ fontFamily: "'Lora', Georgia, serif", paddingRight: "2px" }}>
      <audio
  ref={audioRef}
  src="/wedding-music.mp3"
  loop
  preload="auto"
/>
{!entered && (
  <div className="fixed inset-0 z-[9999] parchment-bg min-h-screen flex flex-col items-center justify-center px-6 text-center">

    <p
      className="font-cinzel tracking-[0.22em]"
      style={{
        color: "#7a4a3a",
        fontSize: "13px",
        fontWeight: 700,
        marginBottom: "20px",
      }}
    >
      YOU ARE INVITED
    </p>

    <p
      className="font-lora"
      style={{
        fontSize: "2.8rem",
        color: "#2a1414",
        lineHeight: 1.1,
      }}
    >
      S. Anusha
    </p>

    <p
      className="font-display italic"
      style={{
        fontSize: "1.7rem",
        color: "#8b6040",
        margin: "8px 0",
      }}
    >
      &amp;
    </p>

    <p
      className="font-lora"
      style={{
        fontSize: "2.8rem",
        color: "#2a1414",
        lineHeight: 1.1,
      }}
    >
      G.Gokul Kumar
    </p>

    <button
      onClick={handleEnter}
      className="mt-12 px-8 py-4 rounded-full"
      style={{
        background: "#7a4a3a",
        color: "#fff",
        border: "none",
        fontFamily: "'Cinzel', serif",
        letterSpacing: "0.18em",
        fontSize: "12px",
        fontWeight: 700,
        cursor: "pointer",
        boxShadow: "0 6px 20px rgba(90,24,40,0.25)",
      }}
    >
      TAP TO ENTER
    </button>

  </div>
)}

      {/* ══ 1 ── HERO / SAVE THE DATE ════════════════════════════════════════ */}
      <section className="relative flex flex-col items-center pt-14 pb-16 px-5 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden"><Temple /></div>

        {/* Corner florals */}
        <FloralCorner className="absolute left-0 top-4 w-24 h-40 pointer-events-none" flip/>
        <FloralCorner className="absolute right-0 top-4 w-24 h-40 pointer-events-none"/>

        <div className="relative z-10 w-full flex flex-col items-center" style={{ maxWidth: 460 }}>

          {/* Label */}
          <Reveal>
            <SectionLabel>SAVE THE DATE</SectionLabel>
          </Reveal>

          {/* Envelope */}
          <div style={{ width: 431, marginTop: 0 }}>
          <Reveal delay={2} className="w-full flex justify-center items-center">
            <div className="relative" style={{ width: 280, height: 240 }}>
              {/* Photo emerging */}
              <div
                className="absolute z-20 overflow-hidden rounded-lg"
                style={{
                  width: 185, height: 148,
                  top: -36,
                  left: "50%",
                  transform: "translateX(-50%) rotate(-4deg)",
                  boxShadow: "0 10px 36px rgba(90,24,40,0.40), 0 2px 8px rgba(0,0,0,0.15)",
                  border: "3px solid rgba(255,255,255,0.5)",
                  borderRadius: "6px",
                }}
              >
                <img
                  src={envelopePhoto}
                  alt="Wedding couple in traditional Indian attire"
                  className="w-full h-full object-cover"
                />
                {/* Photo overlay vignette */}
                <div className="absolute inset-0" style={{ background: "linear-gradient(180deg,transparent 60%,rgba(90,24,40,0.1))" }}/>
              </div>

              {/* Envelope body */}
              <div className="envelope-body absolute bottom-0 left-0 right-0 rounded-b-xl"
                style={{
                  height: 196,
                  boxShadow: "0 14px 48px rgba(90,24,40,0.45), 0 4px 12px rgba(0,0,0,0.2)",
                }}>
                {/* Flap */}
                <div className="envelope-flap" style={{ height: 106 }}/>
                <div className="envelope-flap-shadow" style={{ height: 106 }}/>
                {/* Side folds */}
                <div className="envelope-bottom-left"/>
                <div className="envelope-bottom-right"/>
                {/* Wax seal */}
                <div className="absolute z-30 w-14 h-14" style={{ bottom: 22, left: "50%", transform: "translateX(-50%)" }}>
                  <WaxSeal />
                </div>
                {/* Subtle envelope lines */}
                <svg viewBox="0 0 280 196" className="absolute inset-0 w-full h-full pointer-events-none">
                  <line x1="0" y1="196" x2="140" y2="98" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
                  <line x1="280" y1="196" x2="140" y2="98" stroke="rgba(255,255,255,0.06)" strokeWidth="1"/>
                </svg>
              </div>
            </div>
          </Reveal>
          </div>

          {/* Names */}
          <Reveal delay={3} className="mt-10 text-center">
            <p className="font-lora leading-tight" style={{ fontSize: "clamp(2.1rem,9vw,2.9rem)", color: "#2a1414" }}>
              S. Anusha
            </p>
            <p className="font-display italic" style={{ fontSize: "1.6rem", color: "#8b6040" }}>&amp;</p>
            <p className="font-lora leading-tight" style={{ fontSize: "clamp(2.1rem,9vw,2.9rem)", color: "#2a1414" }}>
              G.Gokul Kumar
            </p>
          </Reveal>

          <Reveal delay={4} className="mt-6">
            <GoldDivider color="#8b6040"/>
          </Reveal>

          <Reveal delay={5} className="mt-4">
            <p className="font-cinzel tracking-[0.22em] text-center" style={{ color: "#7a4a3a", fontSize: "15px", fontWeight: 700 }}>
              17 SEPTEMBER 2026 · THURSDAY
            </p>
          </Reveal>
        </div>
      </section>

      {/* ══ 2 ── CEREMONY INFO ═══════════════════════════════════════════════ */}
      <section className="pb-14" style={{ paddingLeft: 30, paddingRight: 30 }}>
        <Reveal className="w-full">
          <div className="card-burgundy rounded-2xl relative overflow-hidden"
  style={{ boxShadow: "0 20px 64px rgba(90,24,40,0.38), 0 4px 16px rgba(0,0,0,0.2)" }}>

            {/* Floral right */}
            <div className="absolute right-0 top-0 bottom-0 w-32 pointer-events-none z-10 hidden sm:block">
              <FloralRight h={500} className="absolute right-0 top-0 h-full w-32"/>
            </div>
            {/* Mobile floral (top-right corner) */}
            <div className="absolute right-0 top-0 w-24 h-36 pointer-events-none z-10 sm:hidden">
              <FloralCorner className="w-24 h-36 opacity-80"/>
            </div>

            <div className="relative z-20 px-7 py-10">

              {/* Card label */}
              <div className="text-center mb-8">
                <div className="flex flex-col items-center justify-center gap-3" style={{ marginTop: 0, marginBottom: 4, padding: 0 }}>
                  <div className="h-px w-10" style={{ background: "#c9a84c", opacity: 0.45 }}/>
                  <p className="font-cinzel tracking-[0.32em]" style={{ color: "#c9a84c", fontSize: "16px", fontWeight: 900 }}>CEREMONY INFO</p>
                  <div className="h-px w-10" style={{ background: "#c9a84c", opacity: 0.45 }}/>
                </div>
                <div className="mt-3"><GoldDivider color="#c9a84c"/></div>
              </div>

              {/* Family columns */}
              <div className="flex w-full gap-6 mb-8 text-center">
                <div className="flex-1">
                  <p className="font-cinzel tracking-wider mb-2" style={{ color: "#c9a84c", fontSize: "13px", fontWeight: 700 }}>THE BRIDE FAMILY</p>
                  <p className="font-lora leading-relaxed" style={{ color: "rgba(245,237,224,0.85)", fontSize: "14px", fontWeight: 700 }}>
                    D/o Late Mr. A. N. SAKTHIVEL<br/>&amp; MRS. S. HEMALATHA
                  </p>
                </div>
                <div className="w-px self-stretch" style={{ background: "rgba(201,168,76,0.3)" }}/>
                <div className="flex-1">
                  <p className="font-cinzel tracking-wider mb-2" style={{ color: "#c9a84c", fontSize: "13px", fontWeight: 700 }}>THE GROOM FAMILY</p>
                  <p className="font-lora leading-relaxed" style={{ color: "rgba(245,237,224,0.85)", fontSize: "14px", fontWeight: 700 }}>
                    S/o MR. K. S. GANESHAN<br/>&amp; MRS. G. SUDHA
                  </p>
                </div>
              </div>

              <div className="w-full h-px mb-8" style={{ background: "rgba(201,168,76,0.2)" }}/>

              {/* Invitation text */}
              <div className="text-center space-y-2 mb-7">
                <p className="font-cinzel tracking-[0.18em]" style={{ color: "rgba(245,237,224,0.7)", fontSize: "13px", fontWeight: 900 }}>WE HUMBLY REQUEST</p>
                <p className="font-cinzel tracking-[0.18em]" style={{ color: "rgba(245,237,224,0.7)", fontSize: "13px", fontWeight: 900 }}>THE HONOUR OF YOUR PRESENCE</p>
              </div>

              {/* Bride name */}
              <p className="font-display italic text-center mb-3"
                style={{ fontSize: "clamp(2.2rem,7vw,2.8rem)", color: "#f5ede0", lineHeight: 1.15 }}>
                S. Anusha
              </p>

              <div className="text-center mb-3">
                <GoldDivider color="#c9a84c"/>
              </div>

              <p className="font-display italic text-center" style={{ fontSize: "2.2rem", color: "#c9a84c" }}>&</p>

              <div className="text-center mb-3">
                <GoldDivider color="#c9a84c"/>
              </div>

              {/* Groom name */}
              <p className="font-display italic text-center mb-8"
                style={{ fontSize: "clamp(2.2rem,7vw,2.8rem)", color: "#f5ede0", lineHeight: 1.15 }}>
                G. Gokul Kumar
              </p>

              {/* Ceremony label */}
              <div className="text-center mb-4">
                <p className="font-cinzel tracking-[0.25em]" style={{ color: "#c9a84c", fontSize: "14px", fontWeight: 900 }}>WEDDING CEREMONY</p>
                <p className="font-cinzel mt-2" style={{ color: "rgba(245,237,224,0.65)", fontSize: "20px", fontWeight: 900 }}>AT 4:30 AM — THURSDAY</p>
              </div>

              {/* Date treatment */}
              <div className="flex items-center justify-center gap-6 mt-5">
                <span className="font-display"
                  style={{ fontSize: "70px", color: "#f5ede0", lineHeight: 1, fontWeight: 600 }}>
                  17
                </span>
                <div className="flex flex-col leading-none">
                  <span className="font-cinzel tracking-[0.18em]"
                    style={{ color: "#c9a84c", fontSize: "clamp(1rem,4vw,1.3rem)", fontWeight: 900 }}>September</span>
                  <span className="font-cinzel tracking-widest mt-2"
                    style={{ color: "rgba(245,237,224,0.65)", fontSize: "clamp(0.9rem,3.5vw,1.1rem)", fontWeight: 900 }}>2026</span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ══ 3 ── PHOTO GALLERY ═══════════════════════════════════════════════ */}
      <section className="relative py-14 px-2 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden"><Temple /></div>

        <div className="relative z-10 w-full">
          <Reveal className="text-center mb-12">
            <SectionLabel>togetherness</SectionLabel>
          </Reveal>

          {/* Carousel */}
          <Reveal delay={2}>
            <div className="flex items-center justify-center gap-3">
              {/* Prev btn */}
              <button onClick={prev} aria-label="Previous photo"
                className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center btn-burgundy"
                style={{ background: "#5a1828", color: "#f5ede0", border: "1.5px solid rgba(201,168,76,0.5)", boxShadow: "0 2px 10px rgba(90,24,40,0.35)" }}>
                <svg viewBox="0 0 20 20" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="13 4 7 10 13 16"/>
                </svg>
              </button>

              {/* Photos */}
              <div className="flex-1 flex items-end justify-center gap-3">
                {/* Left */}
                <div className="gallery-img flex-shrink-0 cursor-pointer rounded-xl overflow-hidden"
                  style={{
                    width: "clamp(88px,19vw,118px)",
                    height: "clamp(124px,27vw,168px)",
                    opacity: 0.6,
                    transform: "scale(0.86) rotate(-4deg) translateX(10px)",
                    transformOrigin: "bottom center",
                    boxShadow: "0 6px 22px rgba(90,24,40,0.28)",
                    background: "#c8b090",
                  }}
                  onClick={prev}>
                  <img src={PHOTOS[left].src} alt={PHOTOS[left].alt} className="w-full h-full object-cover"/>
                </div>

                {/* Center */}
                <div className="gallery-img flex-shrink-0 rounded-xl overflow-hidden relative z-10"
                  style={{
                    width: "clamp(155px,36vw,220px)",
                    height: "clamp(218px,50vw,308px)",
                    boxShadow: "0 18px 60px rgba(90,24,40,0.42), 0 0 0 2.5px rgba(201,168,76,0.42)",
                    background: "#c8b090",
                  }}>
                  <img src={PHOTOS[slide].src} alt={PHOTOS[slide].alt} className="w-full h-full object-cover"/>
                  {/* Frame accent */}
                  <div className="absolute inset-2 rounded-lg pointer-events-none"
                    style={{ border: "1px solid rgba(255,255,255,0.14)" }}/>
                </div>

                {/* Right */}
                <div className="gallery-img flex-shrink-0 cursor-pointer rounded-xl overflow-hidden"
                  style={{
                    width: "clamp(88px,19vw,118px)",
                    height: "clamp(124px,27vw,168px)",
                    opacity: 0.6,
                    transform: "scale(0.86) rotate(4deg) translateX(-10px)",
                    transformOrigin: "bottom center",
                    boxShadow: "0 6px 22px rgba(90,24,40,0.28)",
                    background: "#c8b090",
                  }}
                  onClick={next}>
                  <img src={PHOTOS[right].src} alt={PHOTOS[right].alt} className="w-full h-full object-cover"/>
                </div>
              </div>

              {/* Next btn */}
              <button onClick={next} aria-label="Next photo"
                className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center btn-burgundy"
                style={{ background: "#5a1828", color: "#f5ede0", border: "1.5px solid rgba(201,168,76,0.5)", boxShadow: "0 2px 10px rgba(90,24,40,0.35)" }}>
                <svg viewBox="0 0 20 20" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="7 4 13 10 7 16"/>
                </svg>
              </button>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {PHOTOS.map((_, i) => (
                <button key={i} onClick={() => setSlide(i)}
                  className="dot h-2"
                  style={{
                    width: i === slide ? 26 : 8,
                    background: i === slide ? "#5a1828" : "rgba(90,24,40,0.3)",
                  }}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ 4 ── RECEPTION INFO ══════════════════════════════════════════════ */}
      <section
  className="w-full flex justify-center"
  style={{
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 0,
    paddingBottom: 56,
  }}
>
        <Reveal className="w-full">
          <div
  className="card-burgundy rounded-2xl relative overflow-hidden w-full max-w-3xl mx-auto"
  style={{
    boxShadow:
      "0 20px 64px rgba(90,24,40,0.38), 0 4px 16px rgba(0,0,0,0.2)",
  }}
>

            {/* Floral LEFT */}
            <div className="absolute left-0 top-0 bottom-0 w-32 pointer-events-none z-10 hidden sm:block">
              <FloralLeft h={560} className="absolute left-0 top-0 h-full w-32"/>
            </div>
            {/* Mobile floral corner */}
            <div className="absolute left-0 top-0 w-24 h-36 pointer-events-none z-10 sm:hidden">
              <FloralCorner className="w-24 h-36 opacity-80" flip/>
            </div>

            <div className="relative z-20 px-7 py-10">
              {/* Heading */}
              <div className="text-center mb-7">
                <div className="flex items-center justify-center gap-3 mb-1">
                  <div className="h-px w-10" style={{ background: "#c9a84c", opacity: 0.45 }}/>
                  <p className="font-cinzel tracking-[0.32em]" style={{ color: "#c9a84c", fontSize: "20px", fontWeight: 700 }}>RECEPTION INFO</p>
                  <div className="h-px w-10" style={{ background: "#c9a84c", opacity: 0.45 }}/>
                </div>
                <div className="mt-3"><GoldDivider color="#c9a84c"/></div>
              </div>

              <div className="text-center space-y-5">
                <p className="font-cinzel tracking-[0.14em]" style={{ color: "rgba(245,237,224,0.62)", fontSize: "13px", fontWeight: 900 }}>
                  THE RECEPTION WILL TAKE PLACE AT:
                </p>

                {/* Day */}
                <div>
                  <p className="font-cinzel tracking-[0.22em]" style={{ color: "rgba(245,237,224,0.55)", fontSize: "13px", fontWeight: 900 }}>WEDNESDAY</p>
                  <p className="font-cinzel" style={{ color: "#c9a84c", fontSize: "12px" }}></p>
                </div>

                {/* Big date */}
                <div className="flex items-center justify-center gap-5">
                  <span className="font-display"
                    style={{ fontSize: "clamp(3.8rem,13vw,5.5rem)", color: "#f5ede0", lineHeight: 1, fontWeight: 500 }}>
                    16
                  </span>
                  <div className="h-14 w-px" style={{ background: "rgba(201,168,76,0.4)" }}/>
                  <div className="flex flex-col leading-none text-left">
                    <span className="font-cinzel tracking-[0.16em]"
                      style={{ color: "#c9a84c", fontSize: "clamp(0.8rem,3.5vw,1.1rem)", fontWeight: 800 }}>SEPTEMBER</span>
                    <span className="font-cinzel tracking-widest mt-1.5"
                      style={{ color: "rgba(245,237,224,0.65)", fontSize: "clamp(0.75rem,3vw,0.95rem)", fontWeight: 800 }}>2026</span>
                  </div>
                </div>

                {/* Times */}
                <div className="flex items-center justify-center gap-8">
                  <div className="text-center">
                    <p className="font-cinzel tracking-wider" style={{ color: "#c9a84c", fontSize: "13px" }}>WELCOME</p>
                    <p className="font-lora mt-0.5" style={{ color: "#f5ede0", fontSize: "18px" }}>5:00 PM</p>
                  </div>
                  <div className="h-9 w-px" style={{ background: "rgba(201,168,76,0.3)" }}/>
                  <div className="text-center">
                    <p className="font-cinzel tracking-wider" style={{ color: "#c9a84c", fontSize: "13px" }}>RECEPTION</p>
                    <p className="font-lora mt-0.5" style={{ color: "#f5ede0", fontSize: "18px" }}>6:00 PM</p>
                  </div>
                </div>

                <div className="h-px" style={{ background: "rgba(201,168,76,0.18)" }}/>

                {/* Countdown */}
                <div>
                  <p className="font-cinzel tracking-[0.28em] mb-4" style={{ color: "#c9a84c", fontSize: "13px" }}>Countdown</p>
                  <div className="flex items-start justify-center gap-5 flex-wrap">
                    {[
                      { v: countdown.days, l: "days" },
                      { v: countdown.hours, l: "hours" },
                      { v: countdown.mins, l: "min" },
                      { v: countdown.secs, l: "sec" },
                    ].map(({ v, l }, i) => (
                      <div key={l} className="text-center min-w-12">
                        <span className="font-display block"
                          style={{ fontSize: "clamp(1.7rem,6.5vw,2.3rem)", color: "#f5ede0", lineHeight: 1, fontWeight: 500 }}>
                          {String(v).padStart(2, "0")}
                        </span>
                        <p className="font-cinzel mt-1" style={{ color: "rgba(245,237,224,0.5)", fontSize: "12px" }}>{l}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Calendar */}
                <div className="mx-auto max-w-xs">
                  <MiniCalendar />
                </div>

                {/* Add to Calendar */}
                <button
                  className="font-cinzel tracking-[0.22em] text-xs px-9 py-3 rounded-full btn-gold"
                  style={{ background: "rgba(201,168,76,0.16)", color: "#c9a84c", border: "1px solid rgba(201,168,76,0.48)", fontSize: "10px" }}>
                  Add to Calendar
                </button>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ══ 5 ── VENUE ═══════════════════════════════════════════════════════ */}
      <section className="relative py-12 px-2">
        <div className="absolute inset-0 overflow-hidden"><Temple /></div>

        <div className="relative z-10 w-full">
          <Reveal className="text-center mb-7">
            <div className="flex items-center justify-center gap-3 mb-1">
              <div className="h-px w-10" style={{ background: "#5a1828", opacity: 0.45 }}/>
              <p className="font-cinzel tracking-[0.32em]" style={{ color: "#5a1828", fontSize: "20px", fontWeight: 900 }}>WEDDING RECEPTION VENUE</p>
              <div className="h-px w-10" style={{ background: "#5a1828", opacity: 0.45 }}/>
            </div>
            <p className="font-lora italic mt-2" style={{ color: "#7a4a3a", fontSize: "25px", fontWeight: 900 }}>
              Sree Senkaliyar Thirumana Mandapam, Sooripalayam, Thekkalur
            </p>
          </Reveal>

          <Reveal delay={2}>
            <div className="rounded-2xl overflow-hidden"
              style={{
                border: "2px solid rgba(90,24,40,0.2)",
                boxShadow: "0 12px 40px rgba(90,24,40,0.22)",
              }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1116.5865734742038!2d77.20747066053517!3d11.16816800182055!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba9039e5eb349d9%3A0x16a3b84d95ede7d6!2sSengalirayar%20Marriage%20Hall!5e1!3m2!1sen!2sin!4v1788536374088!5m2!1sen!2sin"
                width="100%"
                height="320"
                style={{ border: 0, display: "block" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                title="Sengalirayar Marriage Hall location"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ 6 ── RECEPTION DAY SCHEDULE ═════════════════════════════════════ */}
      <section className="py-14" style={{ paddingLeft: 30, paddingRight: 30 }}>
        <Reveal className="w-full">
          <div className="card-burgundy rounded-2xl relative overflow-hidden w-full max-w-3xl mx-auto"
            style={{ boxShadow: "0 20px 64px rgba(90,24,40,0.35), 0 4px 16px rgba(0,0,0,0.18)" }}>

            {/* Floral right */}
            <div className="absolute right-0 top-0 bottom-0 w-32 pointer-events-none z-10 hidden sm:block">
              <FloralRight h={360} className="absolute right-0 top-0 h-full w-32"/>
            </div>
            <div className="absolute right-0 top-0 w-24 h-32 pointer-events-none z-10 sm:hidden">
              <FloralCorner className="w-24 h-32 opacity-75"/>
            </div>

            <div className="relative z-20 px-10 py-12 sm:pr-40">
              {/* Heading */}
              <div className="text-center mb-10">
                <div className="flex items-center justify-center gap-3 mb-1">
                  <div className="h-px w-10" style={{ background: "#c9a84c", opacity: 0.45 }}/>
                  <p className="font-cinzel tracking-[0.32em]" style={{ color: "#c9a84c", fontSize: "15px", fontWeight: 900 }}>RECEPTION DAY SCHEDULE</p>
                  <div className="h-px w-10" style={{ background: "#c9a84c", opacity: 0.45 }}/>
                </div>
                <div className="mt-3"><GoldDivider color="#c9a84c"/></div>
              </div>

              {/* Timeline */}
              <div className="flex flex-col items-center justify-center w-full">
                {/* Event 1 */}
                <div className="flex items-center justify-center gap-6 w-full">
                  <div className="flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(201,168,76,0.14)", border: "1.5px solid rgba(201,168,76,0.5)" }}>
                    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="#c9a84c" strokeWidth="1.6">
                      <circle cx="12" cy="12" r="7"/>
                      <circle cx="12" cy="12" r="3.5"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-cinzel tracking-wider" style={{ color: "#c9a84c", fontSize: "13px" }}>9:15 AM</p>
                    <p className="font-lora" style={{ color: "#f5ede0", fontSize: "1.6rem" }}>Engagement</p>
                  </div>
                </div>

                {/* Connector */}
                <div style={{ marginLeft: 0, marginTop: 6, marginBottom: 6 }}>
                  <div className="w-px h-10" style={{ background: "rgba(201,168,76,0.22)" }}/>
                </div>

                {/* Event 2 */}
                <div className="flex items-center justify-center gap-6 w-full">
                  <div className="flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(201,168,76,0.14)", border: "1.5px solid rgba(201,168,76,0.5)" }}>
                    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="#c9a84c" opacity={0.88}>
                      <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
                    </svg>
                  </div>
                  <div>
                    <p className="font-cinzel tracking-wider" style={{ color: "#c9a84c", fontSize: "13px" }}>6:00 PM</p>
                    <p className="font-lora" style={{ color: "#f5ede0", fontSize: "1.6rem" }}>Reception</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </section>


      {/* ══ 7 ── GUESTBOOK ═══════════════════════════════════════════════════ */}
      <section className="relative py-14 pb-20" style={{ paddingLeft: 30, paddingRight: 30 }}>
        <div className="absolute inset-0 overflow-hidden"><Temple /></div>

        <div className="relative z-10 w-full">
          <Reveal>
            <div className="relative rounded-2xl overflow-hidden"
              style={{
                background: "linear-gradient(155deg, #faf5ec 0%, #f2e8d4 100%)",
                boxShadow: "0 24px 80px rgba(90,24,40,0.22), 0 4px 18px rgba(90,24,40,0.12)",
                border: "1px solid rgba(201,168,76,0.32)",
              }}>

              {/* Bottom-left floral decoration */}
              <div className="absolute bottom-0 left-0 w-40 h-52 pointer-events-none z-0">
                <FloralCorner className="w-40 h-52 opacity-30" flip/>
              </div>

              <div className="relative z-10 px-7 py-10">
                {/* Ornament header */}
                <div className="text-center mb-8">
                  <svg viewBox="0 0 140 28" className="w-28 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg">
                    <line x1="0" y1="14" x2="54" y2="14" stroke="#c9a84c" strokeWidth="0.9" opacity="0.5"/>
                    <circle cx="70" cy="14" r="5.5" fill="none" stroke="#c9a84c" strokeWidth="1.2" opacity="0.75"/>
                    <circle cx="70" cy="14" r="2.2" fill="#c9a84c" opacity="0.65"/>
                    <line x1="86" y1="14" x2="140" y2="14" stroke="#c9a84c" strokeWidth="0.9" opacity="0.5"/>
                    <circle cx="24" cy="14" r="2" fill="none" stroke="#c9a84c" strokeWidth="1" opacity="0.45"/>
                    <circle cx="116" cy="14" r="2" fill="none" stroke="#c9a84c" strokeWidth="1" opacity="0.45"/>
                  </svg>
                  <div style={{ fontWeight: 900 }}><SectionLabel>GUESTBOOK</SectionLabel></div>
                  <div className="mt-3 mb-1"><GoldDivider color="#8b6040"/></div>
                </div>

                <form onSubmit={submitWish} className="space-y-4">
                  <textarea
                    placeholder="Enter your wishes"
                    value={msg}
                    onChange={e => setMsg(e.target.value)}
                    rows={5}
                    className="wedding-input resize-none"
                  />
                  <div className="flex justify-center pt-1">
                    <button type="submit"
                      className="font-cinzel tracking-[0.28em] text-xs px-11 py-3.5 rounded-full btn-burgundy"
                      style={{ background: "#5a1828", color: "#f5ede0", boxShadow: "0 5px 20px rgba(90,24,40,0.38)", fontSize: "10.5px" }}>
                      SEND WISHES
                    </button>
                  </div>
                </form>

                {/* Blessing text */}
                <p className="font-lora italic text-center mt-8"
                  style={{ color: "#8b6040", fontSize: "13px", fontWeight: 700 }}>
                  We wish you joy, love &amp; blessings
                </p>

                {/* Submitted wishes */}
                {wishes.length > 0 && (
                  <div className="mt-8 space-y-4">
                    <div className="h-px" style={{ background: "rgba(90,24,40,0.14)" }}/>
                    {wishes.map((w, i) => (
                      <div key={i} className="rounded-xl p-4"
                        style={{ background: "rgba(90,24,40,0.05)", border: "1px solid rgba(90,24,40,0.1)" }}>
                        <p className="font-cinzel tracking-wider mb-1" style={{ color: "#5a1828", fontSize: "9.5px" }}>
                          {w.name}
                        </p>
                        <p className="font-lora italic text-sm" style={{ color: "#5c3030" }}>"{w.message}"</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ Footer ═══════════════════════════════════════════════════════════ */}
      <footer className="text-center py-12" style={{ background: "#3d0e1c" }}>
        <div className="max-w-lg mx-auto px-6">
          <p className="font-display italic" style={{ color: "rgba(245,237,224,0.7)", fontSize: "20px", fontWeight: 900 }}>
            S. Anusha &amp; G. Gokul Kumar
          </p>
          <p className="font-cinzel tracking-widest mt-2" style={{ color: "rgba(201,168,76,0.55)", fontSize: "9px", fontWeight: 700 }}>
            17 sep 2026 · CEREMONY &nbsp;·&nbsp; 16 SEP 2026 · RECEPTION
          </p>
          <div className="flex justify-center mt-5">
            <GoldDivider color="rgba(201,168,76,0.45)"/>
          </div>
          <p className="font-lora italic mt-4" style={{ color: "rgba(245,237,224,0.28)", fontSize: "11px", fontWeight: 700 }}>
            With love &amp; blessings
          </p>
        </div>
      </footer>
    </div>
  );
}
