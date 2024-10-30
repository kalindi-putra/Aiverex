import React, { useState, useContext, useEffect } from 'react';
// import './Formsd.css'; // Make sure to adjust the CSS file path according to your project structure
import { Button, Card, Form, Input, Select } from 'antd';
import { Firestore } from 'firebase/firestore';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Option } from 'antd/es/mentions';
import { AuthContext } from '../context/UserContext';
import styles from './Form.module.css'

const SkillForms = () => {

  const { userData, handleProfileUpdate } = useContext(AuthContext);

  const [username, setUsername] = useState(userData?.username || '');
  const [email, setEmail] = useState(userData?.email ||'');
  const [firstName, setFirstName] = useState(userData?.firstName || '');
  const [lastName, setLastName] = useState(userData?.lastName || '');
  const [address, setAddress] = useState(userData?.address || '');
  const [city, setCity] = useState(userData?.city || '');
  const [country, setCountry] = useState(userData?.country || '');
  const [postalCode, setPostalCode] = useState(userData?.postalCode || '');
  const [aboutMe, setAboutMe] = useState(userData?.aboutMe || '');
  const [githubLink, setGithubLink] = useState(userData?.githubLink );
  const [resumeLink, setResumeLink] = useState(userData?.resumeLink || '');
  const [mobile, setMobile] = useState(userData?.mobile || '');
  const [gender, setGender] = useState(userData?.gender || '');
  const [prefixMobile, setPrefixMobile] = useState(userData?.prefixMobile || '+91');


  const handleOptionChange = (value, option) => {
    const name=option.props.name;
    setGender(name);
    console.log(name);
  }

  const handlePrefixChange = (value, option) => {
    const prefix = option.props.value;
    setPrefixMobile(prefix);
    console.log(prefix);
  }
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'username':
        setUsername(value);
        console.log(e);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'firstName':
        setFirstName(value);
        break;
      case 'lastName':
        setLastName(value);
        break;
      case 'githubLink':
        setGithubLink(value);
        console.log(e);
        break;
      case 'resumeLink':
        setResumeLink(value);
        console.log(e);
        break;
      case 'address':
        setAddress(value);
        break;
      case 'city':
        setCity(value);
        break;
      case 'country':
        setCountry(value);
        break;
      case 'postalCode':
        setPostalCode(value);
        console.log(e);
        break;
      case 'aboutMe':
        setAboutMe(value);
        break;
      case 'mobile':
        setMobile(value);
        break;
      case 'prefixMobile':
        setPrefixMobile(value);
        break;
    }
  };

  const handleSubmit = () => {
    const UpdatedData = {
      username,
      email,
      firstName,
      lastName,
      address,
      city,
      country,
      postalCode,
      aboutMe,
      mobile,
      gender,
      prefixMobile,
      githubLink,
      resumeLink,
    };

    handleProfileUpdate(UpdatedData);
    
 console.log('sent to the updatedData submitted');
  };

 

  const prefixSelector = (
    <Form.Item name="prefixMobile" 
    noStyle>
      <Select
      value={prefixMobile}
      onChange={handlePrefixChange}
        style={{
          width: 70,
        }}
      >
        <Option value="+91">+91</Option>
        <Option value="+87">+87</Option>
      </Select>
    </Form.Item>
  );
  
  return (
  
            <Card className={`${styles['card']} ${styles['bg-secondary shadow']}`} bordered={false}>
              <div className={`${styles['cardHeader']} ${styles['border-0']}`}>
                <div className={`${styles.row}`}>
                  <div className={`${styles.col-8}`}>
                    <h3 className={`${styles.mb-0}`}>My Profile</h3>
                 {/* [   <div className={`${styles['col-4']} ${styles['text-right']}`}>
                      <Button type="primary">Your</Button>
                    </div>] */}
                  </div>
                </div>
              </div>
              <div className={`${styles['card-body']}`}>
                <div className={`${styles['text-center']}`} >

                  <div className={`${styles['mx-auto']}`} style={{ width: 140,  display: 'block', marginLeft: 'auto', marginRight: 'auto', marginBottom: '10px' }}>
                    <div
                      className="center"
                      style={{ height: 140, backgroundColor: 'rgb(233, 236, 239)' }}
                      >
                      <span style={{ color: 'rgb(166, 168, 170)', fontWeight: 'bold', fontSize: '8pt',  }}>
                        140x140
                      </span>
                    </div>
                  </div>
                  <h4 className="pt-2 pb-1 mb-0 text-nowrap">{firstName} {lastName}</h4>
                  <p className="mb-0">@johnny.s</p>
                  <div className="text-muted">
                    <small>Joined 10 June 2023</small>
                  </div>
                  <div className="mt-2">
                    <button className="btn" type="button"
                    style={{backgroundColor: '#6B11DC', color: '#fff'}}>
                      <i className="fa fa-fw fa-camera"></i>
                      <span>Change Photo</span>
                    </button>
                  </div>
                  </div>
                <Form 
                layout='vertical'
                onFinish = {handleSubmit}>
                  <hr className={`${styles.my-4}`} />
                  <h6 className={`${styles['heading-small']} ${styles["text-muted"]} ${styles["mb-4"]}`}>User information</h6>
                  <div className={`${styles["pl-lg-4"]}`}>
                    <div className={`${styles["row"]}`}>
                      <div className={`${styles["col-lg-6"]}`}>
                        <div className={`${styles["form-group"]}`}>
                          <Form.Item
                          label='Username'
                          name = 'username'
                          className={`${styles['form-control-label']}`} >
                            <Input 
                            name='username'
                            placeholder='Username' 
                            className={`${styles['form-control']}`} 
                            value={ username } 
                            onChange={handleInputChange} />
                          </Form.Item>
                          
                        </div>
                      </div>
                      <div className={`${styles["col-lg-6"]}`}>
                        <div className={`${styles["form-group"]}`}>
                          <Form.Item 
                          label = 'Email'
                          name= 'email'
                          className={`${styles['form-control-label']}`}>
                            <Input
                            
                            type="email"
                            id="input-email"
                            className={`${styles['form-control']}`}
                            placeholder="jesse@example.com"
                            name="email"
                            value={email}
                            onChange={handleInputChange}/>
                          
                          </Form.Item>
                        </div>
                      </div>
                    </div>
                    <div className={`${styles["row"]}`}>
                    <div className={`${styles["col-lg-6"]}`}>
                    <div className={`${styles["form-group"]}`}>
                      
                          <Form.Item 
                          label= 'First Name'
                            required
                          name={'firstName'} 
                          className={`${styles['form-control-label']}`} >
                          <Input
                            type="text"
                            id="input-first-name"
                            className={`${styles['form-control']}`}
                            placeholder="First name"
                            name="firstName"
                            value={ firstName } 
                            onChange={handleInputChange}
                          />
                          </Form.Item>

                        </div>
                      </div>
                      <div className={`${styles["col-lg-6"]}`}>
                      <div className={`${styles["form-group"]}`}>
                        
                        <Form.Item 
                          label= 'Last Name'
                          className={`${styles['form-control-label']}`}
                          name={'lastName'} >
                          <Input
                            type="text"
                            id="input-last-name"
                            className={`${styles['form-control']}`}
                            placeholder="Last name"
                            name="lastName"
                            value={ lastName } 
                            onChange={handleInputChange}
                          />
                          </Form.Item>
                        </div>
                      </div>
                    </div>
                    
                    <div className={`${styles["row"]}`}>
                    <div className={`${styles["col-lg-6"]}`}>
                    <div className={`${styles["form-group"]}`}>
                          <Form.Item 
                          label= 'GitHub'                
                          name={'githubLink'} 
                          className={`${styles['form-control-label']}`} 
                          tooltip='Please paste your GitHub profile link below'>
                          <Input
                            type="text"                            
                            className={`${styles['form-control']}`}
                            placeholder="Github Link"
                            name='githubLink'
                            value={ githubLink }                            
                            onChange={handleInputChange}
                          />
                          </Form.Item>
                        </div>
                      </div>
                      <div className={`${styles["col-lg-6"]}`}>
                      <div className={`${styles["form-group"]}`}>
                          <Form.Item 
                          label= 'Resume'                
                          name={'resumeLink'} 
                          className={`${styles['form-control-label']}`}  
                          tooltip='Paste your Resume link below preferred source: Google Drive'                           
                          >
                          <Input
                            type="text"                            
                            className={`${styles['form-control']}`}
                            placeholder="Resume Link"
                            name='resumeLink'
                            value={ resumeLink }                            
                            onChange={handleInputChange}
                          />
                          </Form.Item>
                        </div>
                      </div>
                    </div>

                  </div>
                  <hr className="my-4" />
                  <h6 className={`${styles['heading-small']} ${styles["text-muted"]} ${styles["mb-4"]}`}>Contact information</h6>
                  <div className={`${styles["pl-lg-4"]}`}>
                  <div className={`${styles["row"]}`}>
                    <div className={`${styles["col-md-12"]}`}>
                      <div className={`${styles["form-group"]}`}>
                          <Form.Item 
                          className={`${styles['form-control-label']}`}   
                          label= 'Address' 
                          name={'address'}>

                          <Input
                            type="text"
                            
                            className={`${styles['form-control']}`}
                            placeholder="Address"
                            name="address"
                            value={ address }
                            onChange={handleInputChange}
                            />

                            </Form.Item>
                        </div>
                      </div>
                    </div>
                     <div className={`${styles["row"]}`}>
                    <div className={`${styles["col-lg-4"]}`}>
                      <div className={`${styles["form-group"]}`}>
                          <Form.Item className={`${styles['form-control-label']}`}  label= 'City' name={'city'}>

                            <Input
                            type="text"
                            id="input-city"
                            className={`${styles['form-control']}`}
                            placeholder="City"
                            name='city'
                            value={ city }
                            onChange={handleInputChange}
                            />

                          </Form.Item>
                        </div>
                      </div>
                      <div className={`${styles["col-lg-4"]}`}>
                      <div className={`${styles["form-group"]}`}>
                          <Form.Item className={`${styles['form-control-label']}`}  label= 'Country' name={'country'}>

                            <Input
                            type="text"
                            id="input-country"
                            className={`${styles['form-control']}`}
                            placeholder="Country"
                            name='country'
                            value={ country }
                            onChange={handleInputChange}
                            />

                            </Form.Item>
                        </div>
                      </div>
                      <div className={`${styles["col-lg-4"]}`}>
                      <div className={`${styles["form-group"]}`}>
                        <Form.Item className={`${styles['form-control-label']}`}  label= 'Postal Code' name={'postalCode'}>

                          <Input
                          type="text"
                          id="input-postal"
                          className={`${styles['form-control']}`}
                          placeholder="Postal Code"
                          name='postalCode'
                          value={ postalCode }
                          onChange={handleInputChange}
                          />

                        </Form.Item>
                        </div>
                      </div>
                    </div>
                    <div className={`${styles["row"]}`}>
                    <div className={`${styles["col-lg-6"]}`}>
                      <div className={`${styles["form-group"]}`}>
                        <Form.Item className={`${styles['form-control-label']}`} label= 'Mobile' name={'mobile'}>

                          <Input
                          type="text"
                          id="input-mobile"
                          name='mobile'
                          placeholder="Mobile Number"
                          addonBefore={prefixSelector}
                          style={{
                            width: '100%',
                            height: ''
                          }}
                          value={mobile} 
                          onChange={handleInputChange}
                          />

                        </Form.Item>
                        </div>
                      </div>
                      <div className={`${styles["col-lg-6"]}`}>
                      <div className={`${styles["form-group"]}`}>
                        <Form.Item className={`${styles['form-control-label']}`}  label= 'Gender' name={'gender'} >

                        <Select placeholder="select your gender" name={'gender'}
                        value={ gender } onChange={handleOptionChange}>
                          <Option name='male' value="male">Male</Option>
                          <Option name='female' value="female">Female</Option>
                          <Option name='other' value="other">Other</Option>
                        </Select>

                        </Form.Item>
                        </div>
                      </div>
                      </div>
                    </div>
            
                  
                  <hr className="my-4" />
                  <h6 className={`${styles['heading-small']} ${styles["text-muted"]} ${styles["mb-4"]}`}>About me</h6>
       <div className={`${styles["pl-lg-4"]}`}>
                   
                        <div className={`${styles["form-group"]}`}>
                      <Form.Item className={`${styles['form-control-label']}`} label='About Me' name={'aboutMe'}>

                      <Input.TextArea showCount maxLength={100}                        
                        style={{ height: 150}}
                        
                        placeholder="A few words about you..."
                        
                        name="aboutMe"
                        value={aboutMe }
                        onChange={handleInputChange}
                        />
                        </Form.Item>
                    </div>
                  </div>
                  <div className="text-center">
                    <Form.Item>
                    <Button type="primary" htmlType="submit"
                    style={{backgroundColor: '#6B11DC', color: '#fff'}}>
                      Save Changes
                    </Button>
                  </Form.Item>
                  </div>
                </Form>
              </div>
              </Card>
              
      
    
  );
};

export default SkillForms;
