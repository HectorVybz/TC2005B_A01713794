const DEFAULT_VIDEO_URL = "https://vimeo.com/22439234";

const fallbackVideo = {
    title: "Video destacado no disponible",
    author_name: "Vimeo",
    html: "",
    thumbnail_url: "",
    provider_name: "Vimeo",
    source_url: process.env.VIMEO_FEATURED_URL || DEFAULT_VIDEO_URL,
    demo: true
};

exports.fetchFeaturedVideo = async () => {
    const videoUrl = process.env.VIMEO_FEATURED_URL || DEFAULT_VIDEO_URL;
    const params = new URLSearchParams({
        url: videoUrl,
        width: "720",
        dnt: "true"
    });

    if (typeof fetch !== "function") {
        return fallbackVideo;
    }

    try {
        const response = await fetch(`https://vimeo.com/api/oembed.json?${params.toString()}`);

        if (!response.ok) {
            return fallbackVideo;
        }

        const video = await response.json();

        return {
            title: video.title,
            author_name: video.author_name,
            html: video.html,
            thumbnail_url: video.thumbnail_url,
            provider_name: video.provider_name,
            source_url: videoUrl,
            demo: false
        };
    } catch (error) {
        return fallbackVideo;
    }
};
