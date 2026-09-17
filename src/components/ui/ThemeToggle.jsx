import { IonIcon } from '@ionic/react';
import { moonOutline, sunnyOutline } from 'ionicons/icons';
import { useTheme } from '../../context/ThemeContext';

const VARIANT_STYLES = {
  plain: {
    background: 'transparent',
    border: 'none',
    padding: 0,
    margin: 0,
    cursor: 'pointer',
    color: 'inherit',
    font: 'inherit',
    display: 'inline-flex',
    alignItems: 'center',
  },
  nav: {
    background: 'transparent',
    border: 'none',
    padding: '0 15px',
    height: '56px',
    display: 'flex',
    alignItems: 'center',
    color: 'var(--color-primary-text)',
    cursor: 'pointer',
    transition: 'background-color .3s',
  },
  dropdown: {
    background: 'transparent',
    border: 'none',
    padding: '14px 16px',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    color: '#26a69a',
    cursor: 'pointer',
    textAlign: 'left',
  },
};

const ThemeToggle = ({ variant = 'plain', style, iconStyle }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      className={variant === 'nav' ? 'nav-icon-btn' : undefined}
      style={{ ...VARIANT_STYLES[variant], ...style }}
    >
      <IonIcon
        icon={theme === 'dark' ? sunnyOutline : moonOutline}
        style={{ fontSize: '1.5rem', ...iconStyle }}
      />
    </button>
  );
};

export default ThemeToggle;