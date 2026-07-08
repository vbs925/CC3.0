"use client";

import { useEffect, useRef, useState } from "react";

const NODES = [
  { id: 0, x: 230, y: 65 },
  { id: 1, x: 75, y: 115 },
  { id: 2, x: 570, y: 100 },
  { id: 3, x: 400, y: 155 },
  { id: 4, x: 180, y: 248 },
  { id: 5, x: 338, y: 352 },
  { id: 6, x: 478, y: 298 },
  { id: 7, x: 88, y: 378 },
  { id: 8, x: 605, y: 382 },
  { id: 9, x: 258, y: 468 },
  { id: 10, x: 432, y: 502 },
  { id: 11, x: 608, y: 548 },
];

const EDGES: [number, number][] = [
  [0, 1], [0, 2], [0, 3],
  [1, 4], [2, 3], [3, 6],
  [4, 5], [4, 7], [5, 6],
  [5, 9], [6, 8], [7, 9],
  [8, 10], [8, 11], [9, 10],
  [10, 11],
];

const ADJ: Record<number, number[]> = {};
NODES.forEach(n => (ADJ[n.id] = []));
EDGES.forEach(([a, b]) => {
  ADJ[a].push(b);
  ADJ[b].push(a);
});

const EDGE_DURATION = 820;

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

function pickNext(current: number, prev: number): number {
  const neighbors = ADJ[current];
  const filtered = neighbors.filter(n => n !== prev);
  const pool = filtered.length > 0 ? filtered : neighbors;
  return pool[Math.floor(Math.random() * pool.length)];
}

export default function NeuralAnimation({ className }: { className?: string }) {
  const [light, setLight] = useState({
    x: NODES[0].x,
    y: NODES[0].y,
    fromNode: 0,
    toNode: 1,
  });
  const [activeNode, setActiveNode] = useState(-1);

  const stateRef = useRef({
    fromNode: 0,
    toNode: 1,
    prevNode: -1,
    currentNode: 0,
    startTime: 0,
  });
  const rafRef = useRef(0);
  const activeTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    const s = stateRef.current;
    s.startTime = performance.now();
    s.currentNode = 0;
    s.prevNode = -1;
    s.fromNode = 0;
    s.toNode = pickNext(0, -1);

    const animate = (ts: number) => {
      const elapsed = ts - s.startTime;
      const rawT = Math.min(elapsed / EDGE_DURATION, 1);
      const t = easeInOut(rawT);

      const from = NODES[s.fromNode];
      const to = NODES[s.toNode];

      setLight({
        x: from.x + (to.x - from.x) * t,
        y: from.y + (to.y - from.y) * t,
        fromNode: s.fromNode,
        toNode: s.toNode,
      });

      if (rawT >= 1) {
        const arrived = s.toNode;
        clearTimeout(activeTimeout.current);
        setActiveNode(arrived);
        activeTimeout.current = setTimeout(() => setActiveNode(-1), 420);

        s.prevNode = s.currentNode;
        s.currentNode = arrived;
        s.fromNode = arrived;
        s.toNode = pickNext(arrived, s.prevNode);
        s.startTime = ts;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(rafRef.current);
      clearTimeout(activeTimeout.current);
    };
  }, []);

  return (
    <div
      className={className}
      style={{ 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "center", 
        background: "transparent",
        pointerEvents: "none",
        zIndex: 1
      }}
    >
      <svg
        viewBox="0 0 690 620"
        style={{ width: "100%", height: "100%", background: "transparent", display: "block" }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="glow-dot" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="5.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="glow-node" x="-150%" y="-150%" width="400%" height="400%">
            <feGaussianBlur stdDeviation="7" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="glow-edge" x="-20%" y="-100%" width="140%" height="300%">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Base edges */}
        {EDGES.map(([a, b], i) => (
          <line
            key={`base-${i}`}
            x1={NODES[a].x}
            y1={NODES[a].y}
            x2={NODES[b].x}
            y2={NODES[b].y}
            stroke="#8a8a8a"
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity={0.55}
          />
        ))}

        {/* Active edge highlight */}
        {EDGES.map(([a, b], i) => {
          const isActive =
            (light.fromNode === a && light.toNode === b) ||
            (light.fromNode === b && light.toNode === a);
          if (!isActive) return null;
          return (
            <line
              key={`active-${i}`}
              x1={NODES[a].x}
              y1={NODES[a].y}
              x2={NODES[b].x}
              y2={NODES[b].y}
              stroke="#e8b84b"
              strokeWidth="1.6"
              strokeLinecap="round"
              opacity={0.55}
              filter="url(#glow-edge)"
            />
          );
        })}

        {/* Nodes */}
        {NODES.map(node => {
          const isActive = activeNode === node.id;
          const isCurrentFrom = light.fromNode === node.id;
          return (
            <g key={node.id}>
              {(isActive || isCurrentFrom) && (
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={14}
                  fill="#e8b84b"
                  opacity={isActive ? 0.22 : 0.1}
                />
              )}
              <circle
                cx={node.x}
                cy={node.y}
                r={isActive ? 6.5 : 4.5}
                fill={isActive ? "#e8b84b" : "#555"}
                filter={isActive ? "url(#glow-node)" : undefined}
              />
            </g>
          );
        })}

        {/* Traveling light — outer glow */}
        <circle
          cx={light.x}
          cy={light.y}
          r={8}
          fill="#e8b84b"
          opacity={0.35}
          filter="url(#glow-dot)"
        />
        {/* Traveling light — core */}
        <circle
          cx={light.x}
          cy={light.y}
          r={4.5}
          fill="#f5c842"
          filter="url(#glow-dot)"
        />
        {/* Traveling light — bright center */}
        <circle
          cx={light.x}
          cy={light.y}
          r={2}
          fill="#fffbe8"
        />
      </svg>
    </div>
  );
}
