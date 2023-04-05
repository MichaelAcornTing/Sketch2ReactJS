import './App.css';
import { Routes, Route, Link } from 'react-router-dom';

// Pages 
import Home from './Components/Home/Home';
import Tutorial from './Components/Tutorial/Tutorial'; 
import Main from './Components/Main/Main'; 
import SketchExamples from './Components/SketchExamples/SketchExamples';
import Conversion from './Components/Conversion/Conversion';
import Elements from './Components/Tags/Elements';
 


function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tutorial" element={<Tutorial />} />
        <Route path="/main" element={<Main />} />
        <Route path="/tags" element={<Elements />} />
        <Route path="/sketch-examples" element={<SketchExamples />} />
        <Route path="/conversion" element={<Conversion />} />
      </Routes>
  );
}

export default App;
