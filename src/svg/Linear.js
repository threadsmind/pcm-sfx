import React from 'react';
import theme from '@/theme';
import { styled } from '@material-ui/core/styles';

const XMLNS = 'http://www.w3.org/2000/svg';
const VIEWBOX = '0 0 100 100';

const StyledSvg = styled('svg')(
  () => ({
    width: '100%',
    height: '100%'
  }),
  { name: 'LinearSvg' }
);

const Linear = ({ type, value }) => {
  const direction = type === 'attack' ? 'up' : 'down';
  const scaleValue = 100 - value;
  const coords = {
    x1: '0',
    y1: direction === 'up' ? '100' : type === 'release' ? scaleValue : '0',
    x2: '100',
    y2: direction === 'up' ? '0' : type === 'decay' ? scaleValue : '100'
  };

  return (
    <StyledSvg viewBox={VIEWBOX} xmlns={XMLNS} preserveAspectRatio="none">
      <line
        x1={coords.x1}
        y1={coords.y1}
        x2={coords.x2}
        y2={coords.y2}
        strokeWidth="5px"
        strokeLinecap="square"
        stroke={theme.palette.primary.main}
      />
    </StyledSvg>
  );
};

export default Linear;
