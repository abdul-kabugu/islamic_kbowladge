import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Play, Youtube } from "lucide-react";
import type { Video } from "@shared/schema";
import { supabaseApi, supabase, type SupabaseArticle, type SupabaseAudioContent, type SupabaseVideo, type SupabaseSchedule } from "@/lib/supabase";

export default function VideoSection() {
  /*const { data: videos, isLoading } = useQuery<Video[]>({
    queryKey: ['/api/videos'],
  });*/

   const { data: videos, isLoading: videosLoading } = useQuery({
    queryKey: ['dashboard-videos'],
    queryFn: supabaseApi.getVideos,
    //enabled: activeTab === 'videos'
  });

  console.log("videos", videos)

  if (videosLoading) {
    return (
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white" id="hotuba">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Skeleton className="h-12 w-96 mx-auto mb-4" />
            <Skeleton className="h-6 w-128 mx-auto" />
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <Skeleton className="h-96 w-full rounded-xl" />
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <Skeleton key={index} className="h-24 w-full rounded-lg" />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  const featuredVideo = videos?.[0];
  const otherVideos = videos?.slice(1, 6) || [];

  const openYouTubeVideo = (youtubeId: string) => {
    window.open(`https://www.youtube.com/watch?v=${youtubeId}`, '_blank');
  };

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white" id="hotuba">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl font-bold text-islamic-green mb-4 font-playfair">Video Mafunzo</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Ona mafunzo ya video yanayofundisha masuala mbalimbali ya Kiislamu</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Featured Video */}
          {featuredVideo && (
            <Card className="bg-white shadow-lg overflow-hidden animate-slide-up">
              <div className="relative">
                <div className="aspect-video bg-gray-200 flex items-center justify-center">
                  <img 
                    src={`https://img.youtube.com/vi/${featuredVideo.youtube_id}/maxresdefault.jpg`}
                    alt={featuredVideo.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <button 
                  onClick={() => openYouTubeVideo(featuredVideo.youtube_id)}
                  className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors group"
                >
                  <div className="bg-red-600 rounded-full p-4 group-hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 text-white fill-current" />
                  </div>
                </button>
                <div className="absolute top-4 right-4">
                  <Youtube className="w-8 h-8 text-red-600" />
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-islamic-green mb-3">{featuredVideo.title}</h3>
                <p className="text-gray-600 mb-4">{featuredVideo.description}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>
                    {new Date(featuredVideo.publishedAt).toLocaleDateString('sw-KE', { 
                      day: 'numeric', 
                      month: 'long', 
                      year: 'numeric' 
                    })}
                  </span>
                  <span>{featuredVideo.duration}</span>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Video List */}
          <div className="space-y-4">
            {otherVideos.map((video) => (
              <Card 
                key={video.id} 
                className="bg-white shadow-md hover:shadow-lg transition-shadow cursor-pointer group"
                onClick={() => openYouTubeVideo(video.youtube_id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-24 h-16 bg-gray-200 rounded-lg flex-shrink-0 flex items-center justify-center relative overflow-hidden">
                      <img 
                        src={`https://img.youtube.com/vi/${video.youtube_id}/default.jpg`}
                        alt={video.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <Play className="w-4 h-4 text-white fill-current" />
                      </div>
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-semibold text-islamic-green group-hover:text-warm-orange transition-colors">
                        {video.title}
                      </h4>
                      <p className="text-gray-600 text-sm">{video.description}</p>
                      <span className="text-gray-500 text-xs">{video.duration}</span>
                    </div>
                    <Youtube className="w-5 h-5 text-red-600" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
