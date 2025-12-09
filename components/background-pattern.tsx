"use client";

export function BackgroundPattern() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-[0.03] dark:opacity-[0.05]">
      <svg
        className="absolute w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
      >
        <defs>
          <pattern
            id="arabic-pattern"
            x="0"
            y="0"
            width="40"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M0 20 L20 0 L40 20 L20 40 Z M20 0 L20 40 M0 20 L40 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
            <circle
              cx="20"
              cy="20"
              r="5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#arabic-pattern)" />
      </svg>
    </div>
  );
}
