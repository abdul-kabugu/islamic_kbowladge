import { useParams, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Share2, Clock, Calendar, ArrowLeft, Facebook, Twitter, MessageCircle, Mail } from "lucide-react";
import { supabaseApi } from "@/lib/supabase";
import { formatSwahiliDate } from "@/lib/data";

export default function ArticlePage() {
  const { id } = useParams();
  const [, setLocation] = useLocation();

  const { data: article, isLoading } = useQuery({
    queryKey: ['article', id],
    queryFn: () => supabaseApi.getArticles().then(articles => 
      articles.find(a => a.id === parseInt(id!))
    ),
    enabled: !!id
  });

  const { data: relatedArticles } = useQuery({
    queryKey: ['related-articles', article?.category],
    queryFn: () => supabaseApi.getArticles().then(articles => 
      articles.filter(a => a.category === article?.category && a.id !== article?.id).slice(0, 5)
    ),
    enabled: !!article
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Makala haijapatikana</h1>
          <Button onClick={() => setLocation('/')}>Rudi Nyumbani</Button>
        </div>
      </div>
    );
  }

  const shareUrl = window.location.href;
  const shareText = `${article.title} - ${article.excerpt}`;

  const handleShare = (platform: string) => {
    const urls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
      whatsapp: `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`,
      email: `mailto:?subject=${encodeURIComponent(article.title)}&body=${encodeURIComponent(shareText + '\n\n' + shareUrl)}`
    };
    
    window.open(urls[platform as keyof typeof urls], '_blank', 'width=600,height=400');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="ghost" 
              onClick={() => setLocation('/')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Rudi Nyumbani
            </Button>
            
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleShare('facebook')}
                className="flex items-center gap-2"
              >
                <Facebook className="w-4 h-4" />
                <span className="hidden sm:inline">Shiriki</span>
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleShare('twitter')}
                className="flex items-center gap-2"
              >
                <Twitter className="w-4 h-4" />
                <span className="hidden sm:inline">Tweet</span>
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => handleShare('whatsapp')}
                className="flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span className="hidden sm:inline">WhatsApp</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Article Content */}
          <div className="lg:col-span-3">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                {/* Article Image */}
                {article.cover_image && (
                  <div className="relative h-64 md:h-80 overflow-hidden">
                    <img 
                      src={article.cover_image} 
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  </div>
                )}

                {/* Article Header */}
                <div className="p-6 md:p-8">
                  {/* Bismillah */}
                  <div className="text-center mb-6">
                    <p className="text-2xl font-amiri text-islamic-green mb-4" dir="rtl">
                      بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
                    </p>
                  </div>

                  {/* Article Meta */}
                  <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-gray-600">
                    <Badge variant="secondary" className="bg-islamic-green/10 text-islamic-green">
                      {article.category}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {formatSwahiliDate(new Date(article.published_at))}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {article.reading_time} dakika za kusoma
                    </div>
                    <div className="text-islamic-green font-medium">
                      {article.author}
                    </div>
                  </div>

                  {/* Article Title */}
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight font-playfair">
                    {article.title}
                  </h1>

                  {/* Article Excerpt */}
                  <p className="text-lg text-gray-600 mb-6 leading-relaxed border-l-4 border-islamic-green pl-4 italic">
                    {article.excerpt}
                  </p>

                  <Separator className="my-6" />

                  {/* Article Content */}
                  <div className="prose prose-lg max-w-none">
                    <div 
                      className="text-gray-800 leading-relaxed space-y-4"
                      style={{ 
                        lineHeight: '1.8',
                        fontSize: '16px'
                      }}
                    >
                      {article.content.split('\n\n').map((paragraph, index) => (
                        <p key={index} className="mb-4">
                          {paragraph.trim()}
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* Author Attribution */}
                  <div className="mt-8 p-4 bg-gradient-to-r from-islamic-green/5 to-islamic-gold/5 rounded-lg border border-islamic-green/20">
                    <p className="text-sm text-gray-600 text-center">
                      <span className="font-semibold text-islamic-green">{article.author}</span>
                      <br />
                      <span className="text-xs">Sheikh Shahid Islamic Studies</span>
                    </p>
                  </div>

                  {/* Social Sharing */}
                  <div className="mt-8 pt-6 border-t">
                    <h3 className="text-lg font-semibold mb-4 text-center">Shiriki makala hii:</h3>
                    <div className="flex justify-center gap-3">
                      <Button 
                        onClick={() => handleShare('facebook')}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        <Facebook className="w-4 h-4 mr-2" />
                        Facebook
                      </Button>
                      <Button 
                        onClick={() => handleShare('twitter')}
                        className="bg-sky-500 hover:bg-sky-600 text-white"
                      >
                        <Twitter className="w-4 h-4 mr-2" />
                        Twitter
                      </Button>
                      <Button 
                        onClick={() => handleShare('whatsapp')}
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        WhatsApp
                      </Button>
                      <Button 
                        onClick={() => handleShare('email')}
                        variant="outline"
                      >
                        <Mail className="w-4 h-4 mr-2" />
                        Barua pepe
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Categories Menu */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-4 text-islamic-green">Mada za Kimsingi</h3>
                  <div className="space-y-2">
                    {['Akidah', 'Fiqh', 'Maadili', 'Tarehe'].map((category) => (
                      <Button
                        key={category}
                        variant="ghost"
                        className="w-full justify-start text-sm hover:bg-islamic-green/10 hover:text-islamic-green"
                        onClick={() => setLocation(`/?category=${category}`)}
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Related Articles */}
              {relatedArticles && relatedArticles.length > 0 && (
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-4 text-islamic-green">Makala za kufanana</h3>
                    <div className="space-y-3">
                      {relatedArticles.map((relArticle) => (
                        <div 
                          key={relArticle.id}
                          className="cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
                          onClick={() => setLocation(`/article/${relArticle.id}`)}
                        >
                          <h4 className="font-medium text-sm leading-tight mb-1 hover:text-islamic-green transition-colors">
                            {relArticle.title}
                          </h4>
                          <p className="text-xs text-gray-500 line-clamp-2">
                            {relArticle.excerpt}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {relArticle.category}
                            </Badge>
                            <span className="text-xs text-gray-400">
                              {relArticle.reading_time} min
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Quick Links */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-4 text-islamic-green">Viungo vya haraka</h3>
                  <div className="space-y-2">
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-sm"
                      onClick={() => setLocation('/#audio')}
                    >
                      Mafunzo ya Sauti
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-sm"
                      onClick={() => setLocation('/#videos')}
                    >
                      Video za Mafunzo
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-sm"
                      onClick={() => setLocation('/#schedule')}
                    >
                      Ratiba za Darsa
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-sm"
                      onClick={() => setLocation('/dashboard')}
                    >
                      Dashboard ya Msimamizi
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}