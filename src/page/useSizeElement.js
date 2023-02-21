import {  useRef, useEffect } from 'react'

const useSizeElement = (setWidth) => {
  const elementRef = useRef(null);

  useEffect(() => {
    setWidth(elementRef.current?.clientWidth);
  }, [elementRef.current?.clientWidth]);

  return { elementRef };
}

export default useSizeElement;