import React from 'react';

function ProductTemp(props) {
  return (
    <div className="card">
      <img
      className='product--image'
      src={props.icon}
      alt=''
      />
      <h2>{props.name}</h2>
    </div>
  )
}

export default ProductTemp;
