import Link from "next/link";

interface NavItem {
  slug: string;
  title: string;
}

interface DetailNavProps {
  prev: NavItem | null;
  next: NavItem | null;
  basePath: string;
}

export default function DetailNav({ prev, next, basePath }: DetailNavProps) {
  return (
    <div className="flex justify-between items-center border-t border-surface-800 pt-8 mt-16">
      {prev ? (
        <Link
          href={`${basePath}/${prev.slug}`}
          className="text-sm text-warm-400 hover:text-gold-400 transition"
        >
          &larr; {prev.title}
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link
          href={`${basePath}/${next.slug}`}
          className="text-sm text-warm-400 hover:text-gold-400 transition"
        >
          {next.title} &rarr;
        </Link>
      ) : (
        <span />
      )}
    </div>
  );
}
