import { useState, useEffect } from 'react';
import { Volume2 } from 'lucide-react';

interface WordEntry {
  headword: string;
  translation: string;
  verb: string;
  noun: string;
  adjective: string;
  adverb: string;
  collocation: string;
  collocation_tr: string;
}

const Words = () => {
  const [words, setWords] = useState<WordEntry[]>([]);
  const [filteredWords, setFilteredWords] = useState<WordEntry[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDark, setIsDark] = useState(true);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);
  const [loadingWord, setLoadingWord] = useState<string | null>(null);

  const wordData: WordEntry[] = [
    { headword: 'Abandon', translation: 'Terk etmek, Vazgeçmek', verb: 'abandon', noun: 'abandonment', adjective: 'abandoned', adverb: '', collocation: 'to be forced to abandon stg completely/entirely', collocation_tr: 'Bir şeyi tamamen terk etmeye zorlanmak' },
    { headword: 'Absorb', translation: 'Emmek, Soğurmak', verb: 'absorb', noun: '', adjective: 'absorbent', adverb: '', collocation: 'to absorb quickly/rapidly', collocation_tr: 'Hızlıca/süratle emmek' },
    { headword: 'Abuse', translation: 'İstismar etmek, Kötüye kullanmak', verb: 'abuse', noun: 'abuser, abuse', adjective: 'abusive', adverb: '', collocation: 'to be abused emotionally/physically/sexually/verbally', collocation_tr: 'Duygusal/fiziksel/cinsel/sözlü olarak istismar edilmek' },
    { headword: 'Accelerate', translation: 'Hızlandırmak', verb: 'accelerate', noun: 'acceleration', adjective: '', adverb: '', collocation: 'quickly accelerate rapid acceleration', collocation_tr: 'Hızlıca hızlanmak, ani hızlanma' },
    { headword: 'accomplish', translation: 'Başarmak', verb: 'accomplish', noun: 'accomplishment', adjective: 'accomplished', adverb: '', collocation: 'accomplish successfully /easily become accomplished', collocation_tr: 'Başarıyla/kolayca başarmak, başarılı olmak' },
    { headword: 'Account', translation: 'Hesap, Sorumluluk', verb: '', noun: 'accountability, account', adjective: 'accountable', adverb: '', collocation: 'take sth into account, bank account, to be accountable for sth', collocation_tr: 'Bir şeyi hesaba katmak, banka hesabı, bir şeyden sorumlu olmak' },
    { headword: 'Acquire', translation: 'Edinmek, Kazanmak', verb: 'acquire', noun: 'acquisition', adjective: '', adverb: '', collocation: 'to acquire knowledge/skills, language acquisition', collocation_tr: 'Bilgi/beceri edinmek, dil edinimi' },
    { headword: 'activate', translation: 'Etkinleştirmek', verb: 'activate', noun: 'action', adjective: 'active', adverb: 'actively', collocation: 'effective/firm/strong action, become/keep active', collocation_tr: 'Etkili/kesin/güçlü eylem, aktif olmak/kalmak' },
    { headword: 'Adapt', translation: 'Uyum sağlamak', verb: 'adapt', noun: 'adaptation, adaptability', adjective: 'adaptable', adverb: '', collocation: 'to adapt successfully/well, to be adaptable, highly/very adaptable', collocation_tr: 'Başarıyla/iyi uyum sağlamak, uyumlu olmak, oldukça/çok uyumlu olmak' },
    { headword: 'Adequate / Inadequate', translation: 'Yeterli/Yetersiz', verb: '', noun: 'adequacy, inadequacy', adjective: 'adequate, inadequate', adverb: 'adequately, inadequately', collocation: 'adequacy of sth, to be/seem adequate for sth', collocation_tr: 'Bir şeyin yeterliliği, bir şey için yeterli olmak/görünmek' },
  ];

  useEffect(() => {
    setWords(wordData);
    setFilteredWords(wordData);
    const savedTheme = localStorage.getItem('words-theme');
    if (savedTheme === 'light') {
      setIsDark(false);
    }
  }, []);

  useEffect(() => {
    const searchLower = searchTerm.toLowerCase();
    const filtered = words.filter(word =>
      word.headword.toLowerCase().startsWith(searchLower)
    );
    setFilteredWords(filtered);
  }, [searchTerm, words]);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem('words-theme', newTheme ? 'dark' : 'light');
  };

  const playPronunciation = async (word: string) => {
    if (currentAudio) {
      currentAudio.pause();
    }
    setLoadingWord(word);

    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      if (response.ok) {
        const data = await response.json();
        const phonetics = data[0]?.phonetics || [];
        const audioData = phonetics.find((p: { audio?: string }) => p.audio);

        if (audioData?.audio) {
          const audio = new Audio(audioData.audio);
          setCurrentAudio(audio);
          audio.play();
        }
      }
    } catch (error) {
      console.error('Pronunciation error:', error);
    } finally {
      setLoadingWord(null);
    }
  };

  const bgClass = isDark ? 'bg-black' : 'bg-white';
  const textClass = isDark ? 'text-white' : 'text-black';
  const cardBgClass = isDark ? 'bg-gray-900' : 'bg-gray-50';
  const borderClass = isDark ? 'border-gray-800' : 'border-gray-200';
  const inputBgClass = isDark ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-black border-gray-300';

  return (
    <div className={`min-h-screen ${bgClass} ${textClass} transition-colors duration-300`}>
      <div className="max-w-4xl mx-auto p-4 sm:p-8">
        <header className={`text-center pb-6 border-b-2 ${borderClass}`}>
          <h1 className="text-3xl sm:text-4xl font-bold">Upper-Intermediate Kelime Kitabı</h1>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} mt-2`}>Kelimeler ve Kullanım Örnekleri</p>
        </header>

        <div className="mt-6 flex justify-center">
          <button
            onClick={toggleTheme}
            className={`px-6 py-2 rounded-full border-2 ${isDark ? 'border-gray-700 bg-gray-800 hover:bg-gray-700' : 'border-gray-300 bg-gray-100 hover:bg-gray-200'} transition-colors`}
          >
            {isDark ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>

        <div className="my-6">
          <input
            type="text"
            placeholder="Kelime ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full p-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${inputBgClass} ${borderClass}`}
          />
        </div>

        <main className="space-y-4 mt-8">
          {filteredWords.length === 0 ? (
            <p className={`text-center my-10 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
              Aranan kelime bulunamadı.
            </p>
          ) : (
            filteredWords.map((item, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg shadow-sm border-l-4 ${cardBgClass} ${borderClass}`}
                style={{
                  borderLeftColor: ['#fb7185', '#fdba74', '#818cf8', '#60a5fa', '#4ade80'][index % 5]
                }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-semibold">{item.headword}</h2>
                      <span className={`text-lg ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
                        ({item.translation})
                      </span>
                    </div>

                    {(item.verb || item.noun || item.adjective || item.adverb) && (
                      <div className={`mt-2 p-2 rounded ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
                        {item.verb && <p className="text-xs"><strong>VERB:</strong> {item.verb}</p>}
                        {item.noun && <p className="text-xs"><strong>NOUN:</strong> {item.noun}</p>}
                        {item.adjective && <p className="text-xs"><strong>ADJECTIVE:</strong> {item.adjective}</p>}
                        {item.adverb && <p className="text-xs"><strong>ADVERB:</strong> {item.adverb}</p>}
                      </div>
                    )}

                    {item.collocation && (
                      <div className={`mt-3 p-2 rounded ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
                        <p className="text-sm"><strong>Örnek:</strong> "{item.collocation}"</p>
                        <p className={`text-sm mt-1 ${isDark ? 'text-blue-300' : 'text-blue-600'}`}>
                          <strong>Açıklama:</strong> {item.collocation_tr}
                        </p>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => playPronunciation(item.headword.split(/[\s/(]+/)[0])}
                    disabled={loadingWord === item.headword}
                    className={`flex-shrink-0 p-2 rounded-lg transition-all ${
                      isDark
                        ? 'hover:bg-gray-700 text-gray-300 hover:text-white'
                        : 'hover:bg-gray-200 text-gray-600 hover:text-black'
                    } ${loadingWord === item.headword ? 'opacity-50' : ''}`}
                    aria-label="Telaffuz et"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </main>

        <footer className={`text-center pt-8 mt-12 border-t ${borderClass}`}>
          <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            <a
              href="http://prep.bilkent.edu.tr/data/wordlist/uppint_level_wordlist.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className={`${isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-700'} underline`}
            >
              Bilkent upper-intermediate word list
            </a>
            {' '}dosyasından derlenmiştir
          </p>
          <p className={`text-sm mt-2 ${isDark ? 'text-gray-600' : 'text-gray-400'}`}>
            © {new Date().getFullYear()} - furkanozden.com
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Words;
