import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import ExpensePage from './pages/ExpensePage/ExpensePage';


export default function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/expense" element={<ExpensePage />} />
          <Route path="/income" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}