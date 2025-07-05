"use client";
import { useRouter } from "next/navigation";
import { Menu } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { StudentItems } from "../app/store/data";
import "./Side.module.css";
import { auth } from "../firebase/Firebase";

const SideMenu = () => {
  const router = useRouter();

  const handleNavigation = (sectionId) => {
    if (sectionId.startsWith("/")) {
      router.push(sectionId);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLogout = () => {
    auth.signOut().then(() => {
      console.log("User signed out");
      router.push("/");
    });
  };

  const menuItems = [
    ...StudentItems.map((item) => ({
      key: item.key,
      icon: item.icon ? <item.icon /> : null,
      label: item.label,
      onClick: () => handleNavigation(item.sectionId),
    })),
    {
      key: "logout",
      icon: <LogoutOutlined />,
      label: "Logout",
      danger: true,
      style: {
        position: "absolute",
        bottom: "20px",
        width: "100%",
      },
      onClick: handleLogout,
    },
  ];

  return (
    <div className="SideMenuFeatures">
      <Menu
        mode="vertical"
        theme="dark"
        defaultSelectedKeys={[StudentItems?.[0]?.key || ""]}
        selectable
        items={menuItems}
      />
    </div>
  );
};

export default SideMenu;
