import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../context/UserContext';
import { Layout, Space, Typography, Row, Col, Avatar, Button, Tag, Modal, Input, Form, Select, Upload } from 'antd';
import { EditOutlined,FileProtectOutlined, UserOutlined, UploadOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import styles from './layout.module.css';
import { db, auth } from '../../firebase/Firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { initializeApp } from 'firebase/app';
import { Outlet } from 'react-router-dom';

const { Footer } = Layout;

const StudentLayout = () => {
  const [user] = useAuthState(auth);
  const { userData } = useContext(AuthContext);
  //include certifications state here with null or 0
  const [studentData, setStudentData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSkillModalVisible, setIsSkillModalVisible] = useState(false);
  const [isEducationModalVisible, setIsEducationModalVisible] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);  // To track which skill is being edited
  const [editingEducation, setEditingEducation] = useState(null); // To track which education is being edited
  const [isPhotoUploading, setIsPhotoUploading] = useState(false);
  const [isGitHubModalVisible, setIsGitHubModalVisible] = useState(false);
  const [isResumeModalVisible, setIsResumeModalVisible] = useState(false);
  const [certifiedSkills, setCertifiedSkills] = useState(null);

  const softwareEngineeringSkills = [
    'JavaScript',
    'Python',
    'Java',
    'C++',
    'HTML/CSS',
    'React',
    'Node.js',
    'Angular',
    'SQL',
    'MongoDB',
    'Git',
    'Docker',
    'Kubernetes',
    'AWS',
    'Azure',
    'Machine Learning',
    'Data Structures & Algorithms',
    'Problem Solving',
  ];

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const docRef = doc(db, 'students', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setStudentData(docSnap.data());
          setCertifiedSkills(docSnap.data().certifiedSkills || []); // Fetch certified skills
        } else {
          setStudentData(null);
          setCertifiedSkills([]);
        }
        setIsLoading(false);
      }
    };
    fetchData();
  }, [user]);

  const handleProfilePhotoUpload = async (file) => {
  console.log("Uploading file:", file);
  setIsPhotoUploading(true);
  console.log(user)
  try {

    const storage = getStorage();
    const storageRef = ref(storage, `profilePhotos/${user.uid}`);
    console.log("Storage Reference:", storageRef);
    // Try uploading the file
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    console.log("Inside tyr")
    console.log("Download URL:", downloadURL);
    await handleSaveData({ photoURL: downloadURL });

    setStudentData(prev => ({ ...prev, photoURL: downloadURL }));
  } catch (error) {
    console.error("Error in upload or getDownloadURL:", error);  // Log the error clearly
  } finally {
    setIsPhotoUploading(false);
  }
};
  const handleAddGitHub = async (values) => {
    handleSaveData({ github: values.github });
    setIsGitHubModalVisible(false);
  };
  const handleEditGitHub = async (values) => {
    handleSaveData({ github: values.github });
    setIsEditingGitHub(false);
  };
  const handleAddResume = async (values) => {
    handleSaveData({ resume: values.resume });
    setIsResumeModalVisible(false);
  };
  const handleEditResume = async (values) => {
    handleSaveData({ resume: values.resume });
    setIsEditingResume(false);
  };

  const handleSaveData = async (newData) => {
    try {
      const docRef = doc(db, 'students', user.uid);
      await setDoc(docRef, { ...studentData, ...newData }, { merge: true });
      setStudentData(prev => ({ ...prev, ...newData }));
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const handleAddSkills = async (values) => {
    handleSaveData({ skills: [...(studentData?.skills || []), values.skill] });
    setIsSkillModalVisible(false);
  };

  const handleAddEducation = async (values) => {
    const newEducation = { title: values.title, name: values.institution, year: values.year };
    handleSaveData({ education: [...(studentData?.education || []), newEducation] });
    setIsEducationModalVisible(false);
  };

  const handleEditSkill = async (values) => {
    const updatedSkills = studentData.skills.map((skill) => 
      skill === editingSkill ? values.skill : skill
    );
    handleSaveData({ skills: updatedSkills });
    setIsSkillModalVisible(false);
    setEditingSkill(null);
  };

  const handleEditEducation = async (values) => {
    const updatedEducation = studentData.education.map((edu) => 
      edu === editingEducation ? { ...edu, ...values } : edu
    );
    handleSaveData({ education: updatedEducation });
    setIsEducationModalVisible(false);
    setEditingEducation(null);
  };

  const handleDeleteSkill = async (skill) => {
    const updatedSkills = studentData.skills.filter((item) => item !== skill);
    handleSaveData({ skills: updatedSkills });
  };

  const handleDeleteEducation = async (education) => {
    const updatedEducation = studentData.education.filter((item) => item !== education);
    handleSaveData({ education: updatedEducation });
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <Space direction='vertical' style={{ width: '100%' }} size={[0, 48]}>
      <Layout>
        <Typography.Title level={2} style={{ color: '#fff', textAlign: 'center' }}>Student Dashboard</Typography.Title>

        <Footer style={{ background: '#343434', padding: 20, borderRadius: '20px' }}>
        <div className={styles.profileDiv}>
                <div className={styles.profilePhotoContainer}>
                  {studentData?.photoURL ? (
                    <img src={studentData.photoURL} className={styles.profileImage} alt="Profile" />
                  ) : (
                    <Avatar
                      size={100}
                      icon={<UserOutlined />}
                      className={styles.defaultAvatar}
                    />
                  )}
                  <Upload
                    showUploadList={false}
                    beforeUpload={(file) => {
                      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
                      if (!isJpgOrPng) {
                        alert('You can only upload JPEG or PNG files!');
                        return false;
                      }
                      handleProfilePhotoUpload(file);
                      return false; 
                    }}
                  >
                    <Button
                      className={styles.uploadButton}
                      icon={<EditOutlined />}
                      disabled={isPhotoUploading}
                    />
                  </Upload>
                </div>
                <div className={styles.profileDetails}>
                  <span className={styles.name}>{user?.displayName}</span><br></br>
                  <div style={{paddingTop:"10px"}}>
                  <Button onClick={() => auth.signOut()} className={styles.signOutButton}>
                    Sign out
                  </Button>
                  </div>
                  <Button type="primary" className={styles.editProfileButton}>
                    Edit Profile
                  </Button>
                  <div className={styles.profileLinks}>
                    {studentData?.github ? (
                      <Button type="link" href={studentData.github} target="_blank">
                        GitHub
                      </Button>
                    ) : (
                      <Button onClick={() => setIsGitHubModalVisible(true)}>Add GitHub</Button>
                    )}
                    {studentData?.resume ? (
                      <Button type="link" href={studentData.resume} target="_blank">
                        Resume
                      </Button>
                    ) : (
                      <Button onClick={() => setIsResumeModalVisible(true)}>Add Resume</Button>
                    )}
                  </div>
                </div>
              </div>

          <div className={styles.skillsSection}>
            <Typography.Title level={4} className={styles.sectionTitle}>Skills</Typography.Title>
            <div className={styles.skillTags}>
              {studentData?.skills?.length > 0 ? (
                studentData.skills.map((tag, i) => (
                  <Tag 
                    color={i % 2 === 0 ? 'geekblue' : 'green'} 
                    key={i} 
                    className={styles.skillTag}
                  >
                    {tag} 
                    <Button 
                      size="small" 
                      className={styles.deleteButton} 
                      onClick={() => handleDeleteSkill(tag)}
                    >
                      Delete
                    </Button>
                  </Tag>
                ))
              ) : (
                <div></div>
              )}
            </div>
            {/* Add Skills button always visible */}
            <Button type="dashed" onClick={() => setIsSkillModalVisible(true)} className={styles.addButton}>
              Add Skills
            </Button>
          </div>
          <hr></hr>
          <div className={styles.educationSection}>
            <Typography.Title level={4} className={styles.sectionTitle}>
              <FileProtectOutlined /> Education
            </Typography.Title>
            {studentData?.education?.length > 0 ? (
              <ul className={styles.educationList}>
                {studentData.education.map((edu, index) => (
                  <li key={index} className={styles.educationItem}>
                    <Typography.Title level={5}>{edu.title}</Typography.Title>
                    <Typography.Text>{edu.name} ({edu.year})</Typography.Text>
                    <Button 
                      size="small" 
                      className={styles.editButton} 
                      onClick={() => { setEditingEducation(edu); setIsEducationModalVisible(true); }}
                    >
                      Edit
                    </Button>
                    <Button 
                      size="small" 
                      className={styles.deleteButton} 
                      onClick={() => handleDeleteEducation(edu)}
                    >
                      Delete
                    </Button>
                  </li>
                ))}
              </ul>
            ) : (<div>
              </div>
            )}
            {/* Add Education button always visible */}
            <Button type="dashed" onClick={() => setIsEducationModalVisible(true)} className={styles.addButton}>
              Add Education
            </Button>
          </div>
          <hr></hr>
          <div className={styles.certifiedSkillsSection}>
            <Typography.Title level={4} className={styles.sectionTitle}>
              Certified Skills
            </Typography.Title>
            {certifiedSkills && certifiedSkills.length > 0 ? (
              <div className={styles.skillTags}>
                {certifiedSkills.map((skill, index) => (
                  <Tag color={index % 2 === 0 ? 'volcano' : 'blue'} key={index} className={styles.skillTag}>
                    {skill}
                  </Tag>
                ))}
              </div>
            ) : (
              <Typography.Text>You haven't earned any certified skills yet. Take a test to start earning certifications.</Typography.Text>
            )}
          </div>
        </Footer>

        {/* Skill Modal */}
        <Modal
          title="Add GitHub Link"
          visible={isGitHubModalVisible}
          onCancel={() => setIsGitHubModalVisible(false)}
          footer={null}
        >
          <Form onFinish={handleAddGitHub}>
            <Form.Item label="GitHub URL" name="github" rules={[{ required: true, message: 'Please enter your GitHub link' }]}>
              <Input placeholder="Enter GitHub link" />
            </Form.Item>
            <Button type="primary" htmlType="submit">Save GitHub</Button>
          </Form>
        </Modal>

        {/* Resume Modal */}
        <Modal
          title="Add Resume Link"
          visible={isResumeModalVisible}
          onCancel={() => setIsResumeModalVisible(false)}
          footer={null}
        >
          <Form onFinish={handleAddResume}>
            <Form.Item label="Resume URL" name="resume" rules={[{ required: true, message: 'Please enter your Resume link' }]}>
              <Input placeholder="Enter Resume link" />
            </Form.Item>
            <Button type="primary" htmlType="submit">Save Resume</Button>
          </Form>
        </Modal>
        <Modal
          title={editingSkill ? "Edit Skill" : "Add Skill"}
          visible={isSkillModalVisible}
          onCancel={() => { setIsSkillModalVisible(false); setEditingSkill(null); }}
          footer={null}
        >
          <Form onFinish={editingSkill ? handleEditSkill : handleAddSkills} initialValues={{ skill: editingSkill }}>
            <Form.Item label="Skill" name="skill" rules={[{ required: true, message: 'Please select a skill' }]}>
              <Select placeholder="Select a skill">
                {softwareEngineeringSkills.map((skill, index) => (
                  <Select.Option key={index} value={skill}>{skill}</Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Button type="primary" htmlType="submit" className={styles.submitButton}>{editingSkill ? 'Save Changes' : 'Save Skill'}</Button>
          </Form>
        </Modal>

        <Modal
          title={editingEducation ? "Edit Education" : "Add Education"}
          visible={isEducationModalVisible}
          onCancel={() => { setIsEducationModalVisible(false); setEditingEducation(null); }}
          footer={null}
        >
          <Form onFinish={editingEducation ? handleEditEducation : handleAddEducation} initialValues={editingEducation}>
            <Form.Item label="Institution Name" name="institution" rules={[{ required: true, message: 'Please provide an institution name' }]}>
              <Input placeholder="Institution" />
            </Form.Item>
            <Form.Item label="Title" name="title" rules={[{ required: true, message: 'Please provide a title' }]}>
              <Input placeholder="Degree/Certification" />
            </Form.Item>
            <Form.Item label="Year" name="year" rules={[{ required: true, message: 'Please provide a year' }]}>
              <Input placeholder="Year of Completion" />
            </Form.Item>
            <Button type="primary" htmlType="submit" className={styles.submitButton}>{editingEducation ? 'Save Changes' : 'Save Education'}</Button>
          </Form>
        </Modal>
      </Layout>
      <Outlet/>
    </Space>
  );
};

export default StudentLayout;
