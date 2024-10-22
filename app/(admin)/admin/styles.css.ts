import { pagesStyle, tokens, px, py, pb, gapY, responsiveStyle } from '@web/theme'

export const sidebar = pagesStyle({
  position: 'fixed',
  top: 0,
  left: 0,
  bottom: 0,
  width: tokens.layout.admin.sidebar.default,
  display: 'flex',
  flexDirection: 'column',
  color: 'white',
  background: tokens.colors.neutral.extradark,
  ...responsiveStyle({
    lg: {
      width: tokens.layout.admin.sidebar.lg
    }
  })
})

export const sidebarHeader = pagesStyle({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  WebkitFontSmoothing: 'antialiased',
  minHeight: '77px',
  ...px('size-2'),
  ...py('size-4'),
  ...responsiveStyle({
    lg: {
      ...px('size-3')
    }
  })
})

export const sidebarTitle = pagesStyle({
  display: 'none',
  ...responsiveStyle({
    lg: {
      display: 'initial'
    }
  })
})

export const sidebarContent = pagesStyle({
  flexGrow: 1,
  ...py('size-8'),
  ...px('size-2'),
  ...responsiveStyle({
    lg: {
      ...px('size-3')
    }
  })
})

export const sidebarFooter = pagesStyle({
  display: 'flex',
  flexDirection: 'column',
  ...gapY('size-3'),
  ...px('size-2'),
  ...py('size-4'),
  ...responsiveStyle({
    lg: {
      ...px('size-3')
    }
  })
})

export const content = pagesStyle({
  position: 'relative',
  borderLeft: `1px solid ${tokens.colors.neutral.extralight}`,
  minHeight: '100vh',
  background: tokens.colors.neutral['2extralight'],
  marginLeft: tokens.layout.admin.sidebar.default,
  ...px('size-4'),
  ...pb('size-15'),
  ...responsiveStyle({
    sm: {
      ...px('size-8')
    },
    lg: {
      marginLeft: tokens.layout.admin.sidebar.lg
    }
  })
})

export const messages = pagesStyle({
  marginLeft: `calc(${tokens.sizes['size-4']}*-1)`,
  marginRight: `calc(${tokens.sizes['size-4']}*-1)`,
  ...responsiveStyle({
    sm: {
      marginLeft: `calc(${tokens.sizes['size-8']}*-1)`,
      marginRight: `calc(${tokens.sizes['size-8']}*-1)`
    }
  })
})
