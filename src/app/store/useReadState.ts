import { useState, useEffect } from 'react';

export interface ReadState {
  [url: string]: boolean; 
}

const useReadState = () => {
  const [readState, setReadState] = useState<ReadState>(() => {
    const savedState = localStorage.getItem('readState');
    return savedState ? JSON.parse(savedState) : {};
  });

  useEffect(() => {
    localStorage.setItem('readState', JSON.stringify(readState));
  }, [readState]);

  const markAsRead = (url: string) => {
    setReadState((prevState) => ({
      ...prevState,
      [url]: true, 
    }));
  };

  const isRead = (url: string) => !!readState[url]; 

  return { readState, markAsRead, isRead };
};

export default useReadState;
