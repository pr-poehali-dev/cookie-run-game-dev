import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface MemoryGameProps {
  onBack: () => void;
}

interface CardType {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const cookieEmojis = ['🍪', '🧁', '🍩', '🍰', '🎂', '🍫', '🍓', '🍦'];

export default function MemoryGame({ onBack }: MemoryGameProps) {
  const [cards, setCards] = useState<CardType[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [isChecking, setIsChecking] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  // Инициализация игры
  useEffect(() => {
    initGame();
  }, []);

  const initGame = () => {
    const shuffledCards = [...cookieEmojis, ...cookieEmojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(shuffledCards);
    setFlippedCards([]);
    setMoves(0);
    setMatches(0);
    setGameWon(false);
  };

  // Проверка победы
  useEffect(() => {
    if (matches === cookieEmojis.length && matches > 0) {
      setGameWon(true);
    }
  }, [matches]);

  // Обработка переворота карты
  const handleCardClick = (id: number) => {
    if (isChecking || flippedCards.length >= 2) return;
    
    const card = cards.find(c => c.id === id);
    if (!card || card.isFlipped || card.isMatched) return;

    const newCards = cards.map(c =>
      c.id === id ? { ...c, isFlipped: true } : c
    );
    setCards(newCards);

    const newFlippedCards = [...flippedCards, id];
    setFlippedCards(newFlippedCards);

    // Проверка совпадения
    if (newFlippedCards.length === 2) {
      setIsChecking(true);
      setMoves(moves + 1);

      const [firstId, secondId] = newFlippedCards;
      const firstCard = newCards.find(c => c.id === firstId);
      const secondCard = newCards.find(c => c.id === secondId);

      if (firstCard?.emoji === secondCard?.emoji) {
        // Совпадение!
        setTimeout(() => {
          setCards(cards.map(c =>
            c.id === firstId || c.id === secondId
              ? { ...c, isMatched: true }
              : c
          ));
          setMatches(matches + 1);
          setFlippedCards([]);
          setIsChecking(false);
        }, 600);
      } else {
        // Не совпало
        setTimeout(() => {
          setCards(cards.map(c =>
            c.id === firstId || c.id === secondId
              ? { ...c, isFlipped: false }
              : c
          ));
          setFlippedCards([]);
          setIsChecking(false);
        }, 1000);
      }
    }
  };

  return (
    <div className="min-h-screen purple-gradient p-6">
      {/* Шапка */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex items-center justify-between mb-6">
          <Button 
            onClick={onBack}
            className="game-shadow font-bold py-3 px-6 rounded-full bg-white/90 hover:bg-white border-4 border-[#FFB84D] text-[#FFB84D] text-lg transition-all hover:scale-105"
          >
            <Icon name="ArrowLeft" className="mr-2" size={24} />
            НАЗАД
          </Button>
          
          <h1 className="text-4xl md:text-5xl font-black text-white drop-shadow-[0_4px_0_rgba(0,0,0,0.3)]"
              style={{ textShadow: '3px 3px 0 #FFB84D' }}>
            НАЙДИ ПАРУ
          </h1>
          
          <Button 
            onClick={initGame}
            className="game-shadow font-bold py-3 px-6 rounded-full bg-white/90 hover:bg-white border-4 border-[#FFB84D] text-[#FFB84D] text-lg transition-all hover:scale-105"
          >
            <Icon name="RotateCcw" className="mr-2" size={24} />
            НОВАЯ ИГРА
          </Button>
        </div>

        {/* Статистика */}
        <div className="flex justify-center gap-6 mb-8">
          <div className="bg-white/90 rounded-2xl px-6 py-3 border-4 border-white game-shadow">
            <div className="text-center">
              <div className="text-3xl font-black text-[#FF6B9D]">{moves}</div>
              <div className="text-sm font-bold text-gray-600">ХОДОВ</div>
            </div>
          </div>
          
          <div className="bg-white/90 rounded-2xl px-6 py-3 border-4 border-white game-shadow">
            <div className="text-center">
              <div className="text-3xl font-black text-[#A85F7]">{matches}/{cookieEmojis.length}</div>
              <div className="text-sm font-bold text-gray-600">ПАРЫ</div>
            </div>
          </div>
        </div>
      </div>

      {/* Игровое поле */}
      <div className="max-w-3xl mx-auto">
        <div className="grid grid-cols-4 gap-4">
          {cards.map((card) => (
            <Card
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className={`
                aspect-square cursor-pointer transition-all duration-300 border-4 border-white game-shadow
                ${card.isFlipped || card.isMatched 
                  ? 'bg-gradient-to-br from-[#FFB84D] to-[#FF6B9D]' 
                  : 'bg-white hover:scale-105'
                }
                ${card.isMatched ? 'opacity-50 scale-95' : ''}
              `}
            >
              <div className="w-full h-full flex items-center justify-center">
                {card.isFlipped || card.isMatched ? (
                  <div className={`text-6xl ${card.isMatched ? '' : 'cookie-bounce'}`}>
                    {card.emoji}
                  </div>
                ) : (
                  <div className="text-5xl">
                    ❓
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Модальное окно победы */}
      {gameWon && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
          <div className="bg-white rounded-3xl p-8 max-w-md mx-4 border-8 border-[#FFB84D] game-shadow animate-scale-in">
            <div className="text-center">
              <div className="text-7xl mb-4 cookie-bounce">🎉</div>
              <h2 className="text-5xl font-black text-[#FF6B9D] mb-4 drop-shadow-lg">
                ПОБЕДА!
              </h2>
              <p className="text-2xl font-bold text-gray-700 mb-2">
                Ты нашёл все пары!
              </p>
              <p className="text-xl font-bold text-gray-600 mb-6">
                Ходов: {moves}
              </p>
              
              <div className="flex gap-4 justify-center mb-4">
                <div className="text-4xl">⭐</div>
                <div className="text-4xl">⭐</div>
                <div className="text-4xl">⭐</div>
              </div>

              <div className="flex gap-4">
                <Button 
                  onClick={initGame}
                  className="flex-1 game-shadow font-bold py-4 rounded-full text-white text-lg transition-all hover:scale-105"
                  style={{ background: 'linear-gradient(135deg, #A85F7 0%, #8b5cf6 100%)' }}
                >
                  <Icon name="RotateCcw" className="mr-2" size={20} />
                  ЕЩЁ РАЗ
                </Button>
                
                <Button 
                  onClick={onBack}
                  className="flex-1 game-shadow font-bold py-4 rounded-full bg-white border-4 border-[#FFB84D] text-[#FFB84D] text-lg transition-all hover:scale-105"
                >
                  <Icon name="Home" className="mr-2" size={20} />
                  ДОМОЙ
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Подсказка */}
      <div className="max-w-3xl mx-auto mt-8 text-center">
        <p className="text-white font-bold text-lg drop-shadow-lg">
          🍪 Переверни карточки и найди одинаковые пары печенек! 🍪
        </p>
      </div>
    </div>
  );
}
