import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface HomePageProps {
  onEnterGame: () => void;
  onMemoryGame: () => void;
}

export default function HomePage({ onEnterGame, onMemoryGame }: HomePageProps) {
  return (
    <div className="min-h-screen cookie-gradient flex items-center justify-center p-4 overflow-hidden relative">
      {/* Декоративные элементы */}
      <div className="absolute top-10 left-10 text-6xl cookie-bounce">🍪</div>
      <div className="absolute top-20 right-20 text-5xl cookie-bounce" style={{ animationDelay: '0.3s' }}>🍰</div>
      <div className="absolute bottom-20 left-20 text-5xl cookie-bounce" style={{ animationDelay: '0.6s' }}>🧁</div>
      <div className="absolute bottom-10 right-10 text-6xl cookie-bounce" style={{ animationDelay: '0.9s' }}>🍩</div>
      
      <div className="text-center z-10 max-w-2xl">
        {/* Логотип */}
        <h1 className="text-7xl md:text-8xl font-black mb-8 text-white tracking-wider drop-shadow-[0_6px_0_rgba(0,0,0,0.3)]"
            style={{ 
              textShadow: '4px 4px 0 #FFB84D, -2px -2px 0 rgba(0,0,0,0.2)',
              letterSpacing: '0.05em'
            }}>
          COOKIE RUN
        </h1>
        <h2 className="text-5xl md:text-6xl font-black mb-12 text-[#FFB84D] drop-shadow-[0_4px_0_rgba(0,0,0,0.3)]"
            style={{ textShadow: '3px 3px 0 rgba(255,255,255,0.3)' }}>
          KINGDOM
        </h2>

        {/* Печенька */}
        <div className="mb-12 flex justify-center">
          <div className="text-9xl cookie-bounce">
            🍪
          </div>
        </div>

        {/* Кнопка входа */}
        <Button 
          onClick={onEnterGame}
          className="game-shadow text-3xl font-black py-8 px-16 rounded-full bg-[#A85F7] hover:bg-[#9b4fe6] text-white border-4 border-white transition-all hover:scale-105 active:scale-95"
          style={{ 
            background: 'linear-gradient(135deg, #A85F7 0%, #8b5cf6 100%)',
            textShadow: '2px 2px 0 rgba(0,0,0,0.3)'
          }}
        >
          <Icon name="Play" className="mr-3" size={36} />
          ИГРАТЬ
        </Button>

        {/* Дополнительные кнопки */}
        <div className="mt-8 flex gap-4 justify-center flex-wrap">
          <Button 
            onClick={onMemoryGame}
            variant="outline"
            className="game-shadow font-bold py-4 px-8 rounded-full bg-white/90 hover:bg-white border-4 border-[#FFB84D] text-[#FFB84D] text-xl transition-all hover:scale-105"
          >
            <Icon name="Puzzle" className="mr-2" size={24} />
            НАЙДИ ПАРУ
          </Button>
          <Button 
            variant="outline"
            className="game-shadow font-bold py-4 px-8 rounded-full bg-white/90 hover:bg-white border-4 border-[#FFB84D] text-[#FFB84D] text-xl transition-all hover:scale-105"
          >
            <Icon name="Crown" className="mr-2" size={24} />
            СОБЫТИЯ
          </Button>
          <Button 
            variant="outline"
            className="game-shadow font-bold py-4 px-8 rounded-full bg-white/90 hover:bg-white border-4 border-[#FFB84D] text-[#FFB84D] text-xl transition-all hover:scale-105"
          >
            <Icon name="Gift" className="mr-2" size={24} />
            НАГРАДЫ
          </Button>
        </div>

        {/* Звёзды для красоты */}
        <div className="mt-12 flex justify-center gap-3 text-4xl">
          ⭐⭐⭐⭐⭐
        </div>
      </div>
    </div>
  );
}