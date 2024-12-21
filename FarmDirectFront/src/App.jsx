import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage/HomePage';
import MedicinePage from './Pages/MedicinePage/MadicinePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/medicine" element={<MedicinePage />} />
      </Routes>
    </Router>
  )
}

export default App
