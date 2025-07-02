import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-orange-50 px-6 py-20 flex flex-col items-center">
      <div className="max-w-4xl w-full bg-white p-10 rounded-3xl shadow-xl border border-orange-200">
        <h1 className="text-4xl font-bold text-orange-600 mb-6 text-center">
          About Doubt Tracker
        </h1>

        <p className="text-gray-700 text-lg mb-6 leading-relaxed">
          The <span className="font-semibold text-orange-500">Doubt Tracker</span> is a simple yet powerful platform that bridges the gap between students and mentors. Our goal is to streamline the process of raising and resolving academic doubts quickly and efficiently.
        </p>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-orange-500 mb-3">
             For Students
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Submit your academic doubts easily through a simple form.</li>
            <li>Attach reference images, screenshots, or files for clarity.</li>
            <li>Track the status of your doubts: <span className="text-green-600 font-medium">Resolved</span>, <span className="text-orange-500 font-medium">In Progress</span>, or <span className="text-red-500 font-medium">Unresolved</span>.</li>
            <li>Edit or delete your doubts before they’re resolved.</li>
          </ul>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-orange-500 mb-3">
             For Mentors
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Access all submitted student doubts in one place.</li>
            <li>View detailed descriptions and any attached files or images.</li>
            <li>Respond with solutions and mark doubts as solved.</li>
            <li>Provide clear and helpful explanations to support student learning.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-orange-500 mb-3">
             File & Image Support
          </h2>
          <p className="text-gray-700">
            Students can upload images or documents to support their queries, and mentors can refer to these attachments while providing solutions. This improves clarity and speeds up the resolution process.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
