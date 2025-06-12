import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Heart, X } from "lucide-react";

export default function DonationModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show donation modal after 30 seconds
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 30000);

    return () => clearTimeout(timer);
  }, []);

  return (
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
          <div className="w-16 h-16 bg-gradient-to-r from-warm-orange to-warm-yellow rounded-full flex items-center justify-center mx-auto mb-4">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-islamic-green mb-2 font-playfair">Changia Kazi ya Dawa</h3>
          <p className="text-gray-600 mb-6">Msaada wako unatusaidia kuendeleza kazi ya kutangaza dini ya kweli kwa waislamu wote.</p>

          <div className="space-y-4 mb-6">
            <Button className="w-full bg-gradient-to-r from-islamic-green to-green-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all">
              Changia Kwa M-Pesa
            </Button>
            <Button 
              variant="outline"
              className="w-full border-2 border-islamic-green text-islamic-green py-3 rounded-lg font-semibold hover:bg-islamic-green hover:text-white transition-all"
            >
              Changia Kwa PayPal
            </Button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-500 mb-4 font-amiri">والله يجزي المحسنين</p>
            <p className="text-xs text-gray-400">Allah anawajaza wema wafanyao mema</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
