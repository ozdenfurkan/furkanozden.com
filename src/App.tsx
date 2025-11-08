import { useState } from 'react';
import { Mail, Github, Instagram } from 'lucide-react';
import Words from './pages/Words';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  if (currentPage === 'words') {
    return (
      <div>
        <button
          onClick={() => setCurrentPage('home')}
          className="fixed top-4 left-4 z-10 px-4 py-2 bg-white text-black rounded-full hover:bg-gray-200 transition-all text-sm font-medium"
        >
          ← Ana Sayfa
        </button>
        <Words />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full text-center space-y-8">
          <div className="flex justify-center mb-8">
            <img
              src="https://avatars.githubusercontent.com/u/233442869?v=4"
              alt="Furkan Özden"
              className="w-48 h-48 rounded-full border-2 border-gray-800"
            />
          </div>

          <div className="space-y-6">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight">
              Furkan Özden
            </h1>

            <p className="text-gray-400 text-base sm:text-lg max-w-lg mx-auto leading-relaxed">
              Full-stack developer crafting elegant digital experiences. I build thoughtful applications that blend intuitive design with clean code.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
            <a
              href="mailto:vcard@furkanozden.com"
              className="group flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full hover:bg-gray-200 transition-all duration-200 w-full sm:w-auto justify-center"
            >
              <Mail className="w-5 h-5" />
              <span className="font-medium">Get in Touch</span>
            </a>

            <a
              href="https://github.com/ozdenfurkan"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-all duration-200 w-full sm:w-auto justify-center"
            >
              <Github className="w-5 h-5" />
              <span className="font-medium">GitHub</span>
            </a>

            <a
              href="https://instagram.com/ozdenfurkan"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-all duration-200 w-full sm:w-auto justify-center"
            >
              <Instagram className="w-5 h-5" />
              <span className="font-medium">Instagram</span>
            </a>
          </div>
        </div>
      </div>

      <footer className="border-t border-gray-900 py-8 px-4">
        <div className="max-w-2xl mx-auto text-center space-y-4">
          <p className="text-gray-600 text-sm">
            furkanozden.com
          </p>
          <p className="text-gray-700 text-sm">
            Krakow, Poland
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
