import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import type { Article } from "@shared/schema";

export default function ArticlesSection() {
  const [, setLocation] = useLocation();
  const { data: articles, isLoading } = useQuery<Article[]>({
    queryKey: ['/api/articles'],
  });

  if (isLoading) {
    return (
      <section className="py-16 bg-white" id="makala">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Skeleton className="h-12 w-96 mx-auto mb-4" />
            <Skeleton className="h-6 w-128 mx-auto" />
          </div>
          <div className="max-w-4xl mx-auto mb-12">
            <Skeleton className="h-64 w-full rounded-2xl" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} className="h-96 w-full rounded-xl" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  const featuredArticle = articles?.[0];
  const otherArticles = articles?.slice(1) || [];

  return (
    <section className="py-16 bg-white" id="makala">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl font-bold text-islamic-green mb-4 font-playfair">Makala za Kiislamu</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Soma makala za kielimu zinazojadili masuala muhimu ya dini</p>
        </div>

        {/* Featured Article */}
        {featuredArticle && (
          <div className="max-w-4xl mx-auto mb-12 animate-slide-up">
            <Card className="bg-white border-2 border-islamic-green overflow-hidden shadow-2xl cursor-pointer hover:shadow-3xl transition-all duration-300" onClick={() => setLocation(`/article/${featuredArticle.id}`)}>
              <div className="md:flex">
                <div className="md:w-1/2">
                  <img 
                    src={featuredArticle.coverImage} 
                    alt={featuredArticle.title}
                    className="w-full h-64 md:h-full object-cover" 
                  />
                </div>
                <div className="md:w-1/2 p-8">
                  <Badge className="bg-islamic-green text-white text-sm mb-4">
                    Makala Mpya
                  </Badge>
                  <h3 className="text-3xl font-bold font-playfair mb-4 text-islamic-green">{featuredArticle.title}</h3>
                  <p className="text-gray-700 mb-6 leading-relaxed">{featuredArticle.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-islamic-green/10 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-islamic-green">SH</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{featuredArticle.author}</p>
                        <p className="text-gray-600 text-sm">
                          {new Date(featuredArticle.publishedAt).toLocaleDateString('sw-KE', { 
                            day: 'numeric', 
                            month: 'long', 
                            year: 'numeric' 
                          })}
                        </p>
                      </div>
                    </div>
                    <Button className="bg-islamic-green text-white px-6 py-2 rounded-full font-semibold hover:bg-green-700 transition-colors">
                      Soma Zaidi
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {otherArticles.map((article) => (
            <Card key={article.id} className="bg-white shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group cursor-pointer" onClick={() => setLocation(`/article/${article.id}`)}>
              <div className="relative overflow-hidden">
                <img 
                  src={article.coverImage} 
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
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">{article.excerpt}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>
                    {new Date(article.publishedAt).toLocaleDateString('sw-KE', { 
                      day: 'numeric', 
                      month: 'long', 
                      year: 'numeric' 
                    })}
                  </span>
                  <span>Dakika {article.readingTime} za kusoma</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <Button 
            onClick={() => setLocation("/articles")}
            className="bg-gradient-to-r from-islamic-green to-green-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300"
          >
            Ona Makala Zaidi
          </Button>
        </div>
      </div>
    </section>
  );
}
