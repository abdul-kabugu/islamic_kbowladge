import { Button } from "@/components/ui/button";

export default function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="nyumbani" className="relative bg-gradient-to-br from-warm-orange via-yellow-400 to-warm-yellow py-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.3"%3E%3Cpath d="M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')`
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="lg:w-1/2 text-center lg:text-left mb-10 lg:mb-0">
            <div className="animate-fade-in">
              <h1 className="text-5xl lg:text-7xl font-bold font-amiri text-white mb-4 leading-tight">
                الشيخ شاهد محمد زيد
              </h1>
              <h2 className="text-2xl lg:text-3xl font-playfair text-white/90 mb-6">
                Sheikh Shahid Muhammad Zaid
              </h2>
              <p className="text-xl text-white/80 mb-8 leading-relaxed">
                Utanama Pwa Uharimu wa Salaf • Mafunzo ya Kiislamu Yanayofuata Qur'an na Sunnah
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button 
                  onClick={() => scrollToSection('mafunzo')}
                  className="bg-white text-islamic-green px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg"
                >
                  Sikiliza Hotuba
                </Button>
                <Button 
                  onClick={() => scrollToSection('makala')}
                  variant="outline"
                  className="border-2 border-white text-green-700 px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-islamic-green transition-all duration-300"
                >
                  Soma Makala
                </Button>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 flex justify-center">
            <div className="relative animate-float">
              {/* Beautiful mosque architecture */}
              <div className="w-80 h-80 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1564769625905-50e93615e769?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=400" 
                  alt="Beautiful mosque with golden dome and minarets" 
                  className="w-64 h-64 rounded-full object-cover shadow-xl" 
                />
              </div>
              {/* Floating Arabic calligraphy */}
              <div className="absolute -top-4 -right-4 bg-white/90 rounded-full p-4 shadow-lg">
                <span className="text-2xl font-amiri text-islamic-green">الله</span>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white/90 rounded-full p-4 shadow-lg">
                <span className="text-2xl font-amiri text-islamic-green">محمد</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
