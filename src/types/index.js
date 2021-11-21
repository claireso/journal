import PropTypes from 'prop-types'

export const PhotoTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  name: PropTypes.string.isRequired,
  position: PropTypes.oneOf(['left', 'center', 'right']),
  portrait: PropTypes.bool.isRequired,
  square: PropTypes.bool.isRequired,
  created_at: PropTypes.string.isRequired,
  updated_at: PropTypes.string.isRequired,
  color: PropTypes.string,
  source: PropTypes.string.isRequired
}

export const SubscriptionTypes = {
  id: PropTypes.number.isRequired,
  subscription: PropTypes.shape({
    endpoint: PropTypes.string.isRequired,
    expirationTime: PropTypes.number,
    keys: PropTypes.shape({
      p256dh: PropTypes.string.isRequired,
      auth: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
  created_at: PropTypes.string.isRequired,
  updated_at: PropTypes.string.isRequired
}
