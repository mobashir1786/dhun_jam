import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './component/Login';
import Chart from './component/Chart';

function App() {
  let cookie = document.cookie;
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={cookie ? <Chart /> : <Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
