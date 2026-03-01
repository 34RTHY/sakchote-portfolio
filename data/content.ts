export type AttachmentKind =
  | "slides"
  | "paper"
  | "github"
  | "video"
  | "website"
  | "pdf"
  | "file";

export interface Attachment {
  label: string;
  href: string;
  kind: AttachmentKind;
}

export type ContentBlock =
  | { type: "text"; value: string }
  | { type: "heading"; value: string }
  | { type: "image"; src: string; caption?: string }
  | { type: "gallery"; title?: string; images: { src: string; caption?: string }[] }
  | { type: "attachments"; title?: string; items: Attachment[] };
