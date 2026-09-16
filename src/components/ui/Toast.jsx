import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';

const Toast = ({ id, message, show, onHide }) => {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Keep the latest onHide without making the timer effect below depend on it:
  // onHide is usually a new function on every parent render, and re-running
  // the timers on every render would break the toast's timing.
  const onHideRef = useRef(onHide);
  useEffect(() => {
    onHideRef.current = onHide;
  }, [onHide]);

  useEffect(() => {
    if (!show) return undefined;

    setMounted(true);
    const showTimer = setTimeout(() => setVisible(true), 10);
    const hideTimer = setTimeout(() => setVisible(false), 2000);
    const unmountTimer = setTimeout(() => {
      setMounted(false);
      if (onHideRef.current) onHideRef.current();
    }, 2500);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
      clearTimeout(unmountTimer);
    };
  }, [show]);

  return (
    <div
      id={id}
      className={`center${visible ? ' visible' : ''}`}
      style={{ display: mounted ? 'block' : 'none' }}
    >
      {message}
    </div>
  );
};

Toast.propTypes = {
  id: PropTypes.string,
  message: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func,
};

export default Toast;
