import React, { Fragment } from "react";
import MoreButton from "../components/MoreButton";
import Sushi from "../components/Sushi";

const SushiContainer = props => {
  return (
    <Fragment>
      <div className="belt">
        {props.sushi.map(sushi => {
          return (
            <Sushi details={sushi} eatSushi={props.eatSushi} key={sushi.id} />
          );
        })}
        <MoreButton nextSushi={props.nextSushi} />
      </div>
    </Fragment>
  );
};

export default SushiContainer;
