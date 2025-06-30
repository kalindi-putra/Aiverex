import React, { useState } from 'react';
import { Card, Typography, Space, Button, Form, Input, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/Firebase';
import { db } from '../../firebase/Firebase';
import { useContext } from 'react';
import { AuthContext } from '../../context/UserContext';
import styles from './PostCode.module.css';

const isValidGitHubLink = (link) => {
  // Regular expression pattern for matching GitHub repository links
  const githubLinkPattern = /^(?:https?:\/\/)?(?:www\.)?github\.com\/[^\s/]+\/[^\s/]+$/;

  // Test if the link matches the pattern
  return githubLinkPattern.test(link);
};

const PostUrCode = () => {
  const [submitting, setSubmitting] = useState(false);
  const [form] = Form.useForm(); // Use Form hooks to get access to the form instance
  const navigate = useNavigate();
  const { userData } = useContext(AuthContext);
  const [user] = useAuthState(auth);

  const onFinish = async (values) => {
    const { repoLink } = values;
    if (isValidGitHubLink(repoLink) && !submitting) {
      // Valid GitHub link and not submitting, perform submission logic
      console.log('Submitted GitHub link:', repoLink);
      
      // Extract the username and repo from the GitHub link
      const regex = /github\.com\/([^\s/]+)\/([^\s/]+)/;
      const match = repoLink.match(regex);
      if (match && match.length === 3) {
        const username = match[1];
        const repo = match[2];
  
        // Store the username and repo in the Firebase submission collection
        const submissionData = {
          userId: user?.uid,
          owner: username,
          repo: repo,
          submittedBy: user?.uid,
          testName: 'Test Name',
        submittedAt: serverTimestamp(), 
        };
        console.log(user)
        console.log(submissionData);
        
        // Add the submission data to the submission collection
        try {
          // const submissionRef = doc(db, 'submission', user?.uid);
          // await setDoc(submissionRef, submissionData);
          // const submissionRef = doc(db, 'submission', user?.uid);
          // await setDoc(submissionRef, { tests: [submissionData] }, { merge: true });

          const submissionRef = await addDoc(collection(db, `submission/${user?.uid}/tests`), submissionData);

          console.log('Submission added with ID:', submissionRef.id);
  
          // Show success message
          message.success('Code submitted successfully!');
  
          // Disable the submit button
          setSubmitting(true);
  
          // Reset the form after a delay
          setTimeout(() => {
            setSubmitting(false);
            form.resetFields();
            navigate('/post/status'); // Redirect to the '/post/status' page
          }, 2000);
        } catch (error) {
          console.error('Error adding submission:', error);
          message.error('An error occurred while submitting the code. Please try again.');
        }
      } else {
        message.error('Invalid GitHub repository link');
      }
    } else {
      // Invalid GitHub link or already submitting
      message.error('Please enter a valid GitHub repository link');
    }
  };

  const onFinishFailed = () => {
    message.error('Submit failed!');
  };

  return (
    <div className={styles.PostCode} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Card style={{ width: '80vw', alignSelf: 'center', alignItems: 'center', border: 0, borderRadius: 30, background: '#282727' }}>
        <center>
          <Typography.Title>Post your Code!</Typography.Title>
        </center>
        <header className={styles.PostCodeHeader} >
          <Form
            className={styles.postForm}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            form={form} // Assign the form instance to the form prop
          >
            <Space direction="horizontal" size={0}>
              <Form.Item
                name="repoLink"
                rules={[
                  {
                    required: true,
                    validator: (_, value) => (isValidGitHubLink(value) ? Promise.resolve() : Promise.reject('Please enter a valid GitHub repository link')),
                  },
                ]}
                hasFeedback
              >
                <Input placeholder="Add your GitHub Repo Link" className={styles.postInput} />
              </Form.Item>
              <Form.Item>
                <Button className={styles.postBtn} htmlType="submit" disabled={submitting}>
                  {submitting ? 'Submitting...' : 'Submit'}
                </Button>
              </Form.Item>
            </Space>
          </Form>
        </header>
        <center>
          <Typography.Title level={3} style={{ color: '#BEBEBE' }}>
            Steps to Push Code to GitHub
          </Typography.Title>
        </center>
        <ol className={styles.Stepscode}>
          <li>Create a new repository on GitHub.</li>
          <li>Open the terminal and navigate to the directory where your code is stored.</li>
          <li>Initialize Git in that directory with the command "git init".</li>
          <li>Add all files to the staging area with the command "git add .".</li>
          <li>Commit your changes with a message describing the changes with the command "git commit -m "your commit message here"".</li>
          <li>Push your code to GitHub with the command "git push -u origin main".</li>
        </ol>
      </Card>
    </div>
  );
};

export default PostUrCode;
