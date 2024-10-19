import './App.css';
import { Navbar } from './Components/Navbar';
import { Header } from './Components/Header';
import { DashBoard } from './Pages/DashBoard';
import { Routes, Route } from 'react-router-dom';
import { MyProjects } from './Pages/MyProjects';
import { Home } from './Pages/Home';

function App() {
  return (
    <div className='flex flex-row h-screen bg-white font-inter'>
      {/* left side panel */}
      <div className='md:max-w-[16.66%] border-r border-[#DBDBDB] '>
        <Navbar />
      </div>

      {/* right side */}
      <aside className='flex flex-col w-full'>
        <Header />
        <main className='px-8 pt-8 space-x-2 h-screen  overflow-x-scroll '>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/myProjects" element={<MyProjects />} />
            <Route path="/myProjects/:projectTitle" element={<DashBoard/>} />
          </Routes>
        </main>
      </aside>
    </div>
  );
}

export default App;
