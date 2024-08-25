import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import CarInfo from './components/CarInfo';
import AboutUs from './components/AboutUs';
import PageFooter from './components/PageFooter';
import Favorites from './components/Favorites';
import InsightsPage from './components/InsightsPage';

function App() {
  return (
    <Router basename='/car-analytics/'>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/car/:id" element={<CarInfo />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/insights" element={<InsightsPage />} />
      </Routes>
      <PageFooter />
    </Router>
  );
}

export default App;
