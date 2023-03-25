import Button from './Button';

interface ConversionButtonProps {
  handleConversion: () => void;
  progress: number;
  isLoading: boolean;
  error: string | null;
}

export function ConversionButton({
  handleConversion,
  progress,
  isLoading,
  error,
}: ConversionButtonProps) {
  return (
    <div className="flex flex-col items-center">
      <Button
        convert
        onClick={handleConversion}
        disabled={isLoading}
        className="disabled:opacity-50"
      >
        {isLoading ? 'Converting...' : 'Convert'}
      </Button>
      {progress > 0 && <div className="mt-2">{`Progress: ${progress}%`}</div>}
      {error && <div className="mt-2 text-red-500">{error}</div>}
    </div>
  );
}
