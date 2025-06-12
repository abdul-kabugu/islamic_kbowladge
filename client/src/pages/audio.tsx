import { useState, useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Play, Pause, Search, Calendar, Clock } from "lucide-react";
import type { AudioContent } from "@shared/schema";

export default function AudioPage() {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPlayingId, setCurrentPlayingId] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const { data: audioList, isLoading } = useQuery<AudioContent[]>({
    queryKey: ['/api/audio'],
  });

  const filteredAudio = audioList?.filter(audio =>
    audio.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    audio.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const playAudio = (audio: AudioContent) => {
    if (currentPlayingId === audio.id && isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      if (audioRef.current) {
        audioRef.current.src = audio.audioUrl;
        audioRef.current.play();
        setCurrentPlayingId(audio.id);
        setIsPlaying(true);
      }
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const handleEnded = () => {
        setIsPlaying(false);
        setCurrentPlayingId(null);
      };
      
      audio.addEventListener('ended', handleEnded);
      return () => audio.removeEventListener('ended', handleEnded);
    }
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <Skeleton className="h-8 w-32 mb-4" />
            <Skeleton className="h-12 w-96 mb-4" />
            <Skeleton className="h-6 w-128" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 9 }).map((_, index) => (
              <Skeleton key={index} className="h-64 w-full rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => setLocation("/")}
            className="mb-4 text-islamic-green hover:text-green-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Rudi Nyumbani
          </Button>
          <h1 className="text-4xl font-bold text-islamic-green mb-4 font-playfair">
            Mafunzo Yote ya Sauti
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            Sikiliza mafunzo yote ya Sheikh Shahid kuhusu masuala mbalimbali ya dini ya Kiislamu
          </p>
        </div>

        {/* Search */}
        <div className="mb-8 bg-white rounded-xl p-6 shadow-lg">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Tafuta mafunzo ya sauti..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Mafunzo {filteredAudio?.length || 0} ya sauti yamepatikana
            {searchQuery && ` kwa "${searchQuery}"`}
          </p>
        </div>

        {/* Audio Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAudio?.map((audio) => (
            <Card 
              key={audio.id} 
              className="bg-white shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
            >
              <div className="relative overflow-hidden">
                <img 
                  src={audio.coverImage} 
                  alt={audio.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" 
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button
                    size="icon"
                    onClick={() => playAudio(audio)}
                    className="bg-white/90 text-islamic-green rounded-full p-4 hover:bg-white hover:scale-110 transition-all duration-300 shadow-lg"
                  >
                    {currentPlayingId === audio.id && isPlaying ? (
                      <Pause className="w-6 h-6" />
                    ) : (
                      <Play className="w-6 h-6" />
                    )}
                  </Button>
                </div>
                {currentPlayingId === audio.id && (
                  <div className="absolute top-4 right-4 bg-islamic-green text-white px-2 py-1 rounded-full text-xs font-semibold">
                    Inachezwa Sasa
                  </div>
                )}
              </div>
              
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-islamic-green mb-3 group-hover:text-warm-orange transition-colors">
                  {audio.title}
                </h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-2">
                  {audio.description}
                </p>
                
                <div className="space-y-2 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>
                      {new Date(audio.publishedAt).toLocaleDateString('sw-KE', { 
                        day: 'numeric', 
                        month: 'long', 
                        year: 'numeric' 
                      })}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>Muda: {audio.duration}</span>
                  </div>
                </div>

                <Button
                  onClick={() => playAudio(audio)}
                  className="w-full mt-4 bg-islamic-green text-white hover:bg-green-700 transition-colors"
                >
                  {currentPlayingId === audio.id && isPlaying ? (
                    <>
                      <Pause className="w-4 h-4 mr-2" />
                      Simamisha
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Cheza
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredAudio?.length === 0 && (
          <div className="text-center py-12">
            <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Hakuna mafunzo yalipatikana</h3>
            <p className="text-gray-500 mb-4">Jaribu kutafuta kwa maneno mengine</p>
            <Button
              onClick={() => setSearchQuery("")}
              className="bg-islamic-green text-white hover:bg-green-700"
            >
              Ondoa utafutaji
            </Button>
          </div>
        )}

        {/* Hidden Audio Element */}
        <audio ref={audioRef} preload="metadata" />
      </div>
    </div>
  );
}