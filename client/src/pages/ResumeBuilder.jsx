import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ResumeBuilder() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [title, setTitle] = useState("");
  const [skills, setSkills] = useState("");
  const [experience, setExperience] = useState("");
  const [summary, setSummary] = useState("");

  const generateSummary = async () => {
    const res = await axios.post(
      "http://localhost:5000/api/ai/summary",
      { skills, experience }
    );
    setSummary(res.data.summary);
  };

  const saveResume = async () => {
    const res = await axios.post(
      "http://localhost:5000/api/resume/create",
      {
        title,
        summary,
        skills: skills.split(","),
        experience,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    alert("Resume Saved! ATS Score: " + res.data.atsScore);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-6">Create Resume</h1>

        <input
          className="w-full border p-3 rounded mb-4"
          placeholder="Resume Title"
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="w-full border p-3 rounded mb-4"
          placeholder="Skills (comma separated)"
          onChange={(e) => setSkills(e.target.value)}
        />

        <textarea
          className="w-full border p-3 rounded mb-4"
          rows="4"
          placeholder="Experience"
          onChange={(e) => setExperience(e.target.value)}
        />

        <div className="flex gap-4 mb-6">
          <button
            onClick={generateSummary}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Generate AI Summary
          </button>

          <button
            onClick={saveResume}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            Save Resume
          </button>
        </div>

        {summary && (
          <div className="bg-gray-50 border p-4 rounded">
            <h2 className="font-semibold mb-2">Generated Summary:</h2>
            <p className="text-gray-700">{summary}</p>
          </div>
        )}
      </div>
    </div>
  );
}
