import { DownloadRequest, DownloadResult, MediaItem, Platform } from '../types';

export const fetchDownload = async (params: DownloadRequest): Promise<DownloadResult> => {
  try {
    const response = await fetch('/api/download', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });

    const json = await response.json();

    const isSuccess = json.status || json.success || false;

    if (!isSuccess || !json.result) {
      return {
        status: false,
        error: json.message || json.error || "Konten tidak ditemukan atau API Key tidak valid."
      };
    }

    const rawData = json.result;
    const medias: MediaItem[] = [];

    const formatDuration = (val: any) => {
      if (!val) return undefined;
      if (typeof val === 'string') return val;
      const minutes = Math.floor(val / 60);
      const seconds = val % 60;
      return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    let title = "Pajar Content";
    let thumbnail = "";
    let author = "Creator";
    let duration = undefined;
    let stats = undefined;

    switch (params.platform) {
      case Platform.YOUTUBE_MP4:
        title = rawData.title;
        thumbnail = rawData.thumbnail;
        author = rawData.author;
        duration = formatDuration(rawData.duration);
        if (rawData.url) {
          medias.push({
            url: rawData.url,
            quality: '1080p HD',
            extension: 'mp4',
            type: 'video'
          });
        }
        break;

      case Platform.TIKTOK:
        title = rawData.title || rawData.desc;
        thumbnail = rawData.thumbnail || rawData.cover;
        author = rawData.author?.name || rawData.author?.nickname || "TikTok User";
        stats = {
          likes: rawData.stats?.like || rawData.stats?.likes || 0,
          comments: rawData.stats?.comment || rawData.stats?.comments || 0,
          views: rawData.stats?.view || rawData.stats?.views || 0,
          followers: rawData.author?.followers || 0
        };
        const videoUrl = rawData.video || rawData.data;
        if (videoUrl) {
          medias.push({
            url: videoUrl,
            quality: 'No Watermark',
            extension: 'mp4',
            type: 'video'
          });
        }
        const audioUrl = rawData.audio || rawData.music_info?.url;
        if (audioUrl) {
          medias.push({
            url: audioUrl,
            quality: 'Original Audio',
            extension: 'mp3',
            type: 'audio'
          });
        }
        break;

      case Platform.INSTAGRAM:
        title = rawData.caption || "Instagram Media";
        thumbnail = rawData.profile_url;
        author = rawData.username;
        stats = {
          likes: rawData.likes || 0,
          comments: rawData.comments || 0
        };
        if (Array.isArray(rawData.media)) {
          rawData.media.forEach((item: any) => {
            medias.push({
              url: item.url,
              quality: 'HD Content',
              extension: item.type === 'video' ? 'mp4' : 'jpg',
              type: item.type === 'video' ? 'video' : 'image'
            });
          });
        }
        break;

      case Platform.IG_STORY:
        title = rawData.metadata?.caption || "Instagram Story";
        author = rawData.metadata?.username;
        const storyUrls = Array.isArray(rawData.url) ? rawData.url : [rawData.url];
        storyUrls.forEach((url: string) => {
          if (url) {
            medias.push({
              url: url,
              quality: 'Story HD',
              extension: 'mp4',
              type: 'video'
            });
          }
        });
        break;

      case Platform.SPOTIFY:
        title = rawData.title;
        author = rawData.artist;
        if (rawData.url) {
          medias.push({
            url: rawData.url,
            quality: '320kbps High',
            extension: 'mp3',
            type: 'audio'
          });
        }
        break;
    }

    return {
      status: true,
      title,
      thumbnail,
      author,
      duration,
      medias: medias.length > 0 ? medias : undefined,
      stats
    };
  } catch (error) {
    console.error("fetchDownload Error:", error);
    return { status: false, error: "Gagal terhubung ke server." };
  }
};
