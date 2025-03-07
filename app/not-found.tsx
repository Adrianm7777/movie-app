import Link from "next/link";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="text-center bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-md w-full">
        <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
          404
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
          Sorry, the page you&apos;re looking for could not be found.
        </p>
        <p className="text-base text-gray-500 dark:text-gray-400 mb-8">
          It might have been moved, renamed, or deleted. Let&apos;s get you back
          on track.
        </p>
        <Link
          href="/"
          className="inline-block px-8 py-3 w-1/3 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 transition-colors duration-200"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
