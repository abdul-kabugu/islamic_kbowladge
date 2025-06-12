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
          dark: '#000000',
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
        className="fixed bottom-6 right-6 z-50 bg-islamic-green hover:bg-green-700 text-white rounded-full p-4 shadow-2xl transition-all duration-300 hover:scale-110"
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
              <div className="bg-black text-white p-8 rounded-lg">
                <div className="mb-6">
                  {qrCodeDataUrl && (
                    <div className="flex justify-center mb-4">
                      <img 
                        src={qrCodeDataUrl} 
                        alt="QR Code for donation" 
                        className="border-4 border-white rounded-lg shadow-lg"
                      />
                    </div>
                  )}
                  <p className="text-blue-400 text-lg font-semibold mb-4">Scan Qr code</p>
                  
                  <hr className="border-gray-400 mb-4" />
                  
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-white font-medium">Lipa Number</span>
                    <span className="text-white font-bold text-lg">{phoneNumber}</span>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-white font-semibold text-lg">{organizationName}</p>
                  </div>
                </div>

                <Button 
                  onClick={() => setShowQRCode(false)}
                  variant="outline"
                  className="w-full border-white text-white hover:bg-white hover:text-black transition-all"
                >
                  Rudi Nyuma
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
