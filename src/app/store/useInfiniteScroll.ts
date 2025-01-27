import { useEffect, useState } from 'react';

export const useInfiniteScroll = (fetchData: (page: number) => void) => {
  const [page, setPage] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 50
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    fetchData(page);
  }, [page, fetchData]);

  return { page };
};
