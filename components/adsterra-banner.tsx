"use client";

import { useEffect, useRef } from "react";

export function AdsterraBanner() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    if (containerRef.current.dataset.adLoaded) return;
    containerRef.current.dataset.adLoaded = "true";

    try {
      const atOptionsScript = document.createElement("script");
      atOptionsScript.type = "text/javascript";
      atOptionsScript.innerHTML = `
        atOptions = {
          'key' : '394db548bc6fb1e8bb7957e9200f10b8',
          'format' : 'iframe',
          'height' : 90,
          'width' : 728,
          'params' : {}
        };
      `;

      const invokeScript = document.createElement("script");
      invokeScript.type = "text/javascript";
      invokeScript.src = "https://www.highrevenueformat.com/394db548bc6fb1e8bb7957e9200f10b8/invoke.js";

      containerRef.current.appendChild(atOptionsScript);
      containerRef.current.appendChild(invokeScript);
    } catch (e) {
      console.error("Adsterra Banner load error", e);
    }
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-center my-6 px-4">
      <div className="flex items-center gap-1.5 mb-1.5 text-[10px] text-slate-400 uppercase tracking-widest font-mono">
        <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
        <span>Sponsored</span>
        <span className="text-slate-300">•</span>
        <span className="text-slate-400">Adsterra 728x90</span>
      </div>
      <div
        ref={containerRef}
        className="w-full max-w-[728px] min-h-[90px] bg-white border border-slate-200/80 rounded-lg flex items-center justify-center overflow-hidden shadow-sm"
      />
    </div>
  );
}
