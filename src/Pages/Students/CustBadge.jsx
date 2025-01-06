import { Image,Typography } from "antd";

const CustBadge = (props)=>{
    const {name,description,id,img} = props.content
    return(
    <div className="badge" key={id} >
        <div className="badge-icon">
        {/* <img src={img} alt="Logo"/> */}

        <Image 
            src={img} style={{borderRadius:'20px'}}className="badge-img" ></Image>
            <h5 style={{color:'white'}}>{name?name:''}</h5>
        </div>
        {/* <div class="badge-text">
          <h3>{name?name:'C Programming'}</h3>
          <Typography.Text style={{color:'white',fontSize:'15px',width:'200px',wordBreak:'break-word'}}>{description?description:'Problem Solving'}</Typography.Text>
          <p>{description?description:'Problem Solving'}</p>
        </div> */}
      </div>
    )
}

export default CustBadge;