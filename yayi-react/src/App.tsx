import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Agenda from "./pages/Agenda";
import News from "./pages/News";
import Gallery from "./pages/Gallery";
import TrackRecord from "./pages/TrackRecord";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/agenda" element={<Agenda />} />
      <Route path="/news" element={<News />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/track-record" element={<TrackRecord />} />
    </Routes>
  );
}

export default App;