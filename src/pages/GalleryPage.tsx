import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface GalleryPageProps {
  onBack: () => void;
}

interface Cookie {
  id: number;
  name: string;
  emoji: string;
  rarity: 'Common' | 'Rare' | 'Epic' | 'Legendary';
  power: number;
  defense: number;
  description: string;
  type: string;
}

const cookies: Cookie[] = [
  {
    id: 1,
    name: 'Храбрая Печенька',
    emoji: '🍪',
    rarity: 'Epic',
    power: 250,
    defense: 4,
    description: 'Отважный воин королевства печенек. Защищает своих друзей любой ценой!',
    type: 'Воин'
  },
  {
    id: 2,
    name: 'Волшебная Печенька',
    emoji: '🧙',
    rarity: 'Legendary',
    power: 320,
    defense: 2,
    description: 'Владеет древней магией сахарной пудры. Может создавать мощные заклинания!',
    type: 'Маг'
  },
  {
    id: 3,
    name: 'Клубничная Печенька',
    emoji: '🍓',
    rarity: 'Rare',
    power: 180,
    defense: 3,
    description: 'Милая и добрая печенька. Лечит союзников своей клубничной магией.',
    type: 'Целитель'
  },
  {
    id: 4,
    name: 'Шоколадная Печенька',
    emoji: '🍫',
    rarity: 'Epic',
    power: 280,
    defense: 5,
    description: 'Сильный защитник с броней из темного шоколада. Танк команды!',
    type: 'Танк'
  },
  {
    id: 5,
    name: 'Ванильная Печенька',
    emoji: '🍦',
    rarity: 'Common',
    power: 120,
    defense: 2,
    description: 'Простая, но очаровательная печенька. Отличный выбор для начинающих!',
    type: 'Поддержка'
  },
  {
    id: 6,
    name: 'Королевская Печенька',
    emoji: '👑',
    rarity: 'Legendary',
    power: 350,
    defense: 4,
    description: 'Правитель Cookie Kingdom! Обладает невероятной силой и харизмой.',
    type: 'Лидер'
  }
];

const rarityColors = {
  Common: 'bg-gray-400',
  Rare: 'bg-blue-400',
  Epic: 'bg-purple-500',
  Legendary: 'bg-yellow-400'
};

export default function GalleryPage({ onBack }: GalleryPageProps) {
  return (
    <div className="min-h-screen purple-gradient p-6">
      {/* Шапка */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center justify-between mb-6">
          <Button 
            onClick={onBack}
            className="game-shadow font-bold py-3 px-6 rounded-full bg-white/90 hover:bg-white border-4 border-[#FFB84D] text-[#FFB84D] text-lg transition-all hover:scale-105"
          >
            <Icon name="ArrowLeft" className="mr-2" size={24} />
            НАЗАД
          </Button>
          
          <h1 className="text-5xl md:text-6xl font-black text-white drop-shadow-[0_4px_0_rgba(0,0,0,0.3)]"
              style={{ textShadow: '3px 3px 0 #FFB84D' }}>
            ГАЛЕРЕЯ ПЕЧЕНЕК
          </h1>
          
          <div className="flex gap-2">
            <Button 
              variant="outline"
              className="game-shadow font-bold py-3 px-6 rounded-full bg-white/90 hover:bg-white border-4 border-[#FFB84D] text-[#FFB84D] text-lg"
            >
              <Icon name="Star" className="mr-2" size={24} />
              {cookies.length}
            </Button>
          </div>
        </div>
      </div>

      {/* Галерея карточек */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cookies.map((cookie) => (
          <Card 
            key={cookie.id}
            className="game-shadow overflow-hidden border-4 border-white bg-white/95 hover:scale-105 transition-all cursor-pointer"
          >
            <CardHeader className="bg-gradient-to-br from-[#FFB84D] to-[#FF6B9D] pb-4">
              <div className="flex justify-between items-start mb-2">
                <Badge className={`${rarityColors[cookie.rarity]} text-white font-bold border-2 border-white text-sm px-3 py-1`}>
                  {cookie.rarity}
                </Badge>
                <Badge variant="outline" className="bg-white/90 font-bold border-2 border-white">
                  {cookie.type}
                </Badge>
              </div>
              
              <div className="text-center my-4">
                <div className="text-8xl mb-2 cookie-bounce">
                  {cookie.emoji}
                </div>
                <CardTitle className="text-3xl font-black text-white drop-shadow-[0_2px_0_rgba(0,0,0,0.3)]">
                  {cookie.name}
                </CardTitle>
              </div>
            </CardHeader>
            
            <CardContent className="pt-6">
              <CardDescription className="text-gray-700 mb-4 text-base">
                {cookie.description}
              </CardDescription>
              
              {/* Характеристики */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-gray-700 flex items-center">
                    <Icon name="Zap" size={20} className="mr-2 text-yellow-500" />
                    Сила:
                  </span>
                  <span className="text-xl font-black text-[#FF6B9D]">{cookie.power}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="font-bold text-gray-700 flex items-center">
                    <Icon name="Shield" size={20} className="mr-2 text-blue-500" />
                    Защита:
                  </span>
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div 
                        key={i}
                        className={`w-3 h-3 rounded-full ${i < cookie.defense ? 'bg-green-500' : 'bg-gray-300'}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              
              <Button 
                className="w-full game-shadow font-bold py-3 rounded-full text-white text-lg transition-all hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #A85F7 0%, #8b5cf6 100%)' }}
              >
                <Icon name="Gamepad2" className="mr-2" size={20} />
                ИГРАТЬ
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Футер с иконками */}
      <div className="max-w-7xl mx-auto mt-12 text-center">
        <div className="flex justify-center gap-4 text-5xl mb-4">
          🍪 👑 ❤️ ⭐
        </div>
        <p className="text-white font-bold text-xl drop-shadow-lg">
          Собери всех печенек и стань королём!
        </p>
      </div>
    </div>
  );
}
