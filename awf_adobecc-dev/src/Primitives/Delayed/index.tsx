import  { useState, useEffect } from 'react';


const DelayComp = ({ children, waitTime}) => {
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsShow(true);
    }, waitTime);
    return () => clearTimeout(timer);
  }, [waitTime]);

  return isShow ? children : null;
};

export default DelayComp;