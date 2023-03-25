interface LanguageSelectorProps {
  language: string;
  dispatch: React.Dispatch<{ type: string; payload: string }>;
}

export function LanguageSelector({
  language,
  dispatch,
}: LanguageSelectorProps) {
  const handleLanguageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    dispatch({ type: 'SET_LANGUAGE', payload: e.target.value });
  };

  return (
    <select value={language} onChange={handleLanguageChange}>
      <option value="eng">English</option>
      <option value="fra">French</option>
      <option value="spa">Spanish</option>
      {/* add more options as needed */}
    </select>
  );
}
