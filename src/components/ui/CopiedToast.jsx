import { useCopyNotification } from '../../context/CopyContext';

const CopiedToast = () => {
  const { copied } = useCopyNotification();
  return (
    <div id="copied" className={copied ? 'visible' : ''}>
      Copied to clipboard
    </div>
  );
};

export default CopiedToast;
