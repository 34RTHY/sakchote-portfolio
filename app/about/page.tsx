export default function About() {
  return (
    <section className="max-w-3xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-bold mb-8">About Me</h1>
      <p className="text-lg text-gray-300 mb-6">
        I&apos;m a software engineer passionate about building reliable,
        scalable systems. I enjoy working across the full stack — from
        designing cloud-native infrastructure to crafting polished user
        interfaces.
      </p>

      <h2 className="text-2xl font-semibold mt-12 mb-4">Tech Stack</h2>
      <div className="flex flex-wrap gap-2">
        {[
          "TypeScript",
          "React",
          "Next.js",
          "Node.js",
          "Python",
          "Kubernetes",
          "Terraform",
          "AWS",
          "Docker",
          "Tailscale",
          "PostgreSQL",
          "Linux",
        ].map((skill) => (
          <span
            key={skill}
            className="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300"
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
}
