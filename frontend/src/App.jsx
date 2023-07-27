import logo from './assets/logo.jpg';
import Footer from './components/Footer';
import OverAllStatistics from './components/graphScreens/OverAllStatistics';
import ThreeDay from './components/graphScreens/ThreeDay';
export default function App() {
  return (
    <div className="w-[100%] flex flex-col justify-center items-center gap-7">
      {/* Nav Bar*/}
      <div className="w-[100%] h-[70px] flex justify-center items-center shadow-lg gap-5">
        <img className='w-[60px] h-[60px] rounded' src={logo} style={{width:"60px",height:"60px"}}/>
        <h1 className='font-bold text-2xl mb-2'>COVID-19 Tracker</h1>
      </div>
      {/* Main Content (Graph Screens)*/}
      <OverAllStatistics></OverAllStatistics>
      <ThreeDay></ThreeDay>
      <Footer></Footer>
    </div>
  )
}