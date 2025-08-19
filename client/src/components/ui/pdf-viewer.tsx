import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, Eye, X } from "lucide-react";

interface PDFViewerProps {
  pdfUrl: string;
  title: string;
  trigger?: React.ReactNode;
}

export function PDFViewer({ pdfUrl, title, trigger }: PDFViewerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = `${title}.pdf`;
    link.click();
  };

  const actualPdfUrl = pdfUrl.startsWith('@assets/') 
    ? pdfUrl.replace('@assets/', '/attached_assets/')
    : pdfUrl;

  return (
    <>
      {trigger ? (
        <div onClick={() => setIsOpen(true)} className="cursor-pointer">
          {trigger}
        </div>
      ) : (
        <Button
          size="sm"
          variant="outline"
          className="h-8 px-2"
          onClick={() => setIsOpen(true)}
        >
          <Eye className="h-3 w-3 mr-1" />
          Ver PDF
        </Button>
      )}

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl w-full h-[90vh] p-0">
          <DialogHeader className="p-4 border-b">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-lg font-semibold">{title}</DialogTitle>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleDownload}
                  className="h-8"
                >
                  <Download className="h-3 w-3 mr-1" />
                  Descargar
                </Button>
                <DialogClose asChild>
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                    <X className="h-4 w-4" />
                  </Button>
                </DialogClose>
              </div>
            </div>
          </DialogHeader>
          
          <div className="flex-1 p-4">
            <iframe
              src={actualPdfUrl}
              className="w-full h-full border-0 rounded"
              title={title}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}