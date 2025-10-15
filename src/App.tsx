import { useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import HomePage from './pages/HomePage';
import GalleryPage from './pages/GalleryPage';
import MemoryGame from './pages/MemoryGame';

const queryClient = new QueryClient();

const App = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'gallery' | 'memory'>('home');

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <div className="min-h-screen">
          {currentPage === 'home' && (
            <HomePage 
              onEnterGame={() => setCurrentPage('gallery')}
              onMemoryGame={() => setCurrentPage('memory')}
            />
          )}
          {currentPage === 'gallery' && (
            <GalleryPage onBack={() => setCurrentPage('home')} />
          )}
          {currentPage === 'memory' && (
            <MemoryGame onBack={() => setCurrentPage('home')} />
          )}
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;