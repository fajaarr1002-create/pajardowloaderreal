import { Router } from "express";

const router = Router();

router.post("/download", async (req, res) => {
  try {
    const { platform, link } = req.body;

    if (!platform || !link) {
      res.status(400).json({ status: false, error: "Tautan wajib diisi." });
      return;
    }

    const encodedLink = encodeURIComponent(link);
    let endpoint = "";

    switch (platform) {
      case "instagram":
        endpoint = `https://api.nexray.web.id/downloader/v1/instagram?url=${encodedLink}`;
        break;
      case "igstory":
        endpoint = `https://api-faa.my.id/faa/igdl?url=${encodedLink}`;
        break;
      case "tiktok":
        endpoint = `https://api.nexray.web.id/downloader/tiktok?url=${encodedLink}`;
        break;
      case "ytmp4":
        endpoint = `https://api.nexray.web.id/downloader/ytmp4?url=${encodedLink}&resolusi=1080`;
        break;
      case "spotify":
        endpoint = `https://api.nexray.web.id/downloader/spotify?url=${encodedLink}`;
        break;
      default:
        res.status(400).json({ status: false, error: "Platform tidak didukung." });
        return;
    }

    const upstream = await fetch(endpoint, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
    });

    if (!upstream.ok) {
      res.status(upstream.status).json({
        status: false,
        error: `API Provider Error (${upstream.status})`,
      });
      return;
    }

    const data = await upstream.json();
    res.json(data);
  } catch (error) {
    req.log.error({ error }, "Download route error");
    res.status(500).json({ status: false, error: "Terjadi kesalahan pada server." });
  }
});

export default router;
