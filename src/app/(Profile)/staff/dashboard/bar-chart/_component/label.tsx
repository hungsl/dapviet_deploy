import React from 'react';
import { YAxisLabelProps } from '../../../types';

export const YAxisLabel: React.FC<YAxisLabelProps> = ({ value, marginTop }) => (
  <div style={{ marginTop: marginTop ? `${marginTop}px` : 0 }}>
    {value}
  </div>
);