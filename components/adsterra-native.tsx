"use client";

import { useEffect, useRef } from "react";

export function AdsterraNative() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    if (containerRef.current.dataset.adLoaded) return;
    containerRef.current.dataset.adLoaded = "true";

    try {
      const script = document.createElement("script");
      script.async = true;
      script.setAttribute("data-cfasync", "false");
      script.src = "https://pl31417939.profitableratecpmnetwork.com/c232938063f79733c9903234559b6f51/invoke.js";

      containerRef.current.appendChild(script);
    } catch (e) {
      console.error("Adsterra Native load error", e);
    }
  }, []);

  return (
    <div className="mx-auto w-full max-w-7xl px-4 my-8 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
          <span className="text-[11px] font-mono uppercase tracking-widest text-slate-500">
            Sponsored Recommendations
          </span>
        </div>
        <span className="text-[10px] text-slate-400 font-mono">Adsterra Verified</span>
      </div>
      <div
        ref={containerRef}
        className="w-full min-h-[140px] bg-white border border-slate-200/80 rounded-xl p-3 shadow-sm overflow-hidden"
      >
        <div id="container-c232938063f79733c9903234559b6f51" />
      </div>
    </div>
  );
}
