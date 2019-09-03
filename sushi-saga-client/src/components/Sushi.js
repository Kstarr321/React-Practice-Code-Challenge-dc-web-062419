import React, { Fragment } from "react";

const Sushi = props => {
  return (
    <div className="sushi">
      <div className="plate">
        <img
          src={props.details.img_url}
          width="100%"
          id={props.details.id}
          onClick={e => props.eatSushi(e)}
        />
      </div>
      <h4 className="sushi-details">
        {props.details.name} - ${props.details.price}
      </h4>
    </div>
  );
};

export default Sushi;
