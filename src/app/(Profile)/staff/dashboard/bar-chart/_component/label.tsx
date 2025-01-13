import React from "react";
import { YAxisLabelProps } from "../../../types";

export const YAxisLabel: React.FC<YAxisLabelProps> = ({ value, marginTop }) => (
  <div className={`absolute`} style={{ bottom: `${marginTop}px`}}>
    <div>{value}</div>
  </div>
);
