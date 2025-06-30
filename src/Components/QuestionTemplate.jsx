import React, { useState, useRef } from 'react';
import styles from './QuestionTemplate.module.css';
import CodeEditor from '../pages/student/code_editor';

const tabs = ['Statement', 'Submissions', 'Solution', 'Hints', 'AI Help'];

const QuestionTemplate = () => {
  const [activeTab, setActiveTab] = useState('Statement');
  const [panelWidth, setPanelWidth] = useState(50); // Initial width percentage for question panel

  const questionPanelRef = useRef();
  const editorPanelRef = useRef();
  const dividerRef = useRef();

  const question = {
    title: 'DNA Storage',
    description:
      'For encoding an even-length binary string into a sequence of A, T, C, and G, we iterate from left to right and replace the characters as follows:\n\n00 is replaced with A\n01 is replaced with T\n10 is replaced with C\n11 is replaced with G',
    inputFormat: [
      'First line will contain T, number of test cases. Then the test cases follow.',
      'Each test case contains two lines of input.',
      'First line contains a single integer N, the length of the sequence.',
      'Second line contains binary string S of length N.'
    ],
    outputFormat: [
      'For each test case, output in a single line the encoded sequence.'
    ],
    constraints: [
      '1 <= T <= 100',
      '2 <= N <= 10^3',
      'N is even.',
      'Sum of N over all test cases is at most 10^3.',
      'S contains only characters 0 and 1.'
    ],
    exampleInput: [
      '4',
      '2',
      '00',
      '4',
      '0011',
      '6',
      '101010',
      '4',
      '1001'
    ],
    exampleOutput: [
      'A',
      'AG',
      'CCC',
      'CT'
    ]
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    const startX = e.clientX;
    const startWidth = questionPanelRef.current.offsetWidth;

    const handleMouseMove = (moveEvent) => {
      const delta = moveEvent.clientX - startX;
      const newWidth = ((startWidth + delta) / window.innerWidth) * 100;
      setPanelWidth(Math.min(Math.max(newWidth, 20), 80)); // Restrict resizing between 20% and 80%
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'Statement':
        return (
          <div className={styles["tab-content"]}>
            <h1 style={{ color: 'white',padding:"10px 0px 10px 0px" }}>{question.title}</h1>
            <div className={styles["section"]}>
              <h2 className={styles['heading']}>Description</h2>
              <p>{question.description}</p>
            </div>
            <div className={styles["section"]}>
              <h2 className={styles['heading']}>Input Format</h2>
              <ul>
                {question.inputFormat.map((line, index) => (
                  <li key={index}>{line}</li>
                ))}
              </ul>
            </div>
            <div className={styles["section"]}>
              <h2 className={styles['heading']}>Output Format</h2>
              <ul>
                {question.outputFormat.map((line, index) => (
                  <li key={index}>{line}</li>
                ))}
              </ul>
            </div>
            <div className={styles["section"]}>
              <h2 className={styles['heading']}>Constraints</h2>
              <ul>
                {question.constraints.map((constraint, index) => (
                  <li key={index}>{constraint}</li>
                ))}
              </ul>
            </div>
            <div className={styles["section"]}>
              <h2 className={styles['heading']}>Example Input</h2>
              <pre>{question.exampleInput.join('\n')}</pre>
            </div>
            <div className={styles["section"]}>
              <h2 className={styles['heading']}>Example Output</h2>
              <pre>{question.exampleOutput.join('\n')}</pre>
            </div>
          </div>
        );
      case 'Submissions':
        return <div className={styles["tab-content"]}>Submissions coming soon...</div>;
      case 'Solution':
        return <div className={styles["tab-content"]}>Solution coming soon...</div>;
      case 'Hints':
        return <div className={styles["tab-content"]}>Hints coming soon...</div>;
      case 'AI Help':
        return <div className={styles["tab-content"]}>AI Help coming soon...</div>;
      default:
        return null;
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab); // Set active tab when clicked
  };

  return (
    <div className={styles["QuestionTemplate"]}>
        <div
          ref={questionPanelRef}
          className={styles["question-panel"]}
          style={{ width: `${panelWidth}%` }}
        >
          <div className={styles['tabs']}>
            {tabs.map((tab) => (
              <h1
                key={tab}
                className={`tab ${activeTab === tab ? styles['active'] : ''}`}
                onClick={() => handleTabClick(tab)}
              >
                {tab}
              </h1>
            ))}
          </div>
          {renderContent()}
        </div>
        <div
          ref={dividerRef}
          className={styles["divider"]}
          onMouseDown={handleMouseDown}
        ></div>
        <div
          ref={editorPanelRef}
          className={styles["editor-panel"]}
          style={{ width: `${100 - panelWidth}%` }}
        >
          <div className={styles['code-editor']}>
          <CodeEditor />
          </div>
          <div className={styles['intuition-box']}>
              <textarea 
                  className={styles['input-intuition' ]}
                  placeholder="Write down your thoughts or solution ideas here..."
              ></textarea>
          </div>
        </div>
        
    </div>
  );
};

export default QuestionTemplate;
