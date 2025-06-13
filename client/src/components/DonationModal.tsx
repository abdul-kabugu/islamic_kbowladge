import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Heart, X } from "lucide-react";
import QRCode from "qrcode";

export default function DonationModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState("");

  const phoneNumber = 22189644;
  const organizationName = "Hadith Media";

  useEffect(() => {
    // Show donation modal after 30 seconds
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 30000);

    return () => clearTimeout(timer);
  }, []);

  const generateQRCode = async () => {
    try {
      const qrDataUrl = await QRCode.toDataURL(phoneNumber.toString(), {
        width: 200,
        margin: 2,
        color: {
          dark: '#FF8C42', // warm-orange
          light: '#FFFFFF'
        }
      });
      setQrCodeDataUrl(qrDataUrl);
      setShowQRCode(true);
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  };

  return (
    <>
      {/* Floating Donate Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-warm-orange to-warm-yellow hover:from-warm-yellow hover:to-warm-orange text-gray-900 rounded-full p-4 shadow-2xl transition-all duration-300 hover:scale-110 border-2 border-white/20"
      >
        <Heart className="w-6 h-6" />
        <span className="ml-2 font-semibold">Changia</span>
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md mx-auto">
          <DialogHeader>
            <div className="flex justify-between items-center">
              <DialogTitle className="sr-only">Changia Kazi ya Dawa</DialogTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="absolute right-4 top-4"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </DialogHeader>

          <div className="text-center py-6">
            {!showQRCode ? (
              <>
                <div className="w-16 h-16 bg-gradient-to-r from-warm-orange to-warm-yellow rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-islamic-green mb-2 font-playfair">Changia Kazi ya Dawa</h3>
                <p className="text-gray-600 mb-6">Msaada wako unatusaidia kuendeleza kazi ya kutangaza dini ya kweli kwa waislamu wote.</p>

                <div className="space-y-4 mb-6">
                  <Button 
                    onClick={generateQRCode}
                    className="w-full bg-gradient-to-r from-islamic-green to-green-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
                  >
                    Changia Kwa M-Pesa
                  </Button>
                  <Button 
                    onClick={generateQRCode}
                    variant="outline"
                    className="w-full border-2 border-islamic-green text-islamic-green py-3 rounded-lg font-semibold hover:bg-islamic-green hover:text-white transition-all"
                  >
                    Changia Kwa Airtel Money
                  </Button>
                </div>

                <div className="text-center">
                  <p className="text-sm text-gray-500 mb-4 font-amiri">والله يجزي المحسنين</p>
                  <p className="text-xs text-gray-400">Allah anawajaza wema wafanyao mema</p>
                </div>
              </>
            ) : (
              <div className="bg-gradient-to-br from-warm-orange/10 to-warm-yellow/10 border-2 border-gradient-to-r from-warm-orange to-warm-yellow p-8 rounded-xl shadow-lg">
                <div className="mb-6">
                  {qrCodeDataUrl && (
                    <div className="flex justify-center mb-6">
                      <div className="bg-white p-4 rounded-xl shadow-lg border-4 border-gradient-to-r from-warm-orange to-warm-yellow">
                        <img 
                          src={qrCodeDataUrl} 
                          alt="QR Code for donation" 
                          className="rounded-lg"
                        />
                      </div>
                    </div>
                  )}
                  <p className="text-warm-orange text-xl font-bold mb-6 text-center font-playfair">Scan QR Code</p>
                  
                  <div className="bg-white/50 backdrop-blur-sm rounded-lg p-4 mb-4 border border-warm-orange/20">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-gray-700 font-medium">Namba ya Lipa:</span>
                      <span className="text-warm-orange font-bold text-xl">{phoneNumber}</span>
                    </div>
                    
                    <div className="text-center pt-3 border-t border-warm-orange/20">
                      <p className="text-gray-800 font-bold text-lg">{organizationName}</p>
                      <p className="text-sm text-gray-600 mt-1">Kazi ya Dawa na Uongozi</p>
                    </div>
                  </div>

                  <div className="text-center mb-4">
                    <p className="text-sm text-gray-600 font-amiri">بارك الله فيكم</p>
                    <p className="text-xs text-gray-500">Baraka Allah fikum</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button 
                    onClick={() => setShowQRCode(false)}
                    className="w-full bg-gradient-to-r from-warm-orange to-warm-yellow text-white hover:from-warm-yellow hover:to-warm-orange transition-all py-3 rounded-lg font-semibold shadow-md"
                  >
                    Rudi Nyuma
                  </Button>
                  
                  <Button 
                    onClick={() => setIsOpen(false)}
                    variant="outline"
                    className="w-full border-2 border-warm-orange/30 text-gray-600 hover:bg-warm-orange/10 transition-all py-2 rounded-lg"
                  >
                    Funga
                  </Button>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
