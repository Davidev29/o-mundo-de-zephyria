import React, { useEffect, useRef } from "react";

export const EnhancedMenu: React.FC<{
  onStart: () => void;
  onConfig: () => void;
  onGallery: () => void;
  onCredits: () => void;
}> = ({ onStart, onConfig, onGallery, onCredits }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = window.innerWidth;
    let h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;

    const particles: { x: number; y: number; vx: number; vy: number; r: number; alpha: number; hue: number }[] = [];
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        r: 2 + Math.random() * 3,
        alpha: 0.4 + Math.random() * 0.6,
        hue: 30 + Math.random() * 40,
      });
    }

    let anim = 0;
    let frame = 0;
    function draw() {
      if (!ctx) return;
      ctx.fillStyle = "rgba(15, 10, 22, 0.35)";
      ctx.fillRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.beginPath();
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 3);
        g.addColorStop(0, `hsla(${p.hue}, 80%, 65%, ${p.alpha})`);
        g.addColorStop(1, "transparent");
        ctx.fillStyle = g;
        ctx.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2);
        ctx.fill();
      }
      anim += 0.005;
      frame++;
      requestAnimationFrame(draw);
    }
    draw();

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
    };
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh", overflow: "hidden", background: "radial-gradient(circle at 50% 30%, #3a2035 0%, #1a1025 60%, #0a0810 100%)", border: "2px solid #ffd799", color: "#f0e6d2", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
      <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }} />

      {/* Glowing title */}
      <header style={{ position: "absolute", top: "15vh", left: 0, right: 0, textAlign: "center", zIndex: 1 }}>
        <h1 style={{ fontSize: "clamp(3rem, 8vw, 7rem)", fontWeight: 800, letterSpacing: "0.05em", lineHeight: 1, margin: 0, textShadow: "0 0 60px rgba(255,215,150,0.4), 0 0 120px rgba(255,180,60,0.3)" }}>
          <span style={{ background: "linear-gradient(90deg, #ffd799, #ffb43c, #ffd799)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>ZEphyria</span>
        </h1>
        <p style={{ fontSize: "1.2rem", opacity: 0.7, marginTop: "1rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>O Mundo dos Cristais</p>
      </header>

      {/* Menu buttons */}
      <nav style={{ position: "absolute", top: "55vh", left: "50%", transform: "translateX(-50%)", zIndex: 1, display: "flex", flexDirection: "column", gap: "1.2rem", alignItems: "center" }}>
        {[
          { label: "Iniciar Jornada", action: onStart, big: true },
          { label: "Configurações", action: onConfig },
          { label: "Galeria", action: onGallery },
          { label: "Créditos", action: onCredits },
        ].map((btn) => (
          <button
            key={btn.label}
            onClick={btn.action}
            style={{
              width: btn.big ? "320px" : "260px",
              padding: "1rem 2rem",
              fontSize: btn.big ? "1.4rem" : "1.1rem",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: btn.big ? "#fff" : "#f0e6d2",
              background: btn.big ? "linear-gradient(135deg, rgba(255,212,153,0.15), rgba(255,180,60,0.25))" : "rgba(255,255,255,0.05)",
              border: btn.big ? "1.5px solid rgba(255,212,153,0.6)" : "1px solid rgba(255,255,255,0.1)",
              borderRadius: "12px",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              boxShadow: btn.big ? "0 0 30px rgba(255,212,153,0.15), inset 0 0 30px rgba(255,255,255,0.05)" : "0 0 20px rgba(255,255,255,0.05)",
              cursor: "pointer",
              transition: "all 0.3s ease",
              outline: "none",
            }}
            onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => {
              (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-3px) scale(1.03)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = btn.big ? "0 0 40px rgba(255,212,153,0.35), inset 0 0 30px rgba(255,255,255,0.1)" : "0 0 30px rgba(255,255,255,0.15)";
            }}
            onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
              (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0) scale(1)";
              (e.currentTarget as HTMLButtonElement).style.boxShadow = btn.big ? "0 0 30px rgba(255,212,153,0.15), inset 0 0 30px rgba(255,255,255,0.05)" : "0 0 20px rgba(255,255,255,0.05)";
            }}
          >
            {btn.label}
          </button>
        ))}
      </nav>

      {/* Footer hint */}
      <footer style={{ position: "absolute", bottom: "2rem", left: 0, right: 0, textAlign: "center", zIndex: 1, opacity: 0.4, fontSize: "0.85rem", letterSpacing: "0.15em" }}>
        Pressione Enter para começar
      </footer>
    </div>
  );
};
