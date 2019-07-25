import React, { Component } from 'react';
import moment from 'moment';

class Timer extends Component {
  constructor(props) {
    super(props);

    this.date = moment(props.date);
    this.intervalId = null;

    this.state = {
      visibleDate: this.calculate()
    };
  }

  dateUpdate = () => {
    this.setState({
      visibleDate: this.calculate()
    });
  }

  calculate = () => {
    let diff = this.date.diff(moment());
    if (diff < 0) {
      return this.props.finishedText;
    }
    return moment.utc(diff).format("HH:mm:ss");
  }

  componentDidUpdate() {
    this.date = moment(this.props.date);
  }

  componentDidMount() {
    this.intervalId = setInterval(this.dateUpdate, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  render() {
    return (
      <div>
        {this.state.visibleDate}
      </div>
    );
  }
}

export default Timer;
