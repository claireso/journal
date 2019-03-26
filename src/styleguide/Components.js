import React from 'react'
import PropTypes from 'prop-types'
import ReactComponent from './ReactComponent'
import ComponentsRenderer from 'react-styleguidist/lib/client/rsg-components/Components/ComponentsRenderer'

const getClassName = filepath => {
  if (filepath.includes('src/apps/admin')) {
    return 'admin'
  }

  if (filepath.includes('src/apps/client')) {
    return 'client'
  }

  if (filepath.includes('src/apps/common')) {
    return 'common admin client'
  }

  return null
}

export default function Components({
  components,
  depth,
  exampleMode,
  usageMode
}) {
  return (
    <ComponentsRenderer>
      {components.map(component => (
        <ReactComponent
          key={component.filepath}
          component={component}
          exampleMode={exampleMode}
          usageMode={usageMode}
          depth={depth}
          className={getClassName(component.filepath)}
        />
      ))}
    </ComponentsRenderer>
  )
}

Components.propTypes = {
  components: PropTypes.array.isRequired,
  depth: PropTypes.number.isRequired,
  exampleMode: PropTypes.string.isRequired,
  usageMode: PropTypes.string.isRequired
}
