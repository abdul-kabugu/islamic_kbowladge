import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import type { Article } from "@shared/schema";
import { supabaseApi, supabase, type SupabaseArticle, type SupabaseAudioContent, type SupabaseVideo, type SupabaseSchedule } from "@/lib/supabase";

export default function ArticlesPage() {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

 /* const { data: articles, isLoading } = useQuery<Article[]>({
    queryKey: ['/api/articles'],
  });*/

    // Queries for each content type
    const { data: articles, isLoading: articlesLoading } = useQuery({
      queryKey: ['dashboard-articles'],
      queryFn: supabaseApi.getArticles,
     
    });
console.log("articles", articles)
  const categories = ["All", "Aqeedah", "Fiqh", "Tafseer", "Hadith", "Sirah"];

  const filteredArticles = articles?.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (articlesLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <Skeleton className="h-8 w-32 mb-4" />
            <Skeleton className="h-12 w-96 mb-4" />
            <Skeleton className="h-6 w-128" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 9 }).map((_, index) => (
              <Skeleton key={index} className="h-96 w-full rounded-xl" />
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
            Makala Zote za Kiislamu
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            Soma makala zote za kielimu zinazojadili masuala muhimu ya dini ya Kiislamu
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 bg-white rounded-xl p-6 shadow-lg">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Tafuta makala..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category 
                    ? "bg-islamic-green text-white" 
                    : "border-islamic-green text-islamic-green hover:bg-islamic-green hover:text-white"
                  }
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Makala {filteredArticles?.length || 0} zimepatikana
            {searchQuery && ` kwa "${searchQuery}"`}
            {selectedCategory !== "All" && ` katika kategoria ya ${selectedCategory}`}
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles?.map((article) => (
            <Card 
              key={article.id} 
              className="bg-white shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group cursor-pointer"
              onClick={() => setLocation(`/article/${article.id}`)}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={article.cover_image} 
                  alt={article.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" 
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-islamic-green text-white">
                    {article.category}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-islamic-green mb-3 group-hover:text-warm-orange transition-colors">
                  {article.title}
                </h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed line-clamp-3">
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>
                    {new Date(article.published_at).toLocaleDateString('sw-KE', { 
                      day: 'numeric', 
                      month: 'long', 
                      year: 'numeric' 
                    })}
                  </span>
                  <span>Dakika {article.reading_time} za kusoma</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredArticles?.length === 0 && (
          <div className="text-center py-12">
            <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">Hakuna makala zilizopatikana</h3>
            <p className="text-gray-500 mb-4">Jaribu kutafuta kwa maneno mengine au chagua kategoria nyingine</p>
            <Button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="bg-islamic-green text-white hover:bg-green-700"
            >
              Ondoa filtah zote
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}