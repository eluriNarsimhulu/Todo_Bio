'use client';

import { useEffect, useRef, memo } from 'react';

const HLS_SRC =
  'https://stream.mux.com/9JXDljEVWYwWu01PUkAemafDugK89o01BR6zqJ3aS9u00A.m3u8';

const VideoPlayer = memo(function VideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls: import('hls.js').default | null = null;

    async function init() {
      const Hls = (await import('hls.js')).default;
      if (Hls.isSupported()) {
        hls = new Hls({ autoStartLoad: true });
        hls.loadSource(HLS_SRC);
        hls.attachMedia(video!);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          video!.play().catch(() => {});
        });
      } else if (video!.canPlayType('application/vnd.apple.mpegurl')) {
        // Safari native HLS
        video!.src = HLS_SRC;
        video!.play().catch(() => {});
      }
    }

    init();

    return () => {
      hls?.destroy();
    };
  }, []);

  return (
    <video
      ref={videoRef}
      className="w-full h-full object-cover"
      autoPlay
      muted
      loop
      playsInline
    />
  );
});

export default VideoPlayer;