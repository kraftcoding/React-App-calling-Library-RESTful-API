import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { fetcherWithFetch } from '../lib/fetcherWithFetch';

export default function Post() {
  const { userId } = useParams(); 

  const {
    data,
    error,
    isPending: loading,
  } = useQuery({
    queryKey: ['post', parseInt(userId)],
    queryFn: () =>
      fetcherWithFetch(
        `http://localhost:3000/api/library/Users/id?id=${userId}`
      ),
    staleTime: 1000 * 60 * 10, // cache for 10 minutes
  });


  return (
    <>
      {loading && (
        <div className="text-xl font-medium">A moment please...</div>
      )}
      {error && <div className="text-red-700">{error}</div>}

      <article>
        <h1 className="text-xl md:text-2xl font-medium mb-6">
          {data?.name}
        </h1>
        <p>{data?.email}</p>
      </article>
    </>
  );
}