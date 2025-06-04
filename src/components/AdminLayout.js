import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header';
import Sidebar from '../Sidebar';
import Messenger from '../Messenger';
import { MyContext } from '../../App';

const AdminLayout = () => {
  const context = React.useContext(MyContext);
  const { isToggleSidebar, isHideSidebarAndHeader, isMessenger } = context;

  return (
    <div className='main d-flex'>
      {!isHideSidebarAndHeader && <Header />}
      {!isHideSidebarAndHeader && (
        <div className={`sidebarWrapper ${isToggleSidebar ? 'toggle' : ''}`}>
          <Sidebar />
        </div>
      )}

      {isMessenger && (
        <div className={`MessengerWrapper ${isToggleSidebar ? 'toggle' : ''}`}>
          <Messenger />
        </div>
      )}

      <div className={`content ${isHideSidebarAndHeader ? 'full' : ''} ${isToggleSidebar ? 'toggle' : ''}`}>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
