export interface State {
  image: string;
  text: string;
  isLoading: boolean;
  progress: number;
  error: string;
  language: string;
}

export const initialState: State = {
  image: '',
  text: '',
  isLoading: false,
  progress: 0,
  error: '',
  language: 'eng',
};

export type Action =
  | { type: 'SET_IMAGE'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_PROGRESS'; payload: number }
  | { type: 'SET_TEXT'; payload: string }
  | { type: 'SET_ERROR'; payload: string };
// | { type: 'SET_LANGUAGE'; payload: string };

export type Dispatch = (action: Action) => void;

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_IMAGE':
      return { ...state, image: action.payload, text: '', error: '' };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_PROGRESS':
      return { ...state, progress: action.payload };
    case 'SET_TEXT':
      return { ...state, text: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    // case 'SET_LANGUAGE':
    //   return { ...state, language: action.payload };
    default:
      return state;
  }
}
