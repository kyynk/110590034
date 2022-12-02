import React from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

function App() {
  return (
    <div className="App">
      <Game />
    </div>
  );
}
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

// history = [
//   // Before first move
//   {
//     squares: [
//       null, null, null,
//       null, null, null,
//       null, null, null,
//     ]
//   },
//   // After first move
//   {
//     squares: [
//       null, null, null,
//       null, 'X', null,
//       null, null, null,
//     ]
//   },
//   // After second move
//   {
//     squares: [
//       null, null, null,
//       null, 'X', null,
//       null, null, 'O',
//     ]
//   },
//   // ...
// ]
// class Square extends React.Component {
//   // constructor(props){
//   //   super(props);
//   //   this.state = {
//   //     value: null,
//   //   };
//   // }
//
//   render() {
//     return (
//       <button className="square" onClick={() => this.props.onClick()}>
//         {this.props.value/* TODO */}
//       </button>
//     );
//   }
// }

class Board extends React.Component {
  renderSquare(i) {
    return (<Square value={this.props.squares[i]} onClick={() => this.props.onClick(i)} />);
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      timerKey: true,
      xIsNext: true,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i] || this.state.timeIsUp) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      stepNumber: history.length,
      timerKey: !this.state.timerKey,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  handleTimeIsUp() {
    // this.state.timeIsUp = this.state.stepNumber;
    // if (this.state.timeIsUp != -1 && this.state.timeIsUp == this.state.stepNumber) {
    //   this.status = 'Winner: ' + (this.state.xIsNext ? 'O' : 'X');
    // }
    this.setState(
        {timeIsUp: true}
    )
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    let winner = calculateWinner(current.squares);

    if (!winner) {
        if (this.state.timeIsUp) {
            winner = this.state.xIsNext ? 'O' : 'X';
        }
    }

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else if (this.state.timeIsUp) {
      status = 'Winner: ' + (this.state.xIsNext ? 'O' : 'X');
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares} onClick={i => this.handleClick(i)}/>
        </div>
        <div className="game-info">
          <div>{status/* status */}</div>
          <ol>{moves/* TODO */}</ol>
        </div>
        <div>
    	  {/* Adding a timer */}
    	  <CountdownCircleTimer
    	 	isPlaying
    	 	duration={10}
    		colors={['#004777', '#F7B801', '#A30000', '#A30000']}
    		colorsTime={[7, 5, 2, 0]}
            key={this.state.timerKey}
            onComplete={() => this.handleTimeIsUp()}
    	  >
    		{({ remainingTime }) => remainingTime + ' seconds left!'}
    	  </CountdownCircleTimer>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default App;
