import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [resumes, setResumes] = useState([]);
  const [selectedResume, setSelectedResume] = useState(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/resume/my",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setResumes(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchResumes();
  }, []);

  const downloadPDF = async (resumeId, title) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/resume/download/${resumeId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `${title}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">
              Your Resumes
            </h1>
            <p className="text-gray-500 mt-2">
              Manage, preview, and download your resumes.
            </p>
          </div>

          <button
            onClick={() => navigate("/builder")}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition shadow-md"
          >
            + Create New Resume
          </button>
        </div>

        {/* Resume Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resumes.map((resume) => (
            <div
              key={resume._id}
              className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition duration-300"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {resume.title}
              </h2>

              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-gray-500">
                  Version {resume.version}
                </span>

                <span
                  className={`px-3 py-1 text-sm rounded-full ${
                    resume.atsScore >= 80
                      ? "bg-green-100 text-green-600"
                      : resume.atsScore >= 60
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  ATS {resume.atsScore}
                </span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedResume(resume)}
                  className="bg-gray-100 px-4 py-2 rounded hover:bg-gray-200"
                >
                  Preview
                </button>

                <button
                  onClick={() =>
                    downloadPDF(resume._id, resume.title)
                  }
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Download PDF
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Preview Modal */}
      {selectedResume && (
        <ResumePreviewModal
          resume={selectedResume}
          onClose={() => setSelectedResume(null)}
        />
      )}
    </div>
  );
}

/* ===============================
   Resume Preview Modal
================================= */

function ResumePreviewModal({ resume, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-2xl p-8 relative">

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-4">{resume.title}</h2>

        <div className="mb-4">
          <h3 className="font-semibold text-gray-700 mb-2">Summary</h3>
          <p className="text-gray-600">{resume.summary}</p>
        </div>

        <div className="mb-4">
          <h3 className="font-semibold text-gray-700 mb-2">Skills</h3>
          <p className="text-gray-600">
            {resume.skills?.join(", ")}
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-gray-700 mb-2">Experience</h3>
          <p className="text-gray-600">{resume.experience}</p>
        </div>
      </div>
    </div>
  );
}
