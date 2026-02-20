import { useEffect, useRef, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import Matter from "matter-js";

const {
  Engine,
  Render,
  Runner,
  Bodies,
  Body,
  Composite,
  Constraint,
  Events,
  Vector,
} = Matter;

const COLORS = {
  bg: "#F4EDE0",
  wall: "#1E3A5F",
  wallStroke: "#162d4a",
  flipper: "#1a252f",
  ball: "#C9A227",
  ballStroke: "#a8851e",
  bumperDefault: "#0F766E",
  bumperHit: "#C9A227",
  bumperText: "#FFF9E6",
  peg: "#1E3A5F",
  scoreBg: "rgba(30,58,95,0.08)",
};

const BUMPER_TARGETS = [
  { id: "work", label: "Work", route: "/work" },
  { id: "writing", label: "Writing", route: "/writing" },
  { id: "bookshelf", label: "Bookshelf", route: "/bookshelf" },
  { id: "learning", label: "Learning", route: null },
];

const BUMPER_FACTS = {
  work: [
    "Built MIT Event Booking Portal handling 500+ events",
    "Optimized app performance from 4s to 200ms",
    "Created another project called Research Portal in college. That was a fail.",
    "Developed full-stack applications with React & Node.js",
    "Published a study on Kaggle tackling Mental Health",
  ],
  writing: [
    "Published poetry 'Ray of Sunshine' for my dog, Milo",
    "Wrote a poem in less than a minute.",
    "BIG on discernment... check it out!",
    "I love writing. Surprise.",
  ],
  bookshelf: [
    "Currently reading: Just Add Water by Katie Ledecky",
    "Grew up reading Nancy Drew. Didn't you? ",
    "Had an obsession with Percy Jackson... and Alex Rider.",
    "Part of NYC's Philosophical & Spiritual book club!",
    "Always has 3+ books in progress",
    "Believes every problem has been solved in a book somewhere",
  ],
  learning: [
    "Solved 500+ LeetCode problems.. yay.",
    "Love learning new frameworks",
    "First encounter with computer programming was BASIC at age 11!",
    "Used Claude to develop this game :)",
  ],
};

// Game Configuration - Base values for scaling
const BASE_CONFIG = {
  TABLE_W: 400,
  TABLE_H: 600,
  WALL: 14,
  BUMPER_R: 32,
  BALL_R: 10,
  TARGET_SCORE: 1111,
  MAX_CHARGE_MS: 1200,
  BALL_SAVE_DELAY: 2000,
  LAUNCH_VELOCITIES: { min: 8, max: 18 },
};

// Calculate responsive config based on screen size
function getResponsiveConfig() {
  const maxWidth = Math.min(window.innerWidth - 40, 500); // Max width with padding
  const maxHeight = Math.min(window.innerHeight - 200, 700); // Max height with room for UI

  // Maintain aspect ratio (2:3)
  const aspectRatio = BASE_CONFIG.TABLE_H / BASE_CONFIG.TABLE_W;
  let width = Math.min(maxWidth, maxHeight / aspectRatio);
  let height = width * aspectRatio;

  // Ensure minimum playable size
  if (width < 300) {
    width = 300;
    height = 450;
  }

  const scale = width / BASE_CONFIG.TABLE_W;

  return {
    TABLE_W: width,
    TABLE_H: height,
    WALL: BASE_CONFIG.WALL * scale,
    BUMPER_R: BASE_CONFIG.BUMPER_R * scale,
    BALL_R: BASE_CONFIG.BALL_R * scale,
    SCALE: scale,
    TARGET_SCORE: BASE_CONFIG.TARGET_SCORE,
    MAX_CHARGE_MS: BASE_CONFIG.MAX_CHARGE_MS,
    BALL_SAVE_DELAY: BASE_CONFIG.BALL_SAVE_DELAY,
    LAUNCH_VELOCITIES: BASE_CONFIG.LAUNCH_VELOCITIES,
  };
}

const COLLISION_CATEGORIES = {
  BALL: 0x0001,
  FLIPPER: 0x0002,
  WALL: 0x0004,
};

// Helper Functions
function createBodyOptions(type, customOptions = {}) {
  const baseOptions = {
    wall: {
      isStatic: true,
      restitution: 0.3,
      friction: 0.05,
      render: {
        fillStyle: COLORS.wall,
        strokeStyle: COLORS.wallStroke,
        lineWidth: 1,
      },
      collisionFilter: { category: COLLISION_CATEGORIES.WALL },
    },
    bumper: {
      isStatic: true,
      restitution: 2.0,
      render: {
        fillStyle: COLORS.bumperDefault,
        strokeStyle: "#0a5c56",
        lineWidth: 3,
      },
      collisionFilter: { category: COLLISION_CATEGORIES.WALL },
    },
    ball: {
      density: 0.002,
      friction: 0.01,
      frictionAir: 0.001,
      restitution: 0.45,
      render: {
        fillStyle: COLORS.ball,
        strokeStyle: COLORS.ballStroke,
        lineWidth: 2,
      },
      collisionFilter: {
        category: COLLISION_CATEGORIES.BALL,
        mask: COLLISION_CATEGORIES.WALL | COLLISION_CATEGORIES.FLIPPER,
      },
    },
  };

  return { ...baseOptions[type], ...customOptions };
}

function getRandomFact(categoryId) {
  const facts = BUMPER_FACTS[categoryId];
  return facts[Math.floor(Math.random() * facts.length)];
}

function createTable(config) {
  const w = createBodyOptions("wall");
  const bodies = [];

  bodies.push(
    Bodies.rectangle(
      config.TABLE_W / 2,
      config.WALL / 2,
      config.TABLE_W,
      config.WALL,
      w,
    ),
  );
  bodies.push(
    Bodies.rectangle(
      config.WALL / 2,
      config.TABLE_H / 2,
      config.WALL,
      config.TABLE_H,
      w,
    ),
  );
  bodies.push(
    Bodies.rectangle(
      config.TABLE_W - config.WALL / 2,
      config.TABLE_H / 2,
      config.WALL,
      config.TABLE_H,
      w,
    ),
  );

  bodies.push(
    Bodies.rectangle(
      config.TABLE_W - 40,
      config.TABLE_H - 180,
      config.WALL * 0.5,
      160,
      { ...w, chamfer: { radius: 3 } },
    ),
  );

  // Bars along top right of the wall
  bodies.push(
    Bodies.rectangle(config.TABLE_W - 45, 60, 55, config.WALL * 0.7, {
      ...w,
      angle: 0.6,
      chamfer: { radius: 8 },
    }),
  );
  bodies.push(
    Bodies.rectangle(config.TABLE_W - 85, 85, 40, config.WALL * 0.6, {
      ...w,
      angle: 0.25,
      chamfer: { radius: 6 },
    }),
  );

  // Longer angled side walls to prevent ball trapping
  bodies.push(
    Bodies.rectangle(
      55 * config.SCALE,
      config.TABLE_H - 100 * config.SCALE,
      100 * config.SCALE,
      config.WALL,
      { ...w, angle: 0.9, chamfer: { radius: 6 * config.SCALE } },
    ),
  );
  // Right wall positioned closer to flipper to eliminate gap
  bodies.push(
    Bodies.rectangle(
      config.TABLE_W * 0.75,
      config.TABLE_H - 100 * config.SCALE,
      90 * config.SCALE,
      config.WALL,
      { ...w, angle: -0.9, chamfer: { radius: 6 * config.SCALE } },
    ),
  );

  const gapW = 90;
  const bwY = config.TABLE_H - 25;
  const leftEnd = config.TABLE_W / 2 - gapW / 2;
  const rightStart = config.TABLE_W / 2 + gapW / 2;
  const laneX = config.TABLE_W - 40;
  bodies.push(
    Bodies.rectangle(
      (config.WALL + leftEnd) / 2,
      bwY,
      leftEnd - config.WALL,
      config.WALL,
      { ...w, chamfer: { radius: 2 } },
    ),
  );
  bodies.push(
    Bodies.rectangle(
      (rightStart + laneX - 8) / 2,
      bwY,
      laneX - 8 - rightStart,
      config.WALL,
      { ...w, chamfer: { radius: 2 } },
    ),
  );

  const pegPositions = [
    { x: config.TABLE_W * 0.25, y: 110 },
    { x: config.TABLE_W * 0.5, y: 100 },
    { x: config.TABLE_W * 0.68, y: 115 },
    { x: config.TABLE_W * 0.15, y: 200 },
    { x: config.TABLE_W * 0.75, y: 210 },
    { x: config.TABLE_W * 0.42, y: 360 },
    { x: config.TABLE_W * 0.6, y: 370 },
    { x: config.TABLE_W * 0.2, y: 385 },
  ];
  for (const p of pegPositions) {
    bodies.push(
      Bodies.circle(p.x, p.y, 5, {
        isStatic: true,
        restitution: 1.2,
        render: {
          fillStyle: COLORS.peg,
          strokeStyle: COLORS.wallStroke,
          lineWidth: 1,
        },
        collisionFilter: { category: COLLISION_CATEGORIES.WALL },
      }),
    );
  }

  return bodies;
}

function createBumpers(config) {
  const positions = [
    { x: config.TABLE_W * 0.28, y: 250 * config.SCALE },
    { x: config.TABLE_W * 0.62, y: 240 * config.SCALE },
    { x: config.TABLE_W * 0.2, y: 340 * config.SCALE },
    { x: config.TABLE_W * 0.52, y: 320 * config.SCALE },
  ];

  return positions.map((pos, i) => {
    const bumper = Bodies.circle(pos.x, pos.y, config.BUMPER_R, {
      ...createBodyOptions("bumper"),
      label: `bumper-${i}`,
    });
    bumper._targetIndex = i;
    bumper._hitTime = 0;
    return bumper;
  });
}

function createFlippers(config) {
  const opts = {
    density: 0.008,
    friction: 0.0,
    frictionAir: 0.02,
    restitution: 0.1,
    render: { fillStyle: COLORS.flipper, strokeStyle: "#0f1a24", lineWidth: 1 },
    chamfer: { radius: 5 * config.SCALE },
    collisionFilter: {
      category: COLLISION_CATEGORIES.FLIPPER,
      mask: COLLISION_CATEGORIES.BALL,
    },
  };
  const y = config.TABLE_H - 60 * config.SCALE,
    pivot = 28 * config.SCALE,
    fW = 68 * config.SCALE,
    fH = 13 * config.SCALE;
  const fL = Bodies.rectangle(config.TABLE_W * 0.3, y, fW, fH, opts);
  const fR = Bodies.rectangle(config.TABLE_W * 0.62, y, fW, fH, opts);
  const pL = { x: config.TABLE_W * 0.3 - pivot, y };
  const pR = { x: config.TABLE_W * 0.62 + pivot, y };
  const cOpts = { stiffness: 0.9, render: { visible: false } };
  const cL = Constraint.create({
    bodyA: fL,
    pointA: { x: -pivot, y: 0 },
    pointB: pL,
    ...cOpts,
  });
  const cR = Constraint.create({
    bodyA: fR,
    pointA: { x: pivot, y: 0 },
    pointB: pR,
    ...cOpts,
  });
  return { fL, fR, cL, cR };
}

function createBall(config) {
  return Bodies.circle(
    config.TABLE_W - 25 * config.SCALE,
    config.TABLE_H - 80 * config.SCALE,
    config.BALL_R,
    {
      ...createBodyOptions("ball"),
      label: "ball",
    },
  );
}

export default function PinballGame() {
  const canvasRef = useRef(null);
  const engineRef = useRef(null);
  const renderRef = useRef(null);
  const runnerRef = useRef(null);
  const flippersRef = useRef(null);
  const ballRef = useRef(null);
  const bumpersRef = useRef([]);
  const keysRef = useRef({ left: false, right: false });
  const scoreRef = useRef(0);
  const ballsRef = useRef(3);
  const chargeStartRef = useRef(0);
  const chargingRef = useRef(false);
  const waitingToLaunchRef = useRef(true);

  const [discoveredCards, setDiscoveredCards] = useState([]);
  const [launched, setLaunched] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [config, setConfig] = useState(getResponsiveConfig);
  const gameOverScoreRef = useRef(0);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const newConfig = getResponsiveConfig();
      setConfig(newConfig);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const addOrUpdateCard = useCallback((idx) => {
    const target = BUMPER_TARGETS[idx];
    const snippet = getRandomFact(target.id);

    setDiscoveredCards((prev) => {
      const existing = prev.find((c) => c.id === target.id);
      if (existing) {
        return prev.map((c) =>
          c.id === target.id ? { ...c, hitCount: c.hitCount + 1, snippet } : c,
        );
      }
      return [...prev, { ...target, snippet, hitCount: 1 }];
    });
  }, []);

  const parkBall = useCallback(() => {
    const ball = ballRef.current;
    if (!ball) return;
    Body.setStatic(ball, true);
    Body.setPosition(ball, { x: config.TABLE_W - 24, y: config.TABLE_H - 55 });
    Body.setVelocity(ball, { x: 0, y: 0 });
    waitingToLaunchRef.current = true;
    setLaunched(false); // Reset launched state so "Ready?" overlay appears
  }, []);

  const launchBall = useCallback((power = 0.6) => {
    const ball = ballRef.current;
    if (!ball || !waitingToLaunchRef.current) return;
    waitingToLaunchRef.current = false;
    chargingRef.current = false;
    setLaunched(true);
    setGameOver(false);
    Body.setStatic(ball, false);
    Body.setPosition(ball, { x: config.TABLE_W - 24, y: config.TABLE_H - 55 });
    const { min: minV, max: maxV } = config.LAUNCH_VELOCITIES;
    const v = minV + (maxV - minV) * power;
    Body.setVelocity(ball, { x: -1, y: -v });
    Body.setAngularVelocity(ball, 0);
  }, []);

  const resetBall = useCallback(() => {
    const TARGET_SCORE = config.TARGET_SCORE;

    // Only count down balls if score has reached the target
    if (scoreRef.current >= TARGET_SCORE) {
      ballsRef.current -= 1;
    }

    if (ballsRef.current <= 0 && scoreRef.current >= TARGET_SCORE) {
      gameOverScoreRef.current = scoreRef.current;
      setGameOver(true);
      setTimeout(() => {
        ballsRef.current = 3;
        scoreRef.current = 0;
        setGameOver(false);
        parkBall();
      }, 2500);
    } else {
      setTimeout(parkBall, 600);
    }
  }, [parkBall]);

  useEffect(() => {
    if (!canvasRef.current) return;

    const engine = Engine.create({ gravity: { x: 0, y: 0.8 } });
    engineRef.current = engine;

    const render = Render.create({
      element: canvasRef.current,
      engine,
      options: {
        width: config.TABLE_W,
        height: config.TABLE_H,
        wireframes: false,
        background: COLORS.bg,
        pixelRatio: window.devicePixelRatio || 1,
      },
    });
    renderRef.current = render;

    const runner = Runner.create();
    runnerRef.current = runner;

    const table = createTable(config);
    const bumpers = createBumpers(config);
    bumpersRef.current = bumpers;
    const { fL, fR, cL, cR } = createFlippers(config);
    flippersRef.current = { fL, fR };
    const ball = createBall(config);
    ballRef.current = ball;

    const drain = Bodies.rectangle(
      config.TABLE_W / 2,
      config.TABLE_H + 10,
      config.TABLE_W,
      20,
      {
        isStatic: true,
        isSensor: true,
        render: { visible: false },
        label: "drain",
      },
    );

    Composite.add(engine.world, [
      ...table,
      ...bumpers,
      fL,
      fR,
      cL,
      cR,
      ball,
      drain,
    ]);

    // --- Collision: peek-card logic ---
    Events.on(engine, "collisionStart", (event) => {
      for (const pair of event.pairs) {
        const bodies = [pair.bodyA, pair.bodyB];
        const bumper = bodies.find((b) => b.label?.startsWith("bumper-"));
        const ballBody = bodies.find((b) => b.label === "ball");
        const drainBody = bodies.find((b) => b.label === "drain");

        if (bumper && ballBody) {
          const now = Date.now();
          if (now - bumper._hitTime < 500) continue;
          bumper._hitTime = now;

          bumper.render.fillStyle = COLORS.bumperHit;
          bumper.render.lineWidth = 5;
          setTimeout(() => {
            bumper.render.fillStyle = COLORS.bumperDefault;
            bumper.render.lineWidth = 3;
          }, 350);

          const dir = Vector.normalise(
            Vector.sub(ballBody.position, bumper.position),
          );
          // More powerful bumper hits, with upward bias to keep ball in play
          Body.setVelocity(ballBody, {
            x: dir.x * 12,
            y: Math.min(dir.y * 12, -2),
          });

          scoreRef.current += 100;
          addOrUpdateCard(bumper._targetIndex);
        }

        if (drainBody && ballBody) {
          console.log("Ball hit drain sensor - respawning");
          resetBall();
        }
      }
    });

    // --- Flipper + physics loop ---
    Events.on(engine, "beforeUpdate", () => {
      const fl = flippersRef.current;
      if (!fl) return;
      const { fL: flipL, fR: flipR } = fl;
      const keys = keysRef.current;
      const up = 0.35,
        down = 0.08,
        maxUp = 0.65,
        maxDown = 0.15; // More powerful flippers

      Body.setAngularVelocity(flipL, keys.left ? -up : down);
      Body.setAngularVelocity(flipR, keys.right ? up : -down);
      if (flipL.angle < -maxUp) Body.setAngle(flipL, -maxUp);
      if (flipL.angle > maxDown) Body.setAngle(flipL, maxDown);
      if (flipR.angle > maxUp) Body.setAngle(flipR, maxUp);
      if (flipR.angle < -maxDown) Body.setAngle(flipR, -maxDown);

      const b = ballRef.current;
      if (b && !waitingToLaunchRef.current) {
        // Auto-launcher: if ball falls back into plunger lane while in play
        if (
          b.position.x > config.TABLE_W - 50 &&
          b.velocity.y > 0 &&
          b.position.y > 150
        ) {
          Body.setVelocity(b, { x: -2, y: -13 });
        }

        // Universal ball save: detect if ball is stuck anywhere (low velocity for 3+ seconds)
        const speed = Vector.magnitude(b.velocity);

        if (speed < 0.5) {
          if (!b._stuckTime) b._stuckTime = Date.now();
          else if (Date.now() - b._stuckTime > 3000) {
            // Ball has been stuck for 3 seconds - apply random kick to unstick it
            const kickX = (Math.random() - 0.5) * 8; // Random horizontal kick -4 to +4
            const kickY = -8 - Math.random() * 4; // Upward kick -8 to -12
            Body.setVelocity(b, { x: kickX, y: kickY });
            b._stuckTime = null;
          }
        } else {
          b._stuckTime = null;
        }

        // Speed limiter
        if (speed > 18)
          Body.setVelocity(b, Vector.mult(Vector.normalise(b.velocity), 18));

        // Fallback drain detection: if ball goes below the table, respawn it
        if (b.position.y > config.TABLE_H + 5) {
          console.log("Ball fell below table - respawning via fallback");
          resetBall();
        }
      }
    });

    // --- Custom HUD + labels ---
    Events.on(render, "afterRender", () => {
      const ctx = render.context;

      bumpers.forEach((b, i) => {
        const isHit = Date.now() - b._hitTime < 350;
        if (isHit) {
          ctx.save();
          ctx.beginPath();
          ctx.arc(
            b.position.x,
            b.position.y,
            config.BUMPER_R + 8,
            0,
            Math.PI * 2,
          );
          ctx.fillStyle = "rgba(201,162,39,0.25)";
          ctx.fill();
          ctx.restore();
        }
        ctx.save();
        ctx.font = `bold ${config.BUMPER_R * 0.36}px Inter, system-ui, sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = COLORS.bumperText;
        ctx.fillText(BUMPER_TARGETS[i].label, b.position.x, b.position.y);
        ctx.restore();
      });

      ctx.save();
      ctx.fillStyle = COLORS.scoreBg;
      ctx.fillRect(
        config.WALL,
        config.WALL,
        config.TABLE_W - config.WALL * 2,
        26,
      );
      ctx.font = "bold 12px Inter, system-ui, sans-serif";
      ctx.fillStyle = COLORS.wall;
      ctx.textBaseline = "middle";
      ctx.textAlign = "left";
      const TARGET_SCORE = config.TARGET_SCORE;
      const reachedTarget = scoreRef.current >= TARGET_SCORE;

      // Score display with target indicator
      if (reachedTarget) {
        ctx.fillStyle = COLORS.ball; // Gold color when target reached
        ctx.fillText(
          `SCORE: ${scoreRef.current} ✓`,
          config.WALL + 8,
          config.WALL + 13,
        );
      } else {
        ctx.fillText(
          `SCORE: ${scoreRef.current}/${TARGET_SCORE}`,
          config.WALL + 8,
          config.WALL + 13,
        );
      }

      ctx.fillStyle = COLORS.wall;
      ctx.textAlign = "right";
      const bc = Math.max(ballsRef.current, 0);

      // Ball display - show ∞ if unlimited balls
      if (reachedTarget) {
        ctx.fillText(
          `${"●".repeat(bc)}${"○".repeat(Math.max(3 - bc, 0))}`,
          config.TABLE_W - config.WALL - 8,
          config.WALL + 13,
        );
      } else {
        ctx.fillText(
          `∞ BALLS`,
          config.TABLE_W - config.WALL - 8,
          config.WALL + 13,
        );
      }
      ctx.restore();

      // Plunger charge meter (drawn in the plunger lane)
      if (chargingRef.current) {
        const held = Math.min(
          Date.now() - chargeStartRef.current,
          config.MAX_CHARGE_MS,
        );
        const pct = held / config.MAX_CHARGE_MS;
        const meterX = config.TABLE_W - 30;
        const meterH = 120;
        const meterY = config.TABLE_H - 70;
        const fillH = meterH * pct;

        ctx.save();
        ctx.fillStyle = "rgba(30,58,95,0.15)";
        ctx.fillRect(meterX - 5, meterY - meterH, 10, meterH);

        const grad = ctx.createLinearGradient(0, meterY, 0, meterY - meterH);
        grad.addColorStop(0, "#C9A227");
        grad.addColorStop(1, "#a8851e");
        ctx.fillStyle = grad;
        ctx.fillRect(meterX - 5, meterY - fillH, 10, fillH);

        ctx.fillStyle = COLORS.wall;
        ctx.font = "bold 9px Inter, system-ui, sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "bottom";
        ctx.fillText(`${Math.round(pct * 100)}%`, meterX, meterY - meterH - 4);
        ctx.restore();
      }
    });

    Body.setStatic(ball, true);
    Render.run(render);
    Runner.run(runner, engine);

    const MAX_CHARGE_MS = config.MAX_CHARGE_MS;

    const onKeyDown = (e) => {
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
        e.preventDefault();
        keysRef.current.left = true;
      }
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
        e.preventDefault();
        keysRef.current.right = true;
      }
      if (e.key === " " && !e.repeat && waitingToLaunchRef.current) {
        e.preventDefault();
        chargeStartRef.current = Date.now();
        chargingRef.current = true;
      }
    };
    const onKeyUp = (e) => {
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A")
        keysRef.current.left = false;
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D")
        keysRef.current.right = false;
      if (e.key === " " && chargingRef.current) {
        chargingRef.current = false;
        const held = Math.min(
          Date.now() - chargeStartRef.current,
          MAX_CHARGE_MS,
        );
        const power = Math.max(0.1, held / MAX_CHARGE_MS);
        launchBall(power);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      Events.off(engine);
      Events.off(render);
      Render.stop(render);
      Runner.stop(runner);
      Engine.clear(engine);
      render.canvas?.remove();
    };
  }, [config]); // Recreate physics world when config changes

  const fd = (side) => {
    keysRef.current[side] = true;
  };
  const fu = (side) => {
    keysRef.current[side] = false;
  };

  return (
    <div className="flex flex-col items-center gap-3 w-full max-w-6xl mx-auto px-4">
      {/* Main layout: table + peek cards side by side on desktop */}
      <div className="flex flex-col lg:flex-row items-start justify-center gap-4 w-full">
        {/* Pinball table */}
        <div className="relative flex-shrink-0">
          <div
            ref={canvasRef}
            className="rounded-2xl overflow-hidden shadow-xl border-4 border-slate-blue/20 mx-auto"
            style={{
              width: config.TABLE_W,
              height: config.TABLE_H,
              maxWidth: "100vw",
            }}
          />

          {!launched && (
            <div
              onClick={() => launchBall(0.6)}
              role="button"
              className="absolute inset-0 flex flex-col items-center justify-center bg-slate/30 backdrop-blur-[2px] rounded-2xl z-20 cursor-pointer transition-opacity hover:bg-slate/20"
            >
              <span className="text-cream text-2xl font-serif font-bold mb-2 drop-shadow-lg">
                Ready?
              </span>
              <span className="text-cream/80 text-sm font-medium drop-shadow">
                Hold Space to charge, release to launch
              </span>
            </div>
          )}

          {gameOver && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate/40 backdrop-blur-[2px] rounded-2xl z-20 pointer-events-none">
              <span className="text-cream text-3xl font-serif font-bold mb-2 drop-shadow-lg">
                Game Over
              </span>
              <span className="text-gold text-xl font-bold drop-shadow">
                Score: {gameOverScoreRef.current}
              </span>
              <span className="text-cream/70 text-sm mt-3">Restarting...</span>
            </div>
          )}
        </div>

        {/* Peek cards sidebar */}
        {discoveredCards.length > 0 && (
          <div className="w-full lg:w-52 flex flex-row lg:flex-col gap-3 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 lg:pt-2">
            {discoveredCards.map((card) => {
              const inner = (
                <>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-slate-blue text-sm">
                      {card.label}
                    </span>
                  </div>
                  <p className="text-slate/60 text-xs leading-relaxed line-clamp-3">
                    {card.route ? card.snippet : `"${card.snippet}"`}
                  </p>
                  {card.route && (
                    <span className="text-emerald-deep text-[11px] font-medium mt-1.5 inline-block">
                      Visit &rarr;
                    </span>
                  )}
                </>
              );

              const className =
                "animate-slide-in min-w-[160px] lg:min-w-0 bg-cream border border-gold-muted/40 rounded-xl p-3 shadow-md hover:border-gold hover:shadow-lg hover:scale-[1.02] transition-all cursor-pointer block";

              return card.route ? (
                <Link key={card.id} to={card.route} className={className}>
                  {inner}
                </Link>
              ) : (
                <div
                  key={card.id}
                  className={className.replace(
                    "cursor-pointer",
                    "cursor-default",
                  )}
                >
                  {inner}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Mobile flipper controls */}
      <div className="flex gap-8 sm:gap-16 lg:hidden">
        <button
          onTouchStart={() => fd("left")}
          onTouchEnd={() => fu("left")}
          onMouseDown={() => fd("left")}
          onMouseUp={() => fu("left")}
          className="w-24 h-14 bg-slate-blue text-cream rounded-xl font-bold text-sm active:bg-emerald-deep transition-colors select-none touch-none"
        >
          ◀ FLIP
        </button>
        <button
          onTouchStart={() => fd("right")}
          onTouchEnd={() => fu("right")}
          onMouseDown={() => fd("right")}
          onMouseUp={() => fu("right")}
          className="w-24 h-14 bg-slate-blue text-cream rounded-xl font-bold text-sm active:bg-emerald-deep transition-colors select-none touch-none"
        >
          FLIP ▶
        </button>
      </div>

      <p className="text-slate/50 text-xs text-center mt-1">
        <span className="hidden lg:inline">
          ← → to flip · Hold Space to charge &amp; launch
        </span>
        <span className="lg:hidden">
          Tap buttons to flip · Tap table to launch
        </span>
      </p>
    </div>
  );
}
