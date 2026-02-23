interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  href?: string;
}

export default function ProjectCard({
  title,
  description,
  tags,
  href,
}: ProjectCardProps) {
  const Wrapper = href ? "a" : "div";
  const linkProps = href
    ? { href, target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <Wrapper
      {...linkProps}
      className="block p-6 bg-gray-900 border border-gray-800 rounded-xl hover:border-gray-600 transition"
    >
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400 text-sm mb-4">{description}</p>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-0.5 bg-gray-800 rounded text-xs text-gray-400"
          >
            {tag}
          </span>
        ))}
      </div>
    </Wrapper>
  );
}
