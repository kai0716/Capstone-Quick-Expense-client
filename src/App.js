import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import './App.scss';

export default function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<LoginPage />} /> */}
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}