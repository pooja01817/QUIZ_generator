// import React, { useState } from 'react';
// import qimg from '../qImg.jpg';

// const QuizPage = () => {
//   const [topic, setTopic] = useState('');
//   const [numQuestions, setNumQuestions] = useState(5); // default number of questions
//   const [questions, setQuestions] = useState([]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch('KAGGLE_API_ENDPOINT', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ topic, numQuestions }),
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setQuestions(data.questions); // Assuming the response has questions in a `questions` array
//       } else {
//         console.error('Failed to fetch questions');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   return (
//     <div
//       className="h-screen bg-cover bg-gradient-to-r flex flex-col items-center justify-center"
//     //   style={{ backgroundImage: `url(${qimg})` }}
//     >
//       {/* <h1 className="text-4xl font-bold mb-6 text-white">Quiz Page</h1> */}
//       <form
//         onSubmit={handleSubmit}
//         className="text-center text-white p-20 bg-opacity-75 rounded-lg shadow-lg"
//         // className="bg-white px-30 py-20 pl-20 pr-20 rounded-lg shadow-lg max-w-md w-full text-center"
//         style={{ backgroundImage: `url(${qimg})` }}
//       >
//         <div className="mb-4">
//           <label className="block text-gray-700 font-semibold mb-2" htmlFor="topic">
//             Enter Topic
//           </label>
//           <input
//             type="text"
//             id="topic"
//             value={topic}
//             onChange={(e) => setTopic(e.target.value)}
//             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-600"
//             required
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700 font-semibold mb-2" htmlFor="numQuestions">
//             Number of Questions
//           </label>
//           <input
//             type="number"
//             id="numQuestions"
//             value={numQuestions}
//             onChange={(e) => setNumQuestions(e.target.value)}
//             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-600"
//             min="1"
//             max="20"
//             required
//           />
//         </div>

//         <button
//           type="submit"
//           className="mt-4 w-full bg-sky-700 hover:bg-sky-800 text-white py-2 rounded-lg transition duration-300"
//         >
//           Get Questions
//         </button>
//       </form>

//       {questions.length > 0 && (
//         <div className="mt-6 p-6 bg-white rounded-lg shadow-lg w-full max-w-md">
//           <h2 className="text-2xl font-semibold mb-4">Questions</h2>
//           <ul className="list-decimal pl-5 space-y-2">
//             {questions.map((question, index) => (
//               <li key={index} className="text-gray-700">
//                 {question}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default QuizPage;




import React, { useState } from 'react';
import qimg from '../qImg.jpg';

const QuizPage = () => {
  const [mode, setMode] = useState('topic'); // 'topic' or 'file'
  const [topic, setTopic] = useState('');
  const [numQuestions, setNumQuestions] = useState(5); // default number of questions
  const [questionType, setQuestionType] = useState('mcq');
  const [pdfFile, setPdfFile] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleFileChange = (e) => {
    setPdfFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('questionType', questionType);
    formData.append('numQuestions', numQuestions);

    if (mode === 'topic') {
      formData.append('topic', topic);
    } else if (mode === 'file' && pdfFile) {
      formData.append('file', pdfFile);
    }

    try {
      const response = await fetch('KAGGLE_API_ENDPOINT', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setQuestions(data.questions);
        setCurrentQuestionIndex(0);
      } else {
        console.error('Failed to fetch questions');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <div className="h-screen bg-cover flex flex-col items-start justify-center px-10" 
    // style={{ backgroundImage: `url(${qimg})` }}
    >
      <form
        onSubmit={handleSubmit}
        className="w-3/5 p-8 bg-opacity-90 bg-white rounded-lg shadow-lg"
      >
        {/* <h1 className="text-3xl font-bold mb-6 text-gray-800">Enter the details</h1> */}
        
        {/* Selection for Topic or File */}
        <div className="mb-4">
          <label className="font-semibold text-gray-700 mb-2">Choose Input Method:</label>
          <div className="flex space-x-4 mt-2">
          <button
        type="button"
        onClick={() => setMode('topic')}
        className={`px-4 py-2 rounded-full font-semibold transition duration-300 ${
          mode === 'topic' ? 'bg-sky-900 text-white hover:bg-sky-950' : 'bg-gray-200 text-gray-700'
        }`}
      >
        Enter Topic
      </button>
      <button
        type="button"
        onClick={() => setMode('file')}
        className={`px-4 py-2 rounded-full font-semibold transition duration-300 ${
          mode === 'file' ? 'bg-sky-900 text-white hover:bg-sky-950' : 'bg-gray-200 text-gray-700'
        }`}
      >
        Upload PDF
      </button>

          </div>
        </div>

        {mode === 'topic' ? (
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="topic">Enter Topic</label>
            <input
              type="text"
              id="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-600"
              required
            />
          </div>
        ) : (
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="file">Upload PDF File</label>
            <input
              type="file"
              id="file"
              onChange={handleFileChange}
              accept=".pdf"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-600"
              required
            />
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="questionType">Select Question Type</label>
          <select
            id="questionType"
            value={questionType}
            onChange={(e) => setQuestionType(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-600"
          >
            <option value="mcq">Multiple Choice</option>
            <option value="fill_in_the_blank">Fill in the Blank</option>
            <option value="true_false">True/False</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2" htmlFor="numQuestions">Number of Questions</label>
          <input
            type="number"
            id="numQuestions"
            value={numQuestions}
            onChange={(e) => setNumQuestions(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-600"
            min="1"
            max="20"
            required
          />
        </div>

        <button
          type="submit"
          className="mt-4 w-full px-4 py-2 bg-sky-900 hover:bg-sky-950 rounded-full text-white font-semibold transition duration-300"
        >
          Get Questions
        </button>
      </form>

      {questions.length > 0 && (
        <div className="mt-6 p-8 bg-white rounded-lg shadow-lg w-3/5 text-gray-800">
          <h2 className="text-2xl font-semibold mb-4">Question {currentQuestionIndex + 1} of {questions.length}</h2>
          <p className="mb-4">{questions[currentQuestionIndex]}</p>
          {currentQuestionIndex < questions.length - 1 && (
            <button
              onClick={handleNextQuestion}
              className="mt-4 bg-sky-700 hover:bg-sky-800 text-white py-2 px-6 rounded-lg transition duration-300"
            >
              Next Question
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default QuizPage;
