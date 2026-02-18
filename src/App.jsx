import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Writing from './pages/Writing';
import WritingPiece from './pages/WritingPiece';
import Bookshelf from './pages/Bookshelf';
import Work from './pages/Work';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-beige">
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/writing" element={<Writing />} />
          <Route path="/writing/:slug" element={<WritingPiece />} />
          <Route path="/bookshelf" element={<Bookshelf />} />
          <Route path="/work" element={<Work />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
