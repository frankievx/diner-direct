import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import Dialog from '../components/global/Dialog'
const MainLayout = ({ children }) => (
  <div className="bg-light h-screen">
    <Header />
    <div className="flex bg-light">
      <div className="h-screen w-full rounded-xl bg-light">{children}</div>
    </div>
  </div>
);

export default MainLayout;