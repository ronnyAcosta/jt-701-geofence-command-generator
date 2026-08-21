import React from 'react';
import { useCopyNotification } from '../context/CopyContext';

// Mismo #copied de siempre (el CSS ya define opacity 0 -> 1 con .visible),
// solo que ahora la clase la pone React en vez de classList.add/remove.
const CopiedToast = () => {
  const { copied } = useCopyNotification();
  return (
    <div id="copied" className={copied ? 'visible' : ''}>
      Copied to clipboard
    </div>
  );
};

export default CopiedToast;
