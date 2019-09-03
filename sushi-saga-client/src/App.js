import React, { Component } from "react";
import SushiContainer from "./containers/SushiContainer";
import Table from "./containers/Table";

// Endpoint!
const API = "http://localhost:3000/sushis";

class App extends Component {
  constructor() {
    super();
    this.state = {
      allSushi: [],
      fourSushi: [],
      sushiIndex: 0,
      emptyPlates: [],
      wallet: 100
    };
  }

  groupSushi = data => {
    let count = 1;
    let holder = [];
    let final = [];
    for (let i = 0; i <= data.length; i++) {
      if (count > 4) {
        final.push(holder);
        holder = [];
        count = 1;
      } else {
        holder.push(data[i]);
        count += 1;
      }
    }
    this.setState({
      allSushi: final
    });
    this.setState({
      fourSushi: this.state.allSushi[0]
    });
  };

  componentDidMount() {
    fetch("http://localhost:3000/sushis")
      .then(r => r.json())
      .then(data => {
        this.groupSushi(data);
      });
  }

  nextSushi = () => {
    let idx = this.state.sushiIndex + 1;
    let nextFour = this.state.allSushi[idx];
    this.setState({
      sushiIndex: idx,
      fourSushi: nextFour
    });
  };

  eatSushi = e => {
    let id = parseInt(e.currentTarget.id);
    let sushis = this.state.fourSushi.filter(sushi => {
      return sushi.id !== id;
    });
    this.state.emptyPlates.push("plate");
    let newArr = this.state.emptyPlates;
    let eatenSushi;

    this.state.fourSushi.forEach(sushi => {
      if (sushi.id === id) {
        eatenSushi = sushi;
      }
    });
    let newValue = this.state.wallet - eatenSushi.price;
    // debugger;

    if (newValue > 0) {
      this.setState({
        wallet: newValue,
        fourSushi: sushis,
        emptyPlates: newArr
      });
    }
  };

  render() {
    return (
      <div className="app">
        <SushiContainer
          sushi={this.state.fourSushi}
          nextSushi={this.nextSushi}
          eatSushi={this.eatSushi}
        />
        <Table arr={this.state.emptyPlates} money={this.state.wallet} />
      </div>
    );
  }
}

export default App;
