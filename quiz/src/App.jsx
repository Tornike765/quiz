import React, { useState, useEffect } from 'react';

const decodeBase64 = (str) => atob(str);

const App = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(null);
    const [score, setScore] = useState(null);
    const [showScore, setShowScore] = useState(true);

    useEffect(() => {
        fetch('https://opentdb.com/api.php?amount=10&category=12&difficulty=medium&type=boolean&encode=base64')
            .then((response) => response.json())
            .then((data) => {
                const decodedQuestions = data.results.map((q) => ({
                    question: decodeBase64(q.question),
                    correctAnswer: decodeBase64(q.correct_answer),
                }));
                setQuestions(decodedQuestions);
            });
    }, []);

    const handleAnswer = (answer) => {
        if (answer === questions[currentQuestionIndex].correctAnswer) {
            setScore(score + 1);
        }

        const nextQuestion = currentQuestionIndex + 1;
        if (nextQuestion < questions.length) {
            setCurrentQuestionIndex(nextQuestion);
        } else {
            setShowScore(false);
        }
    };

    return (
        <div>
            <h1>Quiz</h1>
            {questions.length == 0 ? (
                <p>Loading questions...</p>
            ) : showScore ? (
                <div>
                    <h2>Your Score: {score}/{questions.length}</h2>
                    <button onClick={() => window.location.reload()}>Restart Quiz</button>
                </div>
            ) : (
                <div>
                    <button onClick={() => handleAnswer('True')}>True</button>
                    <button onClick={() => handleAnswer('False')}>False</button>
                </div>
            )}
        </div>
    );
};

export default App;