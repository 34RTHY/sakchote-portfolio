import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="flex flex-col items-center justify-center text-center px-6 py-32">
      <h1 className="text-5xl md:text-6xl font-bold mb-4">
        Hi, I&apos;m <span className="text-blue-400">Sakchote</span>
      </h1>
      <p className="text-xl text-gray-400 max-w-2xl mb-8">
        Software engineer building cloud-native infrastructure and full-stack
        applications. I bridge local compute with public cloud into seamless
        hybrid systems.
      </p>
      <div className="flex gap-4">
        <Link
          href="/projects"
          className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium transition"
        >
          View Projects
        </Link>
        <Link
          href="/contact"
          className="px-6 py-3 border border-gray-600 hover:border-gray-400 rounded-lg font-medium transition"
        >
          Get in Touch
        </Link>
      </div>
    </section>
  );
}
