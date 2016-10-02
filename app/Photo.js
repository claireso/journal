import React from 'react';

const Photo = props => {
  const cls = 'figure-' + props.position;
  const width = props.portrait ? 385 : 810;
  const height = props.portrait ? 578 :  540;

  return (
    <figure className={ cls }>
      <div>
        <img src={ props.src }  width={ width } height={ height } />
        <figcaption>
          { props.title  }

          { props.description &&
            <span> { props.description } </span>
          }
        </figcaption>
      </div>
    </figure>
  )
}

export default Photo;
