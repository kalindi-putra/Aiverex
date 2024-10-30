import { Image,Typography } from "antd";

const CustBadge = (props)=>{
    const {name,description,id,img} = props.content
    return(
    <div class="badge" key={id} >
        <div class="badge-icon">
        {/* <img src={img} alt="Logo"/> */}

        <Image 
            src={img} className="badge-img" ></Image>
            <h5>{name?name:''}</h5>
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