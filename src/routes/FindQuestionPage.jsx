import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import './FindQuestionPage.css';
import ReactMarkdown from 'react-markdown';

const FindQuestionPage = () => {
  const [questions, setQuestions] = useState([]);
  const [filterTag, setFilterTag] = useState('');
  const [filterTitle, setFilterTitle] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [expandedQuestion, setExpandedQuestion] = useState(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'posts'));
        const questionList = querySnapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() }))
          .filter(doc => doc.type === 'question');
        setQuestions(questionList);
      } catch (error) {
        console.error("Error fetching questions: ", error);
      }
    };

    fetchQuestions();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'posts', id));
      setQuestions(questions.filter(q => q.id !== id));
    } catch (error) {
      console.error("Error deleting question: ", error);
    }
  };

  const filteredQuestions = questions.filter((question) => {
    const matchesTag = filterTag ? question.tags?.some(tag => tag.toLowerCase().includes(filterTag.toLowerCase())) : true;
    const matchesTitle = filterTitle ? question.title.toLowerCase().includes(filterTitle.toLowerCase()) : true;
    const matchesDate = filterDate ? new Date(question.createdAt.seconds * 1000).toLocaleDateString() === new Date(filterDate).toLocaleDateString() : true;

    return matchesTag && matchesTitle && matchesDate;
  });

  const handleExpand = (id) => {
    setExpandedQuestion(expandedQuestion === id ? null : id);
  };

  return (
    <div className="find-question-page">
      <h2>Find Questions</h2>

      <div className="filters">
        <input
          type="text"
          placeholder="Filter by title"
          value={filterTitle}
          onChange={(e) => setFilterTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filter by tag"
          value={filterTag}
          onChange={(e) => setFilterTag(e.target.value)}
        />
        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
        />
      </div>

      <div className="question-list">
        {filteredQuestions.length > 0 ? (
          filteredQuestions.map((question) => (
            <div
              key={question.id}
              className={`question-card ${expandedQuestion === question.id ? 'expanded' : ''}`}
              onClick={() => handleExpand(question.id)}
            >
              <h3>{question.title}</h3>

              {expandedQuestion === question.id && (
                <div className="expanded-details">
                  <p><strong>Description:</strong> {question.description}</p>
                  <p><strong>Tags:</strong> {question.tags?.join(', ')}</p>
                  <p><strong>Date:</strong> {new Date(question.createdAt.seconds * 1000).toLocaleDateString()}</p>

                  {/* Display the code if present */}
                  {question.code && (
                    <div className="code-section">
                      <h4>Code:</h4>
                      <ReactMarkdown>{`\`\`\`javascript\n${question.code}\n\`\`\``}</ReactMarkdown>
                    </div>
                  )}

                  <button onClick={(e) => { e.stopPropagation(); handleDelete(question.id); }}>Delete</button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="no-questions">No questions available</p>
        )}
      </div>
    </div>
  );
};

export default FindQuestionPage;
