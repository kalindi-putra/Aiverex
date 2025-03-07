import React, { useState, useEffect } from 'react';
import { Card } from 'antd';
import AceEditor from 'react-ace';
import axios from 'axios';
import 'ace-builds/src-noconflict/mode-python';
import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/mode-c_cpp';
import 'ace-builds/src-noconflict/theme-monokai';


const CodeEditor = () => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('python3');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentProblem, setCurrentProblem] = useState({
    title: 'Two Sum',
    difficulty: 'Easy',
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.',
    examples: [
      {
        input: 'nums = [2,7,11,15], target = 9',
        output: '[0,1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
      },
      {
        input: 'nums = [3,2,4], target = 6',
        output: '[1,2]',
        explanation: 'Because nums[1] + nums[2] == 6, we return [1, 2].'
      }
    ],
    constraints: [
      '2 <= nums.length <= 104',
      '-109 <= nums[i] <= 109',
      '-109 <= target <= 109',
      'Only one valid answer exists.'
    ]
  });

  const templates = {
    python3: `def twoSum(nums, target):
    # Your code here
    pass

# Example usage:
nums = [2,7,11,15]
target = 9
print(twoSum(nums, target))`,
    java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        // Your code here
        return new int[]{};
    }
}`,
    cpp: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // Your code here
        return {};
    }
};`
  };

  useEffect(() => {
    setCode(templates[language]);
  }, [language]);

  const handleCodeChange = (value) => {
    setCode(value);
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };


  const handleSubmitCode = async () => {
    if (!currentUser) {
      setSubmissionMessage("You need to log in first.");
      return;
    }
  
    setIsSubmitting(true);
    setSubmissionMessage("Submitting your code to S3...");
  
    try {
      // Call Firebase function to submit the code to S3
      const submitCode = functions.httpsCallable("submitCode");
      const submitResult = await submitCode({
        codeContent: code,
        userId: currentUser.uid,
      });
  
      if (submitResult.data.success) {
        setSubmissionMessage("Code submitted to S3 successfully!");
      } else {
        setSubmissionMessage("Error submitting code to S3. Please try again.");
      }
    } catch (error) {
      setSubmissionMessage("There was an issue submitting your code.");
      console.error("Error submitting code:", error);
    }
  
    setIsSubmitting(false);
  };
  




  const handleRun = async () => {
    setLoading(true);
    setOutput(''); 
    try {
      // Use your deployed Firebase Function URL (don't forget to change it before production)
      const response = await axios.post(
        'https://us-central1-educate-5d670.cloudfunctions.net/executecode', // Replace <your-project-id>
        {
          code,
          language,
        }
      );
  
      // Check if response contains output data
      if (response.data && response.data.output) {
        setOutput(response.data.output);  
      } else {
        setOutput('No output from the code execution.');
      }
    } catch (error) {
    
      setOutput(`Error executing code: ${error.response ? error.response.data : error.message}`);
      console.error('Error:', error);
    } 
    finally 
    {
      setLoading(false);  // Stop the loading indicator after completion
    }
  };
  

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      {/* Problem Description Panel - Top */}
      <Card className="h-2/5 overflow-y-auto bg-gray-800 text-white p-4 m-4 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{currentProblem.title}</h2>
          <span className={`px-3 py-1 rounded ${
            currentProblem.difficulty === 'Easy' ? 'bg-green-600' :
            currentProblem.difficulty === 'Medium' ? 'bg-yellow-600' :
            'bg-red-600'
          } text-white`}>
            {currentProblem.difficulty}
          </span>
        </div>
        
        <div className="space-y-4">
          <p className="text-gray-200">{currentProblem.description}</p>
          
          <div>
            <h3 className="text-lg font-semibold">Examples:</h3>
            <div className="grid grid-cols-2 gap-4 mt-2">
              {currentProblem.examples.map((example, index) => (
                <div key={index} className="bg-gray-700 p-3 rounded">
                  <p><strong>Input:</strong> {example.input}</p>
                  <p><strong>Output:</strong> {example.output}</p>
                  <p><strong>Explanation:</strong> {example.explanation}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold">Constraints:</h3>
            <ul className="list-disc pl-5 text-gray-200">
              {currentProblem.constraints.map((constraint, index) => (
                <li key={index}>{constraint}</li>
              ))}
            </ul>
          </div>
        </div>
      </Card>

      {/* Code Editor Panel - Bottom */}
      <div className="flex-1 p-4 space-y-4">
        <div className="flex justify-between items-center">
          <select 
            onChange={handleLanguageChange} 
            value={language}
            className="bg-gray-700 text-white p-2 rounded"
          >
            <option value="python3">Python</option>
            <option value="java">Java</option>
            <option value="cpp">C++</option>
          </select>
          
          <div className="space-x-2">
            <button 
              onClick={handleRun} 
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Running...' : 'Run Code'}
            </button>
            <button 
              onClick={handleSubmitCode}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Submit
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 h-full">
          {/* Code Editor */}
          <div className="col-span-2">
            <AceEditor
              mode={language}
              theme="monokai"
              name="code_editor"
              value={code}
              onChange={handleCodeChange}
              width="100%"
              height="300px"
              showPrintMargin={false}
              showGutter={true}
              highlightActiveLine={true}
              className="rounded"
              setOptions={{
                fontFamily: 'monospace',
                fontSize: 16,
              }}
            />
          </div>

          {/* Output Panel */}
          <div className="bg-gray-800 p-4 rounded">
            <h3 className="text-white text-lg font-semibold mb-2">Output:</h3>
            <pre className="text-white font-mono bg-gray-700 p-3 rounded h-[calc(100%-2rem)] overflow-y-auto">
              {output}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;