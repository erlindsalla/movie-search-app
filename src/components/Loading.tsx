const Loading = () => {
  return (
    <div className="text-center py-8">
      <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
      <p className="mt-4 text-gray-600">Searching for movies...</p>
    </div>
  );
};

export default Loading;
