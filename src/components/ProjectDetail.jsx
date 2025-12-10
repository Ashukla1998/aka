import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function ProjectDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();

  const project = location.state?.project;

  if (!project) {
    return (
      <div className="min-h-screen p-10 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Project not loaded</h2>
        <p className="text-gray-600 mb-6">
          This page needs project details but they were not passed correctly.
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md"
        >
          Go Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <button
        onClick={() => navigate(-1)}
        className="text-sm text-gray-700 underline mb-4"
      >
        ← Back
      </button>

      <div className="max-w-4xl bg-white shadow-lg rounded-xl p-6 mx-auto">
        <img
          src={project.img}
          className="w-full h-80 object-cover rounded-lg mb-6"
          alt=""
        />

        <h1 className="text-3xl font-bold mb-3">{project.title}</h1>

        <p className="text-gray-700">
          {project.details || "No details provided yet. Add project details here."}
        </p>
      </div>
    </div>
  );
}
