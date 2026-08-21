import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

/**
 * Reemplaza al helper `showMessage()`.
 * Reproduce exactamente la misma secuencia de tiempos que el original:
 *  - display: block inmediato
 *  - clase 'visible' agregada a los 10ms (dispara el fade-in por CSS)
 *  - clase 'visible' quitada a los 2000ms (dispara el fade-out por CSS)
 *  - display: none a los 2500ms (una vez terminada la transición)
 *
 * El id se mantiene igual al original (#invalidCredentials, #emailSent, etc.)
 * para no tener que tocar el CSS existente.
 */
const Toast = ({ id, message, show, onHide }) => {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!show) return undefined;

    setMounted(true);
    const showTimer = setTimeout(() => setVisible(true), 10);
    const hideTimer = setTimeout(() => setVisible(false), 2000);
    const unmountTimer = setTimeout(() => {
      setMounted(false);
      if (onHide) onHide();
    }, 2500);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
      clearTimeout(unmountTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
