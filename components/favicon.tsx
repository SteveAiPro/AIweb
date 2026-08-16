"use client";

import { ReactNode, useState } from "react";

const SOURCES = (domain: string) => [
  `https://www.google.com/s2/favicons?sz=128&domain=${domain}`,
  `https://icons.duckduckgo.com/ip3/${domain}.ico`,
  `https://logo.clearbit.com/${domain}`,
];

export function Favicon({
  domain,
  alt,
  className,
  children,
}: {
  domain?: string;
  alt: string;
  className?: string;
  children: ReactNode;
}) {
  const [idx, setIdx] = useState(0);
  const [failed, setFailed] = useState(false);

  if (!domain || failed) return <>{children}</>;

  const sources = SOURCES(domain);

  return (
    <img
      src={sources[idx]}
      alt={alt}
      loading="lazy"
      onError={() => {
        if (idx < sources.length - 1) setIdx(idx + 1);
        else setFailed(true);
      }}
      className={className}
    />
  );
}
