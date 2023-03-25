import { useCallback, useReducer } from 'react';
import Tesseract from 'tesseract.js';
import jsPDF from 'jspdf';
import { ImageUploader } from './components/ImageUploader';
import { ConversionButton } from './components/ConversionButton';
import { DownloadAndCopyButtons } from './components/DownloadAndCopyButton';
import { Action, initialState, reducer, State } from './reducer';

function App(): JSX.Element {
  const [state, dispatch] = useReducer<React.Reducer<State, Action>>(
    reducer,
    initialState
  );

  const handleImageChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];

      if (!file) {
        dispatch({ type: 'SET_IMAGE', payload: '' });
        return;
      }

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        dispatch({ type: 'SET_IMAGE', payload: reader.result as string });
      };

      reader.onerror = () => {
        dispatch({
          type: 'SET_ERROR',
          payload: 'Error uploading image. Please try again later.',
        });
      };
    },
    []
  );

  const handleConversion = useCallback(async () => {
    if (!state.image) {
      dispatch({ type: 'SET_ERROR', payload: 'Please select an image file' });
      return;
    }

    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_PROGRESS', payload: 0 });
    dispatch({ type: 'SET_TEXT', payload: '' });
    dispatch({ type: 'SET_ERROR', payload: '' });

    try {
      const { data } = await Tesseract.recognize(state.image, state.language, {
        logger: ({ status, progress: p }) => {
          if (status === 'recognizing text') {
            dispatch({
              type: 'SET_PROGRESS',
              payload: Math.round(p * 100),
            });
          }
        },
      });

      dispatch({ type: 'SET_TEXT', payload: data.text });
    } catch (err) {
      console.error(err);
      dispatch({
        type: 'SET_ERROR',
        payload: 'Error converting image to text. Please try again later.',
      });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  }, [state.image, state.language]);

  const handleDownload = useCallback(() => {
    if (!state.text) {
      dispatch({ type: 'SET_ERROR', payload: 'No text to download' });
      return;
    }

    const element = document.createElement('a');
    const file = new Blob([state.text], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'converted-text.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }, [state.text]);

  const handleDownloadPDF = useCallback(() => {
    if (!state.text) {
      dispatch({ type: 'SET_ERROR', payload: 'No text to download' });
      return;
    }

    const doc = new jsPDF();
    // Add the text
    doc.setFontSize(12);
    doc.setFont('Lato-Regular', 'normal');
    doc.text(state.text, 15, 10);
    doc.save('converted-text.pdf');
  }, [state.text]);

  const handleCopy = useCallback(() => {
    if (!state.text) {
      dispatch({ type: 'SET_ERROR', payload: 'No text to copy' });
      return;
    }

    navigator.clipboard.writeText(state.text).then(
      function () {
        console.log('Text copied to clipboard');
      },
      function (err) {
        console.error('Error copying text to clipboard: ', err);
      }
    );
  }, [state.text]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-400 via-pink-500 to-red-500">
      <div className="container mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <div className="w-full max-w-5xl mx-auto text-center space-y-4">
          <h1 className="text-5xl font-semibold text-white">
            Image To Text Converter
          </h1>
          <p className="text-xl text-white">
            Our online service provides an OCR (Optical Character Recognition)
            tool for extracting text from image. Simply upload your photo to our
            image-to-text converter, hit the convert button, and receive your
            text file immediately.
          </p>
        </div>

        <div className="w-full lg:max-w-4xl mx-auto bg-white bg-opacity-80 p-8 rounded-md m-8 shadow-md">
          <div className="mt-8 flex flex-col sm:flex-row gap-8">
            <div className="flex flex-col w-full max-w-2xl mx-auto">
              <ImageUploader
                handleImageChange={handleImageChange}
                image={state.image}
              />

              <div className="flex flex-col items-center mt-8">
                <ConversionButton
                  handleConversion={handleConversion}
                  progress={state.progress}
                  isLoading={state.isLoading}
                  error={state.error}
                />
              </div>
            </div>
            {state.text && (
              <div className="mt-8 w-full">
                <DownloadAndCopyButtons
                  handleDownload={handleDownload}
                  handleDownloadPDF={handleDownloadPDF}
                  handleCopy={handleCopy}
                  text={state.text}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
