import { useState } from 'react';
import { questions } from './questions';

export default function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isFinished, setIsFinished] = useState(false);

  // Обработка выбора ответа
  const handleAnswerClick = (index) => {
    if (selectedOption !== null) return;
    setSelectedOption(index);

    if (index === questions[currentQuestion].correctAnswer) {
      setScore((prev) => prev + 1);
    }
  };

  // Переход к следующему вопросу
  const handleNextQuestion = () => {
    setSelectedOption(null);
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  // Перезапуск игры
  const handleRestart = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedOption(null);
    setIsFinished(false);
  };

  // Функция для определения ранга на основе набранных баллов
  const getRankInfo = (finalScore) => {
    if (finalScore <= 4) {
      return {
        title: "Junior Разработчик 👶",
        desc: "Хорошее начало! Самое время повторить основы React и JS.",
        color: "text-amber-400"
      };
    } else if (finalScore <= 8) {
      return {
        title: "Middle Разработчик 💻",
        desc: "Отличный результат! Ты уверенно ориентируешься во фронтенде.",
        color: "text-indigo-400"
      };
    } else {
      return {
        title: "Senior Разработчик 🔥",
        desc: "Просто потрясающе! Абсолютный гик и мастер кода!",
        color: "text-emerald-400"
      };
    }
  };

  const q = questions[currentQuestion];
  const progressPercent = ((currentQuestion + 1) / questions.length) * 100;
  const rank = getRankInfo(score);

  return (
    <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-4">
      {/* Главная карточка с анимацией появления */}
      <div className="w-full max-w-lg bg-slate-800 rounded-2xl p-6 shadow-2xl border border-slate-700 animate-fadeIn">
        
        {/* Заголовок */}
        <h1 className="text-2xl font-bold text-center mb-6 text-indigo-400">
          🧠 Dev Quiz App
        </h1>

        {!isFinished ? (
          <div>
            {/* Прогресс-бар */}
            <div className="w-full bg-slate-700 h-2.5 rounded-full mb-6 overflow-hidden">
              <div
                className="bg-indigo-500 h-2.5 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>

            {/* Номер вопроса */}
            <div className="text-sm text-slate-400 mb-2 font-medium">
              Вопрос {currentQuestion + 1} из {questions.length}
            </div>

            {/* Текст вопроса */}
            <h2 className="text-xl font-semibold mb-6 text-slate-100">
              {q.question}
            </h2>

            {/* Варианты ответов */}
            <div className="space-y-3 mb-6">
              {q.options.map((option, index) => {
                let btnStyle = "bg-slate-700 hover:bg-slate-600 border-slate-600 hover:scale-[1.01]";
                
                if (selectedOption !== null) {
                  if (index === q.correctAnswer) {
                    btnStyle = "bg-emerald-600 border-emerald-500 text-white scale-[1.01]";
                  } else if (index === selectedOption) {
                    btnStyle = "bg-rose-600 border-rose-500 text-white";
                  } else {
                    btnStyle = "bg-slate-700/50 text-slate-500 border-transparent opacity-60";
                  }
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerClick(index)}
                    disabled={selectedOption !== null}
                    className={`w-full text-left p-4 rounded-xl border font-medium transition-all duration-200 ${btnStyle}`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>

            {/* Кнопка "Дальше" */}
            {selectedOption !== null && (
              <button
                onClick={handleNextQuestion}
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 font-semibold rounded-xl transition duration-200 shadow-lg shadow-indigo-500/30 animate-fadeIn"
              >
                {currentQuestion + 1 === questions.length ? "Завершить тест 🏁" : "Следующий вопрос ➔"}
              </button>
            )}
          </div>
        ) : (
          /* Экран результатов с системой рангов и контактами */
          <div className="text-center py-4 animate-fadeIn">
            <h2 className="text-3xl font-bold mb-3 text-slate-100">Результат 🎯</h2>
            <p className="text-slate-400 text-lg mb-4">
              Правильных ответов: <span className="text-indigo-400 font-bold">{score}</span> из <span className="font-bold">{questions.length}</span>
            </p>

            {/* Плашка с рангом */}
            <div className="bg-slate-700/50 border border-slate-600 rounded-2xl p-4 mb-6">
              <div className={`text-xl font-bold mb-1 ${rank.color}`}>
                {rank.title}
              </div>
              <p className="text-sm text-slate-300">
                {rank.desc}
              </p>
            </div>

            <button
              onClick={handleRestart}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 font-semibold rounded-xl transition duration-200 shadow-lg shadow-indigo-500/30 mb-6"
            >
              Сыграть снова 🔄
            </button>

            {/* Блок контактов / Ссылок разработчика */}
            <div className="border-t border-slate-700 pt-4 mt-2">
              <p className="text-xs text-slate-400 mb-3 uppercase tracking-wider font-semibold">
                Связаться с разработчиком
              </p>
              <div className="flex justify-center gap-4 text-sm font-medium">
                <a
                  href="https://github.com/kerimovmeybi-bit" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-indigo-300 transition duration-200 border border-slate-600"
                >
                  GitHub 🐙
                </a>
                <a
                  href="https://t.me/mey6i"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-indigo-300 transition duration-200 border border-slate-600"
                >
                  Telegram 📱
                </a>
                <a
                  href="mailto:kerimovmeybi@gmail.com"
                  className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-indigo-300 transition duration-200 border border-slate-600"
                >
                  Email ✉️
                </a>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}