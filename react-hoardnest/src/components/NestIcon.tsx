import React from "react";

// Simple SVG for a nest icon (replace with a better one as needed)
const NestIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    width={props.width || 24}
    height={props.height || 24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <ellipse cx="12" cy="17" rx="8" ry="4" fill="#8D6748" />
    <ellipse cx="12" cy="17" rx="6" ry="3" fill="#BFA380" />
    <ellipse cx="12" cy="17" rx="4" ry="2" fill="#E6D3B3" />
    <path
      d="M4 17c0-4 8-8 16 0"
      stroke="#8D6748"
      strokeWidth="1.5"
      fill="none"
    />
  </svg>
);

export default NestIcon;
