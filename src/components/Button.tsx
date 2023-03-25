import className from 'classnames';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  download?: boolean;
  downloadPdf?: boolean;
  copy?: boolean;
  convert?: boolean;
  danger?: boolean;
  rounded?: boolean;
  outline?: boolean;
}

function Button({
  children,
  download,
  downloadPdf,
  copy,
  convert,
  danger,
  rounded,
  outline,
  ...rest
}: ButtonProps) {
  const classes = className(
    rest.className,
    'text-white font-bold py-2 px-4 rounded mb-4 text-sm',
    {
      'bg-purple-500 hover:bg-purple-700': download,
      'bg-pink-500 hover:bg-pink-700': downloadPdf,
      'bg-red-500 hover:bg-red-700': copy,
      'bg-yellow-500 hover:bg-yellow-700': convert,
      'border-red-500 bg-red-500 text-white': danger,
      'rounded-full': rounded,
      'bg-white': outline,
    }
  );
  return (
    <button {...rest} className={classes}>
      {children}
    </button>
  );
}

export default Button;
