import React from "react";
import "./hamburger.css";

const SvgHamburger: React.FC<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = (props) => {
  return (
    <div id="burger" {...props}>
      <svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x={0}
          y={2}
          width={24}
          height={4}
          rx={2}
          ry={2}
          fill="black"
          className="topLine"
        />
        <rect
          x={0}
          y={10}
          width={24}
          height={4}
          rx={2}
          ry={2}
          fill="black"
          className="middleLine"
        />
        <rect
          x={0}
          y={18}
          width={24}
          height={4}
          rx={2}
          ry={2}
          fill="black"
          className="bottomLine"
        />
      </svg>
    </div>
  );
};

export default SvgHamburger;
