import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./AppLayout";
import SendPage from "./pages/SendPage";
import ClaimPage from "./pages/ClaimPage";
import FeedPage from "./pages/FeedPage";
import TagPage from './pages/TagPage';
import CoinsPage from './pages/CoinsPage';
import LandingPage from './pages/LandingPage';

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
         <Route path="/" element={<LandingPage />} />
        <Route path="/app" element={<AppLayout />}>
          <Route path="tag" element={<TagPage />} />
          <Route path="coins" element={<CoinsPage />} />
          <Route path="send" element={<SendPage />} />
          <Route path="claim" element={<ClaimPage />} />
          <Route path="feed" element={<FeedPage />} />
        </Route>

        <Route
          path="/"
          element={<Navigate to="/app/tag" replace />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
