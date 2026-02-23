const experience = [
  {
    role: "Software Engineer",
    company: "Your Company",
    period: "2023 — Present",
    description:
      "Placeholder description. Replace with your actual work experience.",
  },
  {
    role: "Previous Role",
    company: "Previous Company",
    period: "2021 — 2023",
    description:
      "Placeholder description. Replace with your actual work experience.",
  },
];

export default function Experience() {
  return (
    <section className="max-w-3xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-bold mb-10">Experience</h1>
      <div className="space-y-10">
        {experience.map((job) => (
          <div key={job.role + job.company} className="border-l-2 border-gray-700 pl-6">
            <h2 className="text-xl font-semibold">{job.role}</h2>
            <p className="text-blue-400">{job.company}</p>
            <p className="text-sm text-gray-500 mb-2">{job.period}</p>
            <p className="text-gray-300">{job.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
