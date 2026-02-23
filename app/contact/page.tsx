export default function Contact() {
  return (
    <section className="max-w-3xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-bold mb-8">Contact</h1>
      <p className="text-lg text-gray-300 mb-8">
        Interested in working together? Feel free to reach out.
      </p>
      <div className="space-y-4">
        <a
          href="mailto:your@email.com"
          className="block text-blue-400 hover:text-blue-300 transition"
        >
          your@email.com
        </a>
        <a
          href="https://github.com/34RTHY"
          target="_blank"
          rel="noopener noreferrer"
          className="block text-blue-400 hover:text-blue-300 transition"
        >
          GitHub — 34RTHY
        </a>
        <a
          href="https://linkedin.com/in/yourprofile"
          target="_blank"
          rel="noopener noreferrer"
          className="block text-blue-400 hover:text-blue-300 transition"
        >
          LinkedIn
        </a>
      </div>
      <div className="mt-10">
        <a
          href="/resume.pdf"
          className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium transition"
        >
          Download Resume (PDF)
        </a>
      </div>
    </section>
  );
}
