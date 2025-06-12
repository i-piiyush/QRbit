
import { useNavigate } from 'react-router-dom';
import "../not found/NotFound.css"
import { useEffect,useState } from 'react';


const messages = [
  'POOLSIDE ERROR 0x00000404',
  'PAGE_NOT_FOUND — The file you\'re looking for went off the deep end.',
  '',
  'A fatal exception has occurred in module navigation.exe.',
  'Attempted to access a route that does not exist.',
  '',
  'INITIATING MEMORY DUMP...',
  '> Saving stack trace to /beach/missing.html',
  '> Surfacing redirect protocol...',
  '',
  'Press Enter to go home.'
];

const TypingText = ({ lines, speed = 30 }) => {
  const [displayedText, setDisplayedText] = useState([]);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let line = 0;
    let char = 0;
    const output = [];

    const type = () => {
      if (line < lines.length) {
        const currentLine = lines[line];
        if (char < currentLine.length) {
          output[line] = (output[line] || '') + currentLine[char];
          setDisplayedText([...output]);
          char++;
          setTimeout(type, speed);
        } else {
          line++;
          char = 0;
          setTimeout(type, 300);
        }
      }
    };

    type();

    const blink = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => clearInterval(blink);
  }, [lines, speed]);

  return (
    <div className="whitespace-pre-wrap font-terminal glitch text-green-400 text-sm leading-relaxed">
      {displayedText.map((line, index) => (
        <div key={index}>
          {line}
        </div>
      ))}
      <span className="cursor">
        {showCursor ? '█' : ' '}
      </span>
    </div>
  );
};

const NotFound = () => {
  const navigate = useNavigate();

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') navigate('/');
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <div className="bg-black text-green-400 min-h-screen flex justify-center items-center p-6">
      <div className="max-w-7xl w-full">
        <TypingText lines={messages} />
        <button
          onClick={() => navigate('/')}
          className="mt-6 bg-green-600 text-black px-4 py-2 rounded hover:bg-green-400 transition font-mono"
        >
          Back to homepage
        </button>
      </div>
    </div>
  );
};

export default NotFound;