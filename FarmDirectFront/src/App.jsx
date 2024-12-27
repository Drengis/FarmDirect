import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage/HomePage';
import MedicinePage from './Pages/MedicinePage/MedicinePage';
import Medicine_DictPage from './Pages/Medicine_DictPage/Medicine_DictPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/medicine_list" element={<Medicine_DictPage />} />
        <Route path="/medicine" element={<MedicinePage />} />
      </Routes>
    </Router>
  )
}

export default App
