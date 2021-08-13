import React from 'react';
import { theme as chakraTheme } from '@chakra-ui/core';

const theme = {
  ...chakraTheme,
  fonts: {
    ...chakraTheme.fonts,
    body: `Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"`
  },
  fontWeights: {
    normal: 400,
    medium: 600,
    bold: 700
  },
  icons: {
    ...chakraTheme.icons,
    logo: {
      path: (
        <path
          d="M169.1797 52.7266C68.6914 67.7617 19.0117 179.457 75.1484 264.1523C103.7148 307.2539 154.9414 330.0313 206.082 322.3867C306.5742 307.3477 356.25 195.6523 300.1094 110.9609C271.543 67.8594 220.3203 45.0742 169.1797 52.7266ZM220.0391 268.5273C174.6367 286.6875 122.7109 263.5898 105.7891 217.7148C89.4492 173.4219 111.3711 124.1211 155.207 106.582C225 146 189 122 267.9102 156.6953C285.8047 201.6992 263.8789 250.9922 220.0391 268.5273ZM220.0391 268.5273M155 90 159 160 195 161 128 250 290 141Z"
          fill="#000000"
        />
      ),
      viewBox: '75.1484 52.7266 224.961 269.6601'
    }
  }
};

export default theme;
