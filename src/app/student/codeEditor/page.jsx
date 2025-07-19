"use client" ;
import React, { useState, useEffect, useRef, useCallback } from 'react';
import ProblemData from '../../store/Problems';
import styles from './codeEditor.module.css';
import IntuitionForm from '../../../Components/IntuitionForm';
import { CheckCircleOutlined, ClockCircleOutlined, UnorderedListOutlined, } from '@ant-design/icons';
import { EditorView, basicSetup } from 'codemirror';
import { EditorState } from '@codemirror/state';
import { javascript } from '@codemirror/lang-javascript';
import { java } from '@codemirror/lang-java';
import { python } from '@codemirror/lang-python';
import { cpp } from '@codemirror/lang-cpp';
import Split from '@uiw/react-split';

const languageExtensions = {
  javascript,
  java,
  python,
  cpp
};

const getLanguageId = (lang) => {
  const map = {
    javascript: 63,
    python: 71,
    java: 62,
    cpp: 54
  };
  return map[lang];
};

const defaultCodeSnippets = {
  "cpp": `#include <iostream>
using namespace std;

int main() {
    // Your code here

}`,
  "python": `# Your code here`,
  "java": `public class Main {
    public static void main(String[] args) {
        // Your code here
    }
}`,
  "javascript": `// Your code here`,
  "java": `public class Main {
    public static void main(String[] args) {
        // Your code here
    }
  }`,
};


function Test() {
  const [currentProblem, setCurrentProblem] = useState(ProblemData["Sum Of Two Integers"]);
  const [problemListVisible, setProblemListVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState(parseInt(currentProblem.duration) * 60);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [warningCount, setWarningCount] = useState(0);
  const [canSubmit, setCanSubmit] = useState(false);
  const [testRunning, setTestRunning] = useState(false);
  const [duration, setDuration] = useState(currentProblem.duration);
  const [fullScreenViolated, setFullScreenViolated] = useState(false);
  const [userIntuition, setUserIntuition] = useState("");
  const editorRef = useRef(null);
  const viewRef = useRef(null);
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState(defaultCodeSnippets[language]);
  const leftRef = useRef(null);
  const problemListRef = useRef();
  const [inputValues, setInputValues] = useState({});
  const [codeOutput, setCodeOutput] = useState(currentProblem.exampleOutput);

  const handleIntuitionSubmit = (data) => {
    setUserIntuition(data);
    setCanSubmit(true);
  };

  const handleApiRun = async () => {
    const editorCode = viewRef.current?.state?.doc?.toString() || '';
    const stdin = Object.values(inputValues).join("\n");

    setTestRunning(true);
    setCodeOutput("Running...");

    try {
      const response = await fetch("http://192.168.82.52:2358/submissions?base64_encoded=false&wait=true", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          language_id: getLanguageId(language),
          source_code: editorCode,
          stdin: stdin,
          time_limit: currentProblem.timeLimit,
          memory_limit: currentProblem.memoryLimit
        }),
      });

      const result = await response.json();

      if (result.status && result.status.id === 5) {
        setCodeOutput("Time Limit Exceeded");
      } else if (result.status && result.status.id === 6) {
        setCodeOutput("Memory Limit Exceeded");
      } else if (result.stdout) {
        setCodeOutput(result.stdout);
        setCanSubmit(true);
      } else if (result.stderr || result.compile_output) {
        setCodeOutput(result.stderr || result.compile_output);
      } else {
        setCodeOutput("Unknown Error Occurred");
      }
    } catch (error) {
      if (error.name === "TypeError") {
        setCodeOutput("Network Error: Unable to reach server.");
      } else {
        setCodeOutput("Failed to connect to server.");
      }
    }

    setTestRunning(false);
  };


  useEffect(() => {
    function handleClickOutside(event) {
      if (problemListRef.current && !problemListRef.current.contains(event.target)) {
        setProblemListVisible(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (key, value) => {
    setInputValues(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  useEffect(() => {
    setDuration(currentProblem.duration);
    setTimeLeft(parseInt(currentProblem.duration) * 60);
    setInputValues(currentProblem.exampleInput);
    setCodeOutput(currentProblem.exampleOutput);
    setUserIntuition("");
    createEditor(language);
    setSubmitted(false);
    setCanSubmit(false);
    setSelectedAnswers({});
  }, [currentProblem]);

  const createEditor = (lang) => {
    if (viewRef.current) viewRef.current.destroy();
    const extension = languageExtensions[lang]();

    viewRef.current = new EditorView({
      state: EditorState.create({
        doc: defaultCodeSnippets[lang],
        extensions: [basicSetup, extension]
      }),
      parent: editorRef.current
    });
  };

  useEffect(() => {
    createEditor(language);
    setLanguage(language);
    setCode(defaultCodeSnippets[language]);
    return () => viewRef.current?.destroy();
  }, [language]);

  const requestFullScreen = () => {
    const doc = document.documentElement;
    if (doc.requestFullscreen) doc.requestFullscreen();
    else if (doc.mozRequestFullScreen) doc.mozRequestFullScreen();
    else if (doc.webkitRequestFullscreen) doc.webkitRequestFullscreen();
    else if (doc.msRequestFullscreen) doc.msRequestFullscreen();
  };

  const checkFullScreen = useCallback(() => {
    if (!document.fullscreenElement && !fullScreenViolated) {
      if (warningCount < 2) {
        alert('Please stay in full-screen mode!');
        setWarningCount(warningCount + 1);
      } else {
        alert('Test terminated due to multiple violations of full-screen mode!');
        handleSubmit();
      }
      setFullScreenViolated(true);
    }
  }, [warningCount, fullScreenViolated]);

  const runTest = () => {
    if (!testRunning) {
      setTestRunning(true);
      alert('Running the test solution...');
      setTimeout(() => {
        alert('Solution run complete!');
        setCanSubmit(true);
        setTestRunning(false);
      }, 2000);
    }
  };

  const handleSubmit = useCallback(() => {
    if (!canSubmit) {
      alert('Please run the solution first before submitting the test.');
      return;
    }
    if (userIntuition == "") {
      setCanSubmit(false);
      alert('Please submit your intuition before submitting the test.');
      return;
    }
    setSubmitted(true);
    alert('Test Submitted!');
    console.log('Selected Answers:', selectedAnswers);
    console.log('User Intuition:', userIntuition);
  }, [canSubmit, selectedAnswers, userIntuition]);

  useEffect(() => {
    requestFullScreen();

    const timerInterval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerInterval);
          if (warningCount < 3) {
            alert('Test terminated due to time limit!');
            handleSubmit();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    const fullScreenInterval = setInterval(() => {
      checkFullScreen();
    }, 1000);

    return () => {
      clearInterval(timerInterval);
      clearInterval(fullScreenInterval);
    };
  }, [checkFullScreen, handleSubmit]);

  const handleAnswerChange = (questionId, answer) => {
    setSelectedAnswers({ ...selectedAnswers, [questionId]: answer });
  };

  const handleIntuitionChange = (e) => {
    setUserIntuition(e.target.value);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div className={styles["editor-container"]} style={{ height: '100vh' }}>
      <Split mode="horizontal" renderBar={({ onMouseDown, ...props }) => {
        return (
          <div {...props} style={{ boxShadow: 'none', background: 'transparent' }}>
            <div onMouseDown={onMouseDown} style={{ backgroundColor: 'transparent', boxShadow: 'none' }} />
          </div>
        );
      }} style={{ height: '100%' }} gutterSize={6}>
        {/* 1. Problem Description */}
        <div className={styles["editor-problem-sidebar"]} style={{ width: '50%', minWidth: '25%', maxWidth: '75%' }}>
          <div>
            <div className={styles["editor-problem-toggle-icon"]} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div className={styles['editor-problem-list-icon']} style={{ display: 'flex', alignItems: 'center' }}>
                <UnorderedListOutlined style={{ fontSize: 15, color: 'white' }} onClick={() => setProblemListVisible(!problemListVisible)} />
                <h4 style={{color: 'white' }} onClick={() => setProblemListVisible(!problemListVisible)}>Problem List</h4>
              </div>

              <div>
                {userIntuition ? <div style={{ display: 'flex', alignItems: 'center', color: 'white' }}>
                  <CheckCircleOutlined style={{ color: `var(--codeEditor-intuition-button-color)`, fontSize: '20px' }} />
                  <span style={{ color: 'white', marginLeft: '5px' }}>Intuition Submitted</span>
                </div>
                  : <IntuitionForm onSubmit={handleIntuitionSubmit} />}
              </div>
            </div>
            {problemListVisible && (
              <div
                ref={problemListRef}
                className={styles["editor-problem-items-visible"]}
              >
                <div className={styles["editor-problem-items"]}>
                  {Object.entries(ProblemData).map(([key, problem], index) => (
                    <div
                      key={key}
                      className={problem.title === currentProblem.title ? styles['editor-problem-item-active'] : styles['editor-problem-item']}
                      onClick={() => {
                        setCurrentProblem(problem);
                        setProblemListVisible(false);
                      }}
                    >
                      {problem.title}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <h2>{currentProblem.title}</h2>
          <p style={{ marginBottom: '30px' }}>Duration: {duration} Minutes</p>
          {currentProblem.description.map((desc, idx) => (
            <p key={idx}>{desc}</p>
          ))}
          <p style={{ marginTop: '50px' }}><b>Input:</b> {currentProblem.inputFormat} </p>
          <p><b>Output:</b> {currentProblem.outputFormat} </p>

          <div className={styles['editor-wrapper']}>
            <table className={styles['editor-table']}>
              <thead>
                <tr>
                  <th className={styles['editor-header']}>Input</th>
                  <th className={styles['editor-header']}>Output</th>
                </tr>
              </thead>
              <tbody>
                {currentProblem.examples.map((ex, index) => (
                  <tr key={index}>
                    <td className={styles['editor-cell']}>{ex.input}</td>
                    <td className={styles['editor-cell']}>{ex.output}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p style={{ marginTop: '25px', marginBottom: '20px' }}><b>Explanation :</b></p>
          <p> {currentProblem.explanation} </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', width: '50%', gap: '8px', maxHeight: '800px', minWidth: '25%', maxWidth: '75%' }}>
          {/* 2. Questions */}
          <Split mode="vertical"
            renderBar={({ onMouseDown, ...props }) => {
              return (
                <div {...props} style={{ boxShadow: 'none', background: 'transparent' }}>
                  <div onMouseDown={onMouseDown} style={{ backgroundColor: 'transparent', boxShadow: 'none' }} />
                </div>
              );
            }} style={{ height: '100%' }} gutterSize={6}>
            <div className={styles['editor-editor-sidebar']} style={{ padding: '1rem', backgroundColor: '#343434', color: 'white', height: '60%', minHeight: '25%', maxHeight: '75%' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <h5>Select Language</h5>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    style={{ padding: '0.3rem', backgroundColor: '#272822', color: 'white', border: 'none' }}
                  >
                    <option value="javascript">JavaScript</option>
                    <option value="python">Python</option>
                    <option value="java">Java</option>
                    <option value="cpp">C++</option>
                  </select>
                </div>
                <p className={styles['editor-timer']}>
                  <ClockCircleOutlined style={{ color: `var(--codeEditor-intuition-button-color)` }} /> {formatTime(timeLeft)}
                </p>
              </div>

              <div
                ref={editorRef}
                style={{
                  border: '1px solid #555',
                  backgroundColor: '#343434',
                  borderRadius: '8px',
                  height: '250px',
                  overflow: 'auto',
                  fontSize: '14px'
                }}
              />

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', position: 'sticky' }}>
                <button
                  onClick={handleApiRun}
                  disabled={testRunning || submitted}
                  className={styles['editor-button']}
                  style={{ marginTop: '1rem' }}
                >
                  {testRunning ? 'Running...' : 'Run'}
                </button>

                <button
                  onClick={handleSubmit}
                  disabled={!canSubmit || submitted}
                  className={styles['editor-submit-button']}
                  style={{
                    marginTop: '1rem',
                    backgroundColor: submitted || canSubmit ? `var(--codeEditor-intuition-button-color)` : `var(--codeEditor-button-color)`,
                    opacity: submitted || !canSubmit ? 0.6 : 1,
                    cursor: submitted || !canSubmit ? 'not-allowed' : 'pointer',
                    color: 'white',
                  }}
                >
                  {submitted ? 'Submitted' : 'Submit'}
                </button>
              </div>
            </div>

            {/* 4. Example Test Cases */}
            <div className={styles["editor-testcase-sidebar"]} style={{ height: '40%', minHeight: '25%', maxHeight: '75%' }}>
              <h3>Try Yourself :</h3>
              <p style={{ marginTop: '25px' }}><b>Input </b></p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
                {Object.entries(inputValues).map(([key, val]) => (
                  <div key={key}>
                    <label style={{ color: 'white', marginRight: '10px', marginBottom: '10px', gap: '5px' }}>{key} :</label>
                    <input
                      type="text"
                      value={val}
                      onChange={e => handleInputChange(key, e.target.value)}
                      className={styles['editor-inputFieldText']}
                    />
                  </div>
                ))}
              </div>
              <p style={{ wordSpacing: '5px', marginTop: '20px', marginRight: '10px' }}><b>Output: </b> {codeOutput} </p>
            </div>
          </Split>
        </div>
      </Split>
    </div>

  );
}

export default Test;
