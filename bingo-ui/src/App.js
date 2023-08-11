import logo from './logo.svg';
import './App.css';
import BingoCard from './bingo/bingoCard';
import { BingoCounterProvider } from './bingo/context-api/bCountProvider';

function App() {
  return (
    <div className="App">
      <BingoCounterProvider>
      <BingoCard/>
      </BingoCounterProvider>
     

    </div>
  );
}

export default App;
