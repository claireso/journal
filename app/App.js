import React from 'react';
import Photo from './Photo';

const App = props => {
  return (
    <main>
       { props.photos.map((photo, index) => <Photo key={ index } { ...photo } />) }
    </main>
  )
}

module.exports = App;
