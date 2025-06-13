import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Schedule } from "@shared/schema";
import { supabaseApi, supabase, type SupabaseArticle, type SupabaseAudioContent, type SupabaseVideo, type SupabaseSchedule } from "@/lib/supabase";

export default function DarsaSchedule() {
  const [currentMosqueIndex, setCurrentMosqueIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  /*const { data: schedules, isLoading } = useQuery<Schedule[]>({
    queryKey: ['/api/schedules'],
  });*/

   const { data: schedules, isLoading: schedulesLoading } = useQuery({
    queryKey: ['dashboard-schedules'],
    queryFn: supabaseApi.getSchedules,
    //enabled: activeTab === 'schedules'
  });

  console.log("schedules", schedules)
  // Check for mobile screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  if (schedulesLoading) {
    return (
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white" id="ratiba">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Skeleton className="h-12 w-96 mx-auto mb-4" />
            <Skeleton className="h-6 w-128 mx-auto" />
          </div>
          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <Skeleton className="h-96 w-full rounded-2xl" />
            <Skeleton className="h-96 w-full rounded-2xl" />
          </div>
        </div>
      </section>
    );
  }

  // Group schedules by mosque
  const mosqueGroups = schedules?.reduce((acc, schedule) => {
    const key = schedule.mosque_name;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(schedule);
    return acc;
  }, {} as Record<string, Schedule[]>) || {};

   console.log("mosques group", mosqueGroups)
  const mosqueNames = Object.keys(mosqueGroups);
  const totalMosques = mosqueNames.length;

  const itemsPerSlide = isMobile ? 1 : 2;
  const maxSlides = Math.ceil(totalMosques / itemsPerSlide);

  const nextMosque = () => {
    setCurrentMosqueIndex((prev) => {
      const nextIndex = prev + itemsPerSlide;
      return nextIndex >= totalMosques ? 0 : nextIndex;
    });
  };

  const prevMosque = () => {
    setCurrentMosqueIndex((prev) => {
      const prevIndex = prev - itemsPerSlide;
      return prevIndex < 0 ? Math.max(0, totalMosques - itemsPerSlide) : prevIndex;
    });
  };

  const getCurrentMosques = () => {
    if (totalMosques === 0) return [];
    const result = [];
    for (let i = 0; i < itemsPerSlide && (currentMosqueIndex + i) < totalMosques; i++) {
      const index = currentMosqueIndex + i;
      result.push({
        name: mosqueNames[index],
        schedules: mosqueGroups[mosqueNames[index]]
      });
    }
    return result;
  };

  const currentMosques = getCurrentMosques();

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white" id="ratiba">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl font-bold text-islamic-green mb-4 font-playfair">Ratiba ya Darsa za Live</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Fuata ratiba za darsa kutoka misikiti mbalimbali kila wiki</p>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-6xl mx-auto">
          {/* Carousel Navigation */}
          {totalMosques > itemsPerSlide && (
            <>
              <Button
                size="icon"
                variant="outline"
                onClick={prevMosque}
                className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white shadow-lg rounded-full text-islamic-green hover:text-warm-orange z-10"
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>
              <Button
                size="icon"
                variant="outline"
                onClick={nextMosque}
                className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white shadow-lg rounded-full text-islamic-green hover:text-warm-orange z-10"
              >
                <ChevronRight className="w-6 h-6" />
              </Button>
            </>
          )}

          {/* Schedule Cards */}
          <div className={`grid gap-8 animate-slide-up ${isMobile ? 'grid-cols-1' : 'lg:grid-cols-2'}`}>
            {currentMosques.map((mosque, index) => (
              <Card key={mosque.name} className="bg-white shadow-xl overflow-hidden border border-gray-100">
                <CardHeader className={`${index === 0 ? 'gradient-green' : 'gradient-orange-yellow'} text-white`}>
                  <CardTitle className="text-2xl font-bold font-playfair mb-2">{mosque.name}</CardTitle>
                  <p className="text-white/80">{mosque.schedules[0]?.mosqueLocation}</p>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {mosque.schedules.map((schedule : SupabaseSchedule) => (
                      <div 
                        key={schedule.id} 
                        className={`flex items-center justify-between p-3 rounded-lg ${
                          schedule.day_of_week === 'Jumatatu' 
                            ? 'bg-islamic-green/10 border-l-4 border-islamic-green' 
                            : 'bg-gray-50'
                        }`}
                      >
                        <div>
                          <span className={`font-semibold ${
                            index === 0 ? 'text-islamic-green' : 'text-warm-orange'
                          }`}>
                            {schedule.day_of_week}
                          </span>
                          <p className="text-sm text-gray-600">{schedule.subject}</p>
                        </div>
                        <div className="text-right">
                          <span className="font-semibold">{schedule.teacher}</span>
                          <p className="text-sm text-gray-600">{schedule.additional_info}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Carousel Indicators */}
          {totalMosques > itemsPerSlide && (
            <div className="flex justify-center mt-8 space-x-2">
              {Array.from({ length: maxSlides }).map((_, index) => (
                <Button
                  key={index}
                  size="sm"
                  variant="ghost"
                  className={`w-3 h-3 rounded-full p-0 ${
                    Math.floor(currentMosqueIndex / itemsPerSlide) === index 
                      ? 'bg-islamic-green' 
                      : 'bg-gray-300'
                  }`}
                  onClick={() => setCurrentMosqueIndex(index * itemsPerSlide)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
