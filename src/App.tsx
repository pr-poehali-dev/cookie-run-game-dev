import { useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import HomePage from './pages/HomePage';
import GalleryPage from './pages/GalleryPage';

const queryClient = new QueryClient();

const App = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'gallery'>('home');

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <div className="min-h-screen">
          {currentPage === 'home' ? (
            <HomePage onEnterGame={() => setCurrentPage('gallery')} />
          ) : (
            <GalleryPage onBack={() => setCurrentPage('home')} />
          )}
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;