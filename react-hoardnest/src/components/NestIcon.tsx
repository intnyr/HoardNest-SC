import React from "react";

// Use the SVG as an <img> tag referencing the file in src/media
import nestIconUrl from "../media/nest-icon.svg";

const NestIcon = (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
  <img
    src={nestIconUrl}
    alt="Nest Icon"
    style={{ width: 32, height: 32 }}
    {...props}
  />
);

export default NestIcon;
