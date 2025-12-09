import React from "react";

const projects = [
  {
    title: "Modern Industrial Loft",
    year: 2022,
    location: "New York, USA",
    price: "$2,895",
    image: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae",
  },
  {
    title: "Minimalist Living Room",
    year: 2023,
    location: "Los Angeles, USA",
    price: "$3,200",
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb",
  },
  {
    title: "Cozy Modern Bedroom",
    year: 2021,
    location: "Chicago, USA",
    price: "$2,100",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
  },
];

export default function ArchiesLanding() {
  return (
    <div className="min-h-screen bg-[#f7f5f2] p-6">
      <div className="max-w-7xl mx-auto">

        {/* Hero Section */}
        <section className="text-center py-16 px-4 md:px-0">
          <h1 className="text-4xl md:text-6xl font-light leading-tight font-serif text-gray-800">
            Elevate Your <br />
            <span className="font-semibold text-[#c5a879]">Living Space</span>
          </h1>
          <p className="mt-6 text-gray-500 max-w-2xl mx-auto text-lg font-light">
            High-end interiors designed to bring warmth, beauty, and harmony into your home.
          </p>
        </section>

        {/* Project Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <p className="text-xs text-gray-400 uppercase tracking-wider">Latest Project</p>
                <h2 className="text-2xl font-semibold mt-1 text-gray-800">{project.title}</h2>
                <p className="mt-2 text-sm text-gray-500">Completed in {project.year}</p>

                <div className="mt-4 flex flex-col sm:flex-row sm:justify-between text-sm">
                  <div>
                    <p className="text-gray-400">Location</p>
                    <p className="font-medium">{project.location}</p>
                  </div>
                  <div className="mt-2 sm:mt-0">
                    <p className="text-gray-400">Budget</p>
                    <p className="font-medium text-[#c5a879]">{project.price}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>

        <div className="h-20" />
      </div>
    </div>
  );
}
