import  { useState, useEffect, useCallback } from 'react';

function Test() {
  const [timeLeft, setTimeLeft] = useState(60 * 60);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [warningCount, setWarningCount] = useState(0);
  const [canSubmit, setCanSubmit] = useState(false);
  const [testRunning, setTestRunning] = useState(false);
  const [fullScreenViolated, setFullScreenViolated] = useState(false);
  const [userIntuition, setUserIntuition] = useState("");

  const questions = [
    {
      id: 'q1',
      question: 'What is the time complexity of a binary search algorithm?',
      options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
    },
    {
      id: 'q2',
      question: 'What is the worst-case time complexity of bubble sort?',
      options: ['O(1)', 'O(n)', 'O(n^2)', 'O(log n)'],
    },
  ];

  const requestFullScreen = () => {
    const doc = document.documentElement;
    if (doc.requestFullscreen) {
      doc.requestFullscreen();
    } else if (doc.mozRequestFullScreen) {
      doc.mozRequestFullScreen();
    } else if (doc.webkitRequestFullscreen) {
      doc.webkitRequestFullscreen();
    } else if (doc.msRequestFullscreen) {
      doc.msRequestFullscreen();
    }
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
      }, 2000);
    }
  };

  const handleSubmit = useCallback(() => {
    if (!canSubmit) {
      alert('Please run the solution first before submitting the test.');
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
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
      } else {
        clearInterval(timerInterval);
        if (warningCount < 3) {
          alert('Test terminated due to time limit!');
          handleSubmit();
        }
      }
    }, 1000);

    const fullScreenInterval = setInterval(() => {
      checkFullScreen();
    }, 1000);

    return () => {
      clearInterval(timerInterval);
      clearInterval(fullScreenInterval);
    };
  }, [timeLeft, warningCount, fullScreenViolated, checkFullScreen, handleSubmit]);

  const handleAnswerChange = (questionId, answer) => {
    setSelectedAnswers({ ...selectedAnswers, [questionId]: answer });
  };

  const handleIntuitionChange = (event) => {
    setUserIntuition(event.target.value);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div className="App">
      <header className="header">
        <h1>Aiverex Educate</h1>
      </header>

      <div className="container">
        <div className="test-info">
          <h2>Test: Introduction to Algorithms</h2>
          <p>Duration: 60 Minutes</p>
          <p>Start Time: 22nd March, 2025 - 10:00 AM</p>
          <p>Instructions: Solve the following problems within the given time.</p>
        </div>

        <div className="timer">
          <p>Time Left: <span>{formatTime(timeLeft)}</span></p>
        </div>

        <div className="questions">
          {questions.map((question) => (
            <div key={question.id} className="question">
              <h3>{question.question}</h3>
              <div className="options">
                {question.options.map((option, index) => (
                  <div key={index}>
                    <input
                      type="radio"
                      id={`${question.id}-${index}`}
                      name={question.id}
                      value={option}
                      onChange={() => handleAnswerChange(question.id, option)}
                      checked={selectedAnswers[question.id] === option}
                      disabled={submitted}
                    />
                    <label htmlFor={`${question.id}-${index}`}>{option}</label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="run-section">
          <button
            className="run-btn"
            onClick={runTest}
            disabled={testRunning || submitted}
          >
            {testRunning ? 'Test Running...' : 'Run Solution'}
          </button>
        </div>

        <div className="submit-section">
          <button
            className="submit-btn"
            onClick={handleSubmit}
            disabled={!canSubmit || submitted}
          >
            {submitted ? 'Test Submitted' : 'Submit Test'}
          </button>
        </div>

        <div className="intuition-tab">
          <h3>Your Problem Solving Intuition</h3>
          <textarea
            className="intuition-textarea"
            placeholder="Write your intuition or approach to solve the problem here..."
            value={userIntuition}
            onChange={handleIntuitionChange}
            disabled={submitted}
          />
        </div>
      </div>

      <footer className="footer">
        <p>&copy; 2025 HackerRank Replica</p>
      </footer>
    </div>
  );
}

export default Test;
