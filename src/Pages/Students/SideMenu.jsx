import { Menu } from "antd";
import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Side.css';

function SideMenu(props) {
    const [selectedKey, setSelectedKey] = useState('profile-section');
    const selectedKeyRef = useRef('profile-section');
    const navigate = useNavigate();
    const location = useLocation();

    // Keep ref in sync with selectedKey
    useEffect(() => {
        selectedKeyRef.current = selectedKey;
    }, [selectedKey]);

    const scrollToSection = (sectionId) => {
        if (sectionId === 'edit') {
            navigate('/home/edit');
            setSelectedKey(sectionId);
        } else {
            if (location.pathname !== '/home') {
                navigate('/home');
            }
            setTimeout(() => {
                const element = document.getElementById(sectionId);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    setSelectedKey(sectionId);
                }
            }, 100);
        }
    };

    // useEffect(() => {
    //     if (location.pathname !== '/home') return;

    //     const handleScroll = debounce(() => {
    //         const sections = props.items.map(item => ({
    //             id: item.key,
    //             element: document.getElementById(item.key)
    //         }));

    //         const viewportCenter = window.innerHeight / 2;
    //         let closestSection = selectedKeyRef.current;
    //         let minDistance = Infinity;

    //         sections.forEach(({ id, element }) => {
    //             if (element) {
    //                 const rect = element.getBoundingClientRect();
    //                 const elementCenter = rect.top + rect.height / 2;
    //                 const distance = Math.abs(viewportCenter - elementCenter);
    //                 if (distance < minDistance) {
    //                     minDistance = distance;
    //                     closestSection = id;
    //                 }
    //             }
    //         });

    //         if (closestSection !== selectedKeyRef.current) {
    //             setSelectedKey(closestSection);
    //         }
    //     }, 100); // Adjust debounce delay as needed

    //     window.addEventListener('scroll', handleScroll);
    //     return () => window.removeEventListener('scroll', handleScroll);
    // }, [props.items, location.pathname]);

    useEffect(() => {
        if (location.pathname === '/home' && selectedKey === 'edit') {
            setSelectedKey('profile-section');
        }
    }, [location.pathname]);

    return (
        <div className="SideMenu">
            <Menu
                forceSubMenuRender={true}
                onClick={(item) => {
                    scrollToSection(item.key);
                }}
                style={{
                    position: 'fixed',
                    width: '100%',
                }}
                selectedKeys={[selectedKey]}
                items={props.items}
                theme="dark"
            />
        </div>
    );
}

export default SideMenu;
