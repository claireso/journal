import { createGlobalTheme } from '@vanilla-extract/css'

// sizes
type SizeKeys =
  | 'auto'
  | 0
  | 0.5
  | 1
  | 1.5
  | 2
  | 2.5
  | 3
  | 3.5
  | 4
  | 4.5
  | 5
  | 5.5
  | 6
  | 6.5
  | 7
  | 7.5
  | 8
  | 8.5
  | 9
  | 9.5
  | 10
  | 10.5
  | 11
  | 11.5
  | 12
  | 12.5
  | 13
  | 13.5
  | 14
  | 14.5
  | 15
  | 15.5
  | 16
  | 16.5
  | 17
  | 17.5
  | 18
  | 18.5
  | 19
  | 19.5
  | 20
  | 20.5
  | 21
  | 21.5
  | 22
  | 22.5
  | 23
  | 23.5
  | 24
  | 24.5
  | 25

const makeSizes = (sizes: Partial<Record<SizeKeys, string>>): Record<`size-${SizeKeys}`, string> => {
  return Object.entries(sizes).reduce(
    (acc, current) => {
      const [level, size] = current
      return { ...acc, [`size-${level}`]: size }
    },
    {} as Record<`size-${SizeKeys}`, string>
  )
}

const sizes = makeSizes({
  auto: 'auto',
  0: '0px',
  0.5: '2px',
  1: '4px',
  2: '8px',
  2.5: '10px',
  3: '12px',
  3.5: '14px',
  4: '16px',
  4.5: '18px',
  5: '20px',
  6: '24px',
  7: '28px',
  8: '32px',
  9: '36px',
  10: '40px',
  11: '44px',
  12: '48px',
  13: '52px',
  14: '56px',
  15: '60px',
  16: '64px',
  17: '68px',
  18: '72px',
  19: '76px',
  20: '80px',
  21: '84px',
  22: '88px',
  23: '92px',
  24: '96px',
  25: '100px'
})

// colors
type ShadeLevels =
  | 50
  | 100
  | 150
  | 200
  | 250
  | 300
  | 350
  | 400
  | 450
  | 500
  | 550
  | 600
  | 650
  | 700
  | 750
  | 800
  | 850
  | 900
  | 950

const makeColor = <T extends string>(
  name: T,
  shades: Partial<Record<ShadeLevels, string>>
): Record<`${T}-${ShadeLevels}`, string> => {
  return Object.entries(shades).reduce(
    (acc, current) => {
      const [level, color] = current
      return { ...acc, [`${name}-${level}`]: color }
    },
    {} as Record<`${T}-${ShadeLevels}`, string>
  )
}

const colors = {
  ...makeColor('slate', {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
    950: '#020617'
  }),
  ...makeColor('stone', {
    50: '#fafaf9',
    100: '#f5f5f4',
    200: '#e7e5e4',
    300: '#d6d3d1',
    400: '#a8a29e',
    500: '#78716c',
    600: '#57534e',
    700: '#44403c',
    800: '#292524',
    900: '#1c1917',
    950: '#0c0a09'
  }),
  ...makeColor('red', {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
    950: '#450a0a'
  }),
  ...makeColor('yellow', {
    50: '#fefce8',
    100: '#fef9c3',
    200: '#fef08a',
    300: '#fde047',
    400: '#facc15',
    500: '#eab308',
    600: '#ca8a04',
    700: '#a16207',
    800: '#854d0e',
    900: '#713f12',
    950: '#422006'
  }),
  ...makeColor('green', {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
    950: '#052e16'
  }),
  ...makeColor('sky', {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9',
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
    950: '#082f49'
  })
}

const semanticColors = {
  white: '#fff',
  black: '#000',
  current: 'currentColor',
  // text
  'text-base': colors['slate-950'],
  // blue
  primary: {
    base: colors['sky-500'],
    light: colors['sky-400'],
    extralight: colors['sky-100']
  },
  // gray variants
  neutral: {
    base: colors['slate-500'],
    light: colors['slate-400'],
    extralight: colors['slate-300'],
    '2extralight': colors['slate-100'],
    '3extralight': colors['slate-50'],
    dark: colors['slate-800'],
    extradark: colors['slate-950']
  },
  // red
  danger: {
    base: colors['red-600'],
    light: colors['red-500'],
    extralight: colors['red-100']
  },
  // green
  success: {
    base: colors['green-600'],
    light: colors['green-400'],
    extralight: colors['green-100']
  },
  // yellow
  info: {
    base: colors['yellow-600'],
    light: colors['yellow-500'],
    extralight: colors['yellow-300']
  }
}

const fonts = {
  family: {
    sansSerif: '-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji'
  },
  size: {
    xxs: sizes['size-2.5'],
    xs: sizes['size-3'],
    sm: sizes['size-3.5'],
    base: sizes['size-4'],
    lg: sizes['size-4.5'],
    xl: sizes['size-5'],
    '2xl': sizes['size-6'],
    '3xl': sizes['size-7']
  },
  weight: {
    thin: '100',
    extralight: '200',
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900'
  },
  style: {
    italic: 'italic',
    oblique: 'oblique'
  }
}

const shadows = {
  input: '1px 1px 3px #e6e6e6'
}

const borders = {
  'border-width-photo': '2rem',
  'border-width-photo-md': '8rem'
}

const layout = {
  admin: {
    sidebar: {
      default: '6.8rem',
      lg: '22rem'
    }
  }
}

export const tokens = createGlobalTheme(':root', {
  sizes,
  colors: { ...colors, ...semanticColors },
  fonts,
  shadows,
  borders,
  layout
})
