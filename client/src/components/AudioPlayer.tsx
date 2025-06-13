import { useState, useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Play, Pause, SkipBack, SkipForward, Volume2 } from "lucide-react";
import type { AudioContent } from "@shared/schema";
import { supabaseApi, supabase, type SupabaseArticle, type SupabaseAudioContent, type SupabaseVideo, type SupabaseSchedule } from "@/lib/supabase";

export default function AudioPlayer() {
  const [, setLocation] = useLocation();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);


   const { data: audioContent, isLoading: audioLoading } = useQuery({
       queryKey: ['dashboard-audio'],
       queryFn: supabaseApi.getAudioContent,
       //enabled: activeTab === 'audio'
     });
   const currentAudio = audioContent?.find(audio => audio.is_currently_playing);
const audioList = audioContent?.filter(audio => !audio.is_currently_playing)
  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const updateTime = () => setCurrentTime(audio.currentTime);
      const updateDuration = () => setDuration(audio.duration);
      
      audio.addEventListener('timeupdate', updateTime);
      audio.addEventListener('loadedmetadata', updateDuration);
      
      return () => {
        audio.removeEventListener('timeupdate', updateTime);
        audio.removeEventListener('loadedmetadata', updateDuration);
      };
    }
  }, [currentAudio]);

  if (audioLoading) {
    return (
      <section className="py-16 bg-white" id="mafunzo">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Skeleton className="h-12 w-96 mx-auto mb-4" />
            <Skeleton className="h-6 w-128 mx-auto" />
          </div>
          <div className="max-w-4xl mx-auto">
            <Skeleton className="h-64 w-full rounded-2xl mb-8" />
            <div className="grid md:grid-cols-2 gap-6">
              <Skeleton className="h-32 w-full rounded-xl" />
              <Skeleton className="h-32 w-full rounded-xl" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white" id="mafunzo">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl font-bold text-islamic-green mb-4 font-playfair">Mafunzo ya Sasa</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Sikiliza mafunzo mapya ya Sheikh Shahid kuhusu masuala mbalimbali ya dini</p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Current Audio Player */}
          {currentAudio && (
            <Card className="bg-white border-2 border-islamic-green shadow-2xl mb-8 animate-slide-up">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  {/* Audio Cover */}
                  <div className="w-32 h-32 rounded-xl overflow-hidden shadow-lg flex-shrink-0">
                    <img 
                      src={currentAudio.cover_image} 
                      alt={currentAudio.title}
                      className="w-full h-full object-cover" 
                    />
                  </div>

                  <div className="flex-grow text-center md:text-left">
                    <h3 className="text-2xl font-bold mb-2 font-playfair text-islamic-green">{currentAudio.title}</h3>
                    <p className="text-gray-700 mb-4">{currentAudio.description}</p>
                    
                    {/* Audio Controls */}
                    <div className="flex items-center gap-4 mb-4 justify-center md:justify-start">
                      <Button 
                        size="icon"
                        variant="ghost"
                        className="bg-islamic-green/10 hover:bg-islamic-green/20 rounded-full p-3 text-islamic-green"
                      >
                        <SkipBack className="w-5 h-5" />
                      </Button>
                      <Button 
                        size="icon"
                        onClick={togglePlayPause}
                        className="bg-islamic-green text-white rounded-full p-4 hover:bg-green-700 transition-colors shadow-lg"
                      >
                        {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                      </Button>
                      <Button 
                        size="icon"
                        variant="ghost"
                        className="bg-islamic-green/10 hover:bg-islamic-green/20 rounded-full p-3 text-islamic-green"
                      >
                        <SkipForward className="w-5 h-5" />
                      </Button>
                    </div>

                    {/* Progress Bar */}
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-600">{formatTime(currentTime)}</span>
                      <div className="flex-grow bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-islamic-green rounded-full h-2 transition-all duration-300"
                          style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                        />
                      </div>
                      <span className="text-sm text-gray-600">{currentAudio.duration}</span>
                    </div>

                    {/* Hidden Audio Element */}
                    <audio 
                      ref={audioRef}
                      src={currentAudio.audioUrl}
                      preload="metadata"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Recent Audio List */}
          <div className="grid md:grid-cols-2 gap-6">
            {audioList?.filter(audio => !audio.isCurrentlyPlaying).map((audio) => (
              <Card key={audio.id} className="bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer group">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-lg overflow-hidden">
                      <img 
                        src={audio.cover_image} 
                        alt={audio.title}
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-semibold text-islamic-green group-hover:text-warm-orange transition-colors">
                        {audio.title}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        Tarehe: {new Date(audio.published_at).toLocaleDateString('sw-KE', { 
                          day: 'numeric', 
                          month: 'long', 
                          year: 'numeric' 
                        })}
                      </p>
                      <p className="text-gray-500 text-xs">Muda: {audio.duration}</p>
                    </div>
                    <Button 
                      size="icon"
                      variant="ghost"
                      className="text-islamic-green group-hover:text-warm-orange"
                    >
                      <Play className="w-5 h-5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* View More Audio Button */}
          <div className="text-center mt-12">
            <Button 
              onClick={() => setLocation("/audio")}
              className="bg-gradient-to-r from-islamic-green to-green-600 text-yellow-600 px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300"
            >
              Sikiliza Mafunzo Zaidi
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
