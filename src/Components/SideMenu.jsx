import { useRouter } from 'next/navigation';
import { Menu } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { StudentItems } from '../store/data';
import './Side.module.css';
import { auth } from '../firebase/Firebase';

const SideMenu = () => {
  const router = useRouter();
  const handleNavigation = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (sectionId.startsWith('/')) {
      router.push(sectionId);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }

  };

  const handleLogout = () => {
    auth.signOut().then(() => {
      console.log('User signed out');
      router.push('/');
    });
  };

  return (
    <div className="SideMenuFeatures">
      <Menu
        mode="vertical"
        theme="dark"
        defaultSelectedKeys={[StudentItems?.[0]?.key || '']}
        selectable
      >
        {StudentItems.map((item) => (
          <Menu.Item
            key={item.key}
            icon={<item.icon />}
            style={{ marginBottom: '20px' }}
            onClick={() => handleNavigation(item.sectionId)}
          >
            {item.label}
          </Menu.Item>
        ))}
        <Menu.Item
          key="logout"
          icon={<LogoutOutlined />}
          danger
          onClick={handleLogout}
          style={{
            position: 'absolute',
            bottom: '20px',
            width: '100%',
          }}
        >
          Logout
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default SideMenu;
