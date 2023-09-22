import Navbar from './Navbar';
import Home from './Home';

function App() {
  return (
    <div className="App container is-max-desktop">
      <Navbar />
      <div className="content">
        <Home />
      </div>
    </div>
  );
}

export default App;
