import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Typography, Space, Button, Tooltip } from 'antd';
import { FolderFilled, FileFilled } from '@ant-design/icons';
import styles from './Github.module.css';
import atob from 'atob'
import CodeReviewMentor from './CodeReviewMentor';
const env = import.meta.env;
const owner = env.VITE_GITHUB_USER;
const repo = env.VITE_GITHUB_REPO;
const token = env.VITE_GITHUB_API_TOKEN;
// console.log(env)
const contentsStyle = {
  height: '100%',
  color: '#fff',
  background: '#343434',
  margin: 10,
  borderRadius: '30px',
  overflow: 'hidden',
  padding:10
};

const GitHubExplorer = () => {
  const [folders, setFolders] = useState([]);
  const [currentPath, setCurrentPath] = useState('');
  const [gitContent,setGitContent] = useState()

  useEffect(() => {
    fetchFolders('');
  }, []);

  const fetchFolders = async (path) => {
    try {
      const response = await axios.get(
        `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200 || response.status === 201) {
        const data = response.data;
        setFolders(data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const fetchFileDetails = async (path) => {
    try {
      const response = await axios.get(
        `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200 || response.status === 201) {
        const data = response.data;
        setGitContent(atob(data.content))
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleFolderClick = (folder) => {
    if (folder.type === 'dir') {
      setCurrentPath(folder.path);
      fetchFolders(folder.path);
    }else if(folder.type==='file'){
      console.log(folder.path,'file')
      setCurrentPath(folder.path);
      fetchFileDetails(folder.path)
    }
  };

  const handleGoBack = () => {
    const newPath = currentPath.split('/').slice(0, -1).join('/');
    setGitContent(null)
    fetchFolders(newPath);
    setCurrentPath(newPath);
  };


  return (
    <div className={styles['github-explorer']} style={contentsStyle}>
      {!gitContent?<Space direction="vertical" className={styles['space']}>
      <h2 className={styles['h2']}>GitHub Explorer</h2>
      {currentPath && (
        <Button type="link" className={`${styles['goBack']}`} onClick={handleGoBack}>
          <FolderFilled className={styles['folder-icon']} /> ..
        </Button>
      )}
        {folders.map((folder) => (
          <Card
            key={folder.name}
            onClick={() => handleFolderClick(folder)}
            className={styles['card']}
            hoverable
          >
            {/* <Tooltip title={folder.type === 'dir' ? 'Folder' : 'File'}> */}
              {folder.type === 'dir' ? (
                <FolderFilled className={styles['folder-icon']} />
              ) : (
                <FileFilled className={styles['file-icon']} />
              )}
            {/* </Tooltip> */}
            <Typography.Text >{folder.name}</Typography.Text>
          </Card>
        ))}
      </Space>:
      <CodeReviewMentor gitContent={gitContent} goBack={handleGoBack} />
      }
    </div>
  );
};

export default GitHubExplorer;