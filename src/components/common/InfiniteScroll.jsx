import React, { useEffect, useRef } from "react";

const InfiniteScrollSentinel = ({ onIntersect, hasMore, listLength }) => {
  const sentinelRef = useRef(null);

  useEffect(() => {
    // If there's no more data
    if (!hasMore) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore) {
          onIntersect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "100px",
      },
    );

    const currentSentinel = sentinelRef.current;
    if (currentSentinel) {
      observer.observe(currentSentinel);
    }

    return () => {
      if (currentSentinel) observer.unobserve(currentSentinel);
    };
  }, [hasMore, onIntersect, listLength]);

  if (!hasMore) return null;

  return (
    <div ref={sentinelRef} className="w-full flex justify-center py-6">
      <div className="w-6 h-6 border-2 border-[#4A1D46] border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default InfiniteScrollSentinel;
