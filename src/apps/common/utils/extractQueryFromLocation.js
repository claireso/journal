import qs from 'qs'

export default location => qs.parse(location.search.substring(1))
