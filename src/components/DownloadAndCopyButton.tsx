import Button from './Button';

interface DownloadAndCopyButtonsProps {
  handleDownload: () => void;
  handleCopy: () => void;
  handleDownloadPDF: () => void;
  text: string;
}

export function DownloadAndCopyButtons({
  handleDownload,
  handleCopy,
  handleDownloadPDF,
  text,
}: DownloadAndCopyButtonsProps) {
  return (
    <div className="flex flex-col justify-center space-y-8">
      <div className="w-full max-h-60 overflow-y-auto">
        <p className="text-sm">{text}</p>
      </div>
      <div className="flex justify-center space-x-4">
        <Button download onClick={handleDownload}>
          Download Text
        </Button>
        <Button copy onClick={handleCopy}>
          Copy Text
        </Button>
        <Button downloadPdf onClick={handleDownloadPDF}>
          Download PDF
        </Button>
      </div>
    </div>
  );
}
