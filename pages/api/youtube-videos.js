// pages/api/youtube-videos.js
import { google } from 'googleapis';

export default async function handler(req, res) {
  try {
    const youtube = google.youtube({
      version: 'v3',
      auth: process.env.YOUTUBE_API_KEY,
    });

    // Get channel ID first (if you only know the username)
    // const channelResponse = await youtube.channels.list({
    //   part: 'id',
    //   forUsername: 'YourChannelUsername'
    // });

    // const channelId = channelResponse.data.items[0].id;

    // Or use your channel ID directly
    const channelId = process.env.YOUTUBE_CHANNEL_ID;

    // Fetch videos from channel
    const response = await youtube.search.list({
      part: 'snippet',
      channelId: channelId,
      maxResults: 50, // Maximum allowed by YouTube API
      order: 'date', // Sort by date (newest first)
      type: 'video',
    });

    // Get video details for duration and other stats
    const videoIds = response.data.items.map(item => item.id.videoId).join(',');
    const videoDetailsResponse = await youtube.videos.list({
      part: 'contentDetails,statistics',
      id: videoIds,
    });

    // Merge search results with video details
    const videos = response.data.items.map(item => {
      const videoDetails = videoDetailsResponse.data.items.find(
        detailItem => detailItem.id === item.id.videoId
      );

      return {
        ...item,
        contentDetails: videoDetails?.contentDetails,
        statistics: videoDetails?.statistics,
      };
    });

    res.status(200).json({ videos });
  } catch (error) {
    console.error('Error fetching YouTube videos:', error);
    res.status(500).json({ error: 'Failed to fetch videos' });
  }
}
