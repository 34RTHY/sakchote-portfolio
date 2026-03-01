import Image from "next/image";
import type { ContentBlock, AttachmentKind } from "@/data/content";
import ImageLightbox from "@/components/ImageLightbox";

interface ContentRendererProps {
  content: ContentBlock[];
}

const kindIcons: Record<AttachmentKind, { icon: string; color: string }> = {
  slides: { icon: "M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5", color: "text-orange-400" },
  paper: { icon: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z", color: "text-blue-400" },
  github: { icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4", color: "text-warm-300" },
  video: { icon: "m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z", color: "text-red-400" },
  website: { icon: "M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418", color: "text-green-400" },
  pdf: { icon: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m.75 12 3 3m0 0 3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z", color: "text-red-300" },
  file: { icon: "M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z", color: "text-warm-400" },
};

export default function ContentRenderer({ content }: ContentRendererProps) {
  return (
    <div className="space-y-6">
      {content.map((block, i) => {
        if (block.type === "text") {
          return (
            <p key={i} className="text-warm-300 leading-relaxed">
              {block.value}
            </p>
          );
        }
        if (block.type === "heading") {
          return (
            <h3 key={i} className="text-xl font-semibold text-warm-100 pt-4">
              {block.value}
            </h3>
          );
        }
        if (block.type === "image") {
          return (
            <figure key={i}>
              <ImageLightbox src={block.src} alt={block.caption || ""}>
                <div className="bg-surface-900 border border-surface-800 rounded-xl relative overflow-hidden">
                  <Image
                    src={block.src}
                    alt={block.caption || ""}
                    width={1200}
                    height={800}
                    className="w-full h-auto rounded-xl"
                  />
                </div>
              </ImageLightbox>
              {block.caption && (
                <figcaption className="text-sm text-warm-500 mt-2 text-center">
                  {block.caption}
                </figcaption>
              )}
            </figure>
          );
        }
        if (block.type === "gallery") {
          return (
            <div key={i}>
              {block.title && (
                <h3 className="text-lg font-semibold mb-4">{block.title}</h3>
              )}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {block.images.map((img, j) => (
                  <figure key={j}>
                    <ImageLightbox src={img.src} alt={img.caption || ""}>
                      <div className="bg-surface-900 border border-surface-800 rounded-lg h-40 md:h-52 relative overflow-hidden">
                        <Image
                          src={img.src}
                          alt={img.caption || ""}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </ImageLightbox>
                    {img.caption && (
                      <figcaption className="text-xs text-warm-500 mt-1.5 text-center">
                        {img.caption}
                      </figcaption>
                    )}
                  </figure>
                ))}
              </div>
            </div>
          );
        }
        if (block.type === "attachments") {
          return (
            <div key={i}>
              {block.title && (
                <h3 className="text-lg font-semibold mb-4">{block.title}</h3>
              )}
              <div className="space-y-2">
                {block.items.map((item, j) => {
                  const { icon, color } = kindIcons[item.kind];
                  return (
                    <a
                      key={j}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-4 py-3 border border-surface-800 rounded-lg hover:border-gold-500/40 transition group"
                    >
                      <svg
                        className={`w-5 h-5 shrink-0 ${color}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d={icon} />
                      </svg>
                      <span className="text-warm-300 group-hover:text-gold-400 transition">
                        {item.label}
                      </span>
                      <span className="text-warm-600 ml-auto group-hover:text-gold-400 transition">
                        &rarr;
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}
