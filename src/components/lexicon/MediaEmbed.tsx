import { Play, ExternalLink } from "lucide-react";
import type { MediaRef } from "@/content/terms";

type Props = {
  title: string;
  media: MediaRef;
};

export function MediaEmbed({ title, media }: Props) {
  if (media.kind === "youtube") {
    return (
      <div className="border border-ink/15 px-4 py-3">
        <div className="mb-2 inline-flex items-center gap-2 font-body text-sm text-ink">
          <Play className="h-3.5 w-3.5 text-accent" aria-hidden />
          {title}
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[10px] uppercase tracking-wider">
          <a
            href={`https://www.youtube.com/watch?v=${media.id}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-accent hover:underline"
          >
            Watch on YouTube <ExternalLink className="h-3 w-3" aria-hidden />
          </a>
          <a
            href={
              media.albumId
                ? `https://open.spotify.com/album/${media.albumId}`
                : media.spotifyId
                  ? `https://open.spotify.com/track/${media.spotifyId}`
                  : `https://open.spotify.com/search/${encodeURIComponent(title)}`
            }
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-accent hover:underline"
          >
            Listen on Spotify <ExternalLink className="h-3 w-3" aria-hidden />
          </a>
        </div>
      </div>
    );
  }

  if (media.kind === "spotify") {
    return (
      <div className="overflow-hidden">
        <iframe
          className="h-20 w-full"
          src={`https://open.spotify.com/embed/track/${media.id}`}
          title={title}
          allow="autoplay; clipboard-write; encrypted-media; picture-in-picture"
          loading="lazy"
        />
      </div>
    );
  }

  // Search fallback — open Spotify + YouTube searches in a new tab.
  const q = encodeURIComponent(media.query);
  const spotify = `https://open.spotify.com/search/${q}`;
  const youtube = `https://www.youtube.com/results?search_query=${q}`;
  return (
    <div className="flex items-center gap-3 border border-ink/15 p-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-accent text-accent">
        <Play className="h-3.5 w-3.5 fill-current" aria-hidden />
      </div>
      <div className="min-w-0 flex-1">
        <div className="truncate font-body text-sm text-ink">{title}</div>
        <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[10px] uppercase tracking-wider">
          <a
            href={spotify}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-accent hover:underline"
          >
            Spotify <ExternalLink className="h-3 w-3" aria-hidden />
          </a>
          <a
            href={youtube}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-accent hover:underline"
          >
            YouTube <ExternalLink className="h-3 w-3" aria-hidden />
          </a>
        </div>
      </div>
    </div>
  );
}
