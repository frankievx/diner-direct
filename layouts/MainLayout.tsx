import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
const MainLayout = ({ children }) => (
  <div className="bg-light h-screen">
    <Header />
    <div className="flex bg-light">
      {/* <div className="h-screen w-20 bg-white">
        <Sidebar />
      </div> */}
      <div className="h-screen w-full rounded-xl bg-light">{children}</div>
    </div>
  </div>
);

export default MainLayout;