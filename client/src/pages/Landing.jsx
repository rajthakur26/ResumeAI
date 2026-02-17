import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <div className="max-w-6xl mx-auto px-6 py-20 text-center">

        <h1 className="text-5xl font-bold text-gray-800 mb-6">
          Build Smarter Resumes with <span className="text-blue-600">ResumeAI</span>
        </h1>

        <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
          AI-powered resume builder with ATS optimization, version control,
          and instant scoring.
        </p>

        <div className="space-x-4">
          <Link
            to="/register"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg shadow hover:bg-blue-700"
          >
            Get Started
          </Link>

          <Link
            to="/"
            className="bg-white text-blue-600 border px-8 py-3 rounded-lg shadow hover:bg-gray-50"
          >
            Login
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 px-6">
          <Feature title="AI Summary" desc="Generate professional summaries instantly." />
          <Feature title="ATS Scoring" desc="Optimize your resume for hiring systems." />
          <Feature title="Version Control" desc="Track and improve resume versions." />
        </div>
      </div>
    </div>
  );
}

function Feature({ title, desc }) {
  return (
    <div className="bg-gray-50 p-8 rounded-xl shadow hover:shadow-lg transition">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <p className="text-gray-600">{desc}</p>
    </div>
  );
}
