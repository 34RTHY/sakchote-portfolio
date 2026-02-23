import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 text-center">
      <h1 className="font-heading text-6xl md:text-8xl font-bold mb-4">
        4<span className="text-emerald-400">0</span>4
      </h1>
      <p className="text-neutral-400 text-lg mb-8">
        This page doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 rounded-lg font-medium transition text-sm"
      >
        Back to home
      </Link>
    </div>
  );
}
