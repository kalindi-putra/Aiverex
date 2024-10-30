
import { Menu } from "antd";
import { useNavigate } from 'react-router-dom';
import './Side.css'
function SideMenu(props) {
    const navigate = useNavigate()
    return (

        <div className="SideMenu">
        
        <Menu forceSubMenuRender={true} 
        onClick={(item)=>{
            //item.key
            navigate(item.key);
        }
        }
        style={{
            position:'fixed',
            width:'100%',

        }}
            items={props.items}></Menu>
    </div>
    );
}

export default SideMenu;