import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/home';
import Nav from './components/Nav';
import PageNotFound from './components/404';
import HourlyeventsChart from './components/HourlyeventsChart';
import Dailyeventschart from './components/Dailyeventschart'
import DailyStateChart from './components/DailyStateChart'
import GioMap from './components/GioMap'


function App() {
  return (
    <>
      <BrowserRouter>
        <Nav/>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/hourlyeventsChart' element={<HourlyeventsChart/>}></Route>
          <Route path='/dailyeventschart' element={<Dailyeventschart/>}></Route>
          <Route path='/dailystatechart' element={<DailyStateChart/>}></Route>
          <Route path='/gioMap' element={<GioMap/>}></Route>
          <Route path='*' element={<PageNotFound/>}></Route>
        </Routes>
      </BrowserRouter>
      
    </>
  );
}

export default App;
