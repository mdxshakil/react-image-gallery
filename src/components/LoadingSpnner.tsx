const LoadingSpnner = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="relative">
        <div className="w-20 h-20 border-purple-200 border-4 rounded-full"></div>
        <div className="w-20 h-20 border-purple-700 border-t-4 animate-spin rounded-full absolute left-0 top-0"></div>
      </div>
    </div>
  );
};

export default LoadingSpnner;
