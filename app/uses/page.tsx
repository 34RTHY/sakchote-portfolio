import Link from "next/link";
import { usesCategories } from "@/data/uses";
import { siteConfig } from "@/data/config";

export function generateMetadata() {
  return {
    title: `Uses — ${siteConfig.name}`,
    description: "Tools, hardware, and software I use day-to-day.",
  };
}

export default function UsesPage() {
  return (
    <article className="max-w-5xl mx-auto px-6 pt-28 pb-20">
      <Link
        href="/#about"
        className="text-sm text-warm-500 hover:text-gold-400 transition mb-8 inline-block"
      >
        &larr; Back to about
      </Link>

      <h1 className="text-4xl md:text-5xl font-bold mb-4">Uses</h1>
      <p className="text-warm-400 mb-12">
        Tools, hardware, and software I use day-to-day.
      </p>

      <div className="space-y-12">
        {usesCategories.map((category) => (
          <section key={category.name}>
            <h2 className="text-sm font-medium text-warm-500 uppercase tracking-[0.15em] mb-4">
              {category.name}
            </h2>
            <ul className="space-y-3">
              {category.items.map((item) => (
                <li key={item.name} className="flex items-start gap-3">
                  <span className="text-gold-400 mt-1 shrink-0">-</span>
                  <div>
                    <span className="text-warm-100 font-medium">
                      {item.name}
                    </span>
                    <span className="text-warm-400"> — {item.description}</span>
                    {item.link && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-2 text-gold-400/60 hover:text-gold-400 text-sm transition"
                      >
                        &#8599;
                      </a>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </article>
  );
}
