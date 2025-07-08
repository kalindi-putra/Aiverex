"use client" ;
import React, { useState, useEffect } from 'react';
import CodeEditor from '../app/student/codeEditor/page';
import axios from 'axios';

function CodeEditorTest() {
  const [testCase, setTestCase] = useState('success');
  
  // Mock different responses
  const mockResponses = {
    success: { data: { output: 'Success output!' } },
    error: { output: 'Error executing code.' },
    loading: { data: { output: 'Loading...' } }
  };

  // Override axios.post with a mock implementation
  useEffect(() => {
    const originalAxiosPost = axios.post;
    
    axios.post = (url, data) => {
      return new Promise((resolve, reject) => {
        switch(testCase) {
          case 'success':
            setTimeout(() => resolve(mockResponses.success), 500);
            break;
          case 'error':
            setTimeout(() => reject(mockResponses.error), 500);
            break;
          case 'loading':
            setTimeout(() => resolve(mockResponses.loading), 3000);
            break;
          default:
            resolve(mockResponses.success);
        }
      });
    };

    // Cleanup function to restore original axios.post
    return () => {
      axios.post = originalAxiosPost;
    };
  }, [testCase]);

  const sampleCode = {
    python3: 'print("Hello World")',
    java: 'class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello World");\n  }\n}',
    cpp: '#include <iostream>\nint main() {\n  std::cout << "Hello World";\n  return 0;\n}'
  };

  // Better way to update form values
  const handleLoadSample = (lang, code) => {
    const textArea = document.querySelector('textarea');
    const select = document.querySelector('select');
    if (textArea && select) {
      // Create a proper change event
      const changeEvent = new Event('change', { bubbles: true });
      
      // Update textarea
      textArea.value = code;
      Object.defineProperty(changeEvent, 'target', { value: textArea });
      textArea.dispatchEvent(changeEvent);
      
      // Update select
      select.value = lang;
      Object.defineProperty(changeEvent, 'target', { value: select });
      select.dispatchEvent(changeEvent);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Code Editor Test Environment</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>Test Scenarios:</h3>
        <button 
          onClick={() => setTestCase('success')}
          style={{ backgroundColor: testCase === 'success' ? '#4CAF50' : '' }}
        >
          Test Success
        </button>
        <button 
          onClick={() => setTestCase('error')}
          style={{ backgroundColor: testCase === 'error' ? '#f44336' : '' }}
        >
          Test Error
        </button>
        <button 
          onClick={() => setTestCase('loading')}
          style={{ backgroundColor: testCase === 'loading' ? '#2196F3' : '' }}
        >
          Test Loading
        </button>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>Sample Code:</h3>
        {Object.entries(sampleCode).map(([lang, code]) => (
          <button 
            key={lang}
            onClick={() => handleLoadSample(lang, code)}
            style={{ marginRight: '10px' }}
          >
            Load {lang} Sample
          </button>
        ))}
      </div>

      <div style={{ border: '1px solid #ccc', padding: '20px' }}>
        <CodeEditor />
      </div>

      <div style={{ marginTop: '20px' }}>
        <h3>Current Test Case: {testCase}</h3>
        <pre style={{ backgroundColor: '#f5f5f5', padding: '10px' }}>
          {JSON.stringify(mockResponses[testCase], null, 2)}
        </pre>
      </div>
    </div>
  );
}

export default CodeEditorTest;

