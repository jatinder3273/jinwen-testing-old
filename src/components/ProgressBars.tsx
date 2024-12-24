import React from "react";

const Progress = ({ strokeWidth, percentage }) => {
  const radius = 50 - strokeWidth / 2;
  const pathDescription = `
    M 50,50 m 0,-${radius}
    a ${radius},${radius} 0 1 1 0,${2 * radius}
    a ${radius},${radius} 0 1 1 0,-${2 * radius}
  `;

  const diameter = Math.PI * 2 * radius;
  const progressStyle = {
    stroke: "#3190E6",
    strokeDasharray: `${diameter}px ${diameter}px`,
    strokeDashoffset: `${((100 - percentage) / 100) * diameter}px`,
  };

  const trailStyle = {
    stroke: "#d6d6d6",
    strokeWidth: strokeWidth,
    fillOpacity: 0,
  };

  return (
    <svg
      className={"CircularProgressbar"}
      viewBox="0 0 100 100"
      width={100}
      height={100}
    >
      {/* Trail */}
      <path
        className="CircularProgressbar-trail"
        d={pathDescription}
        style={trailStyle}
      />

      {/* Progress */}
      <path
        className="CircularProgressbar-path"
        d={pathDescription}
        strokeWidth={strokeWidth}
        fillOpacity={0}
        //@ts-ignore
        style={progressStyle}
      />

      <text
        className="CircularProgressbar-text"
        x={50}
        y={50}
        style={{
          fill: "#000",
          fontSize: "24px",
          dominantBaseline: "central",
          textAnchor: "middle",
        }}
      >
        {`${percentage}%`}
      </text>
    </svg>
  );
};

export default Progress;
