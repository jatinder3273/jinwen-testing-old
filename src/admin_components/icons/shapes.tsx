import React, { SVGProps } from "react";

export const ActiveShape: React.FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg width="118" height="36" viewBox="0 0 118 36" fill="none" {...props}>
    <path d="M4 0H8V5H0L4 0Z" fill="#084F90" />
    <path d="M110 0H114L118 5H110V0Z" fill="#084F90" />
    <path
      d="M4 0H114L96.8575 30.8564C95.0938 34.0311 91.7476 36 88.116 36H29.884C26.2524 36 22.9062 34.0311 21.1425 30.8564L4 0Z"
      fill="currentColor"
    />
  </svg>
);
