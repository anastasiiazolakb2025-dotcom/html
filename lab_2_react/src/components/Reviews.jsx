import { useEffect, useState } from 'react';
import { VARIANT } from '../config';

function Reviews() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchComments() {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${VARIANT}/comments`
        );
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        setComments(data); // зберігаємо у порядку отримання
      } catch (err) {
        console.error(err);
        setError('Не вдалося завантажити відгуки.');
      } finally {
        setLoading(false);
      }
    }
    fetchComments();
  }, []); // [] — запит виконується один раз при монтуванні

  return (
    <section className="max-w-5xl mx-auto mt-6 px-4">
      <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-slate-700">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4 border-b-2 border-blue-500 pb-2 inline-block">
          Відгуки попередніх роботодавців
        </h2>

        {loading && <p className="text-gray-500">Завантаження відгуків...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {comments.map((comment) => (
            <article
              key={comment.id}
              className="p-4 rounded-lg border-l-4 border-blue-500 bg-slate-50 dark:bg-slate-900"
            >
              <h3 className="font-semibold capitalize text-slate-800 dark:text-slate-100">{comment.name}</h3>
              <a href={`mailto:${comment.email}`} className="text-sm text-blue-500 hover:underline">
                {comment.email}
              </a>
              <p className="mt-2 text-gray-600 dark:text-slate-300">{comment.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
export default Reviews;
