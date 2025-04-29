import { useContext, useEffect } from "react";
import { ApiListContext } from "../Store/api-list-store";

const Yvideos = () => {
  const { YuData, updateYList } = useContext(ApiListContext);
  const API_KEY = "AIzaSyBhUVSglPuAa-XteurjJu1yqn2yG2i8Hcc";
  const DEFAULT_QUERY = "trending";

  // Fetch initial videos on mount
  useEffect(() => {
    const fetchInitialVideos = async () => {
      try {
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&q=${DEFAULT_QUERY}&part=snippet&type=video&maxResults=10`
        );
        const data = await response.json();
        updateYList({
          items: data.items || [],
          nextPageToken: data.nextPageToken || "",
        });
      } catch (error) {
        console.error("Error fetching initial videos:", error);
      }
    };

    if (!YuData || !YuData.items || YuData.items.length === 0) {
      fetchInitialVideos();
    }
  }, [YuData, updateYList]);

  const fetchNextPage = async () => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&q=${DEFAULT_QUERY}&part=snippet&type=video&pageToken=${YuData?.nextPageToken}&maxResults=10`
      );
      const data = await response.json();
      updateYList({
        items: [...(YuData?.items || []), ...(data.items || [])],
        nextPageToken: data.nextPageToken || "",
      });
    } catch (error) {
      console.error("Error fetching next page:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-white">YouTube Videos</h1>
      {YuData?.items?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {YuData.items.map((video) => {
            const videoId = video.id?.videoId;
            const snippet = video.snippet;
            return (
              <div
                key={videoId}
                className="bg-gray-800 rounded-lg shadow-md overflow-hidden"
              >
                <img
                  src={snippet.thumbnails.medium.url}
                  alt={snippet.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2 text-white">
                    {snippet.title}
                  </h2>
                  <p className="text-gray-400 mb-4">
                    {snippet.description}
                  </p>
                  <a
                    href={`https://www.youtube.com/watch?v=${videoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
                  >
                    Watch Video
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-gray-400">Loading videos...</p>
      )}

      {YuData?.nextPageToken && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={fetchNextPage}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default Yvideos;
