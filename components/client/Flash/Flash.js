import React from 'react'
import PropTypes from 'prop-types'
import { useSpring } from 'react-spring'

import * as S from './Flash.styles'

//@TODO
import { useTranslations } from '@utils/hooks/useTranslations'

import { IconClose } from '@components/Icons'

import { ButtonIcon } from '../Buttons'

const Flash = ({ status, onClose, children }) => {
  const styles = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 }
  })

  const translations = useTranslations()

  return (
    <S.FlashWrapper style={styles} status={status}>
      {children}
      {onClose && (
        <ButtonIcon
          onClick={(event) => {
            event.preventDefault()
            onClose()
          }}
          aria-label={translations.bannerCloseButton}
        >
          <IconClose />
        </ButtonIcon>
      )}
    </S.FlashWrapper>
  )
}

Flash.defaultProps = {
  status: 'default'
}

Flash.propTypes = {
  status: PropTypes.string.isRequired,
  onClose: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired
}

export default Flash
