import React from "react";
import { motion } from "framer-motion";
import teamImage from "../images/team.jpg";
import { Leaders, teamMembers } from "../Data/Team";

export default function About() {
  const groupedTeams = teamMembers.reduce((acc, member) => {
    if (!acc[member.role]) {
      acc[member.role] = [];
    }
    acc[member.role].push(member);
    return acc;
  }, {});

  return (
    <main className="min-h-screen bg-slate-50 py-16">
      <div className="max-w-6xl mx-auto px-6">

        {/* ================= HEADER ================= */}
        <div className="text-center mb-20">
          <p className="text-xs tracking-[0.3em] uppercase text-arcadisOrange mb-4">
            About Us
          </p>
          <h2 className="font-serif text-4xl md:text-5xl mb-6 text-slate-800">
            We design meaningful experiences
          </h2>
          <p className="max-w-2xl mx-auto text-slate-600">
            We combine research, creativity and engineering to deliver products
            and services that move people.
          </p>
        </div>

        {/* ================= MISSION ================= */}
        <section className="grid md:grid-cols-2 gap-16 items-center mb-28">
          <motion.div
            initial={{ x: -40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="overflow-hidden"
          >
            <img
              src={teamImage}
              alt="Our team"
              className="w-full h-[420px] object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ x: 40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="font-serif text-3xl mb-6">Our Mission</h3>
            <p className="text-slate-600 mb-8 leading-relaxed">
              We help organisations unlock growth by designing thoughtful,
              sustainable and human-centered solutions that create measurable
              value.
            </p>

            <ul className="space-y-5">
              {[
                {
                  title: "Research-led design",
                  desc: "Insights and data guide every decision we make.",
                },
                {
                  title: "Iterative delivery",
                  desc: "Small, focused releases reduce risk and add clarity.",
                },
                {
                  title: "Human outcomes",
                  desc: "Success is measured by real-world impact.",
                },
              ].map((item, i) => (
                <li key={i}>
                  <div className="font-medium">{item.title}</div>
                  <div className="text-sm text-slate-600">{item.desc}</div>
                </li>
              ))}
            </ul>
          </motion.div>
        </section>

        {/* ================= LEADERS ================= */}
        <section className="mb-32">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="text-xs tracking-[0.3em] uppercase text-slate-500 mb-4">
              Leadership
            </p>
            <h3 className="font-serif text-4xl mb-4">
              Our Leaders
            </h3>
            <p className="text-slate-600">
              Experience and vision guiding the practice.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-20 max-w-5xl mx-auto">
            {Leaders.map((member, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
              >
                {/* Fixed container for alignment */}
                <div className="w-full h-[460px] flex items-center justify-center bg-slate-100 mb-6">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="max-h-full w-auto"
                  />
                </div>
                <h4 className="font-serif text-2xl mb-1 flex items-center justify-center">
                  {member.name}
                </h4>
                <p className="text-slate-700 mb-2 flex items-center justify-center">
                  {member.role}
                </p>
                <p className="text-xs text-slate-500 flex items-center justify-center">
                  {member.degree} · {member.experience}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ================= TEAM ================= */}
        <section className="mb-28">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <p className="text-xs tracking-[0.3em] uppercase text-slate-500 mb-4">
              Our People
            </p>
            <h3 className="font-serif text-3xl mb-4">
              The Team
            </h3>
            <p className="text-slate-600">
              A collaborative, cross-disciplinary group working as one.
            </p>
          </div>

          {Object.entries(groupedTeams).map(([teamName, members], i) => (
            <div key={i} className="mb-24">

              {/* Team Heading */}
              <h4 className="font-serif text-2xl mb-12 text-center text-arcadisOrange">
                {teamName}
              </h4>

              {/* Two members per row */}
              <div className="grid sm:grid-cols-2 gap-x-16 gap-y-20 max-w-4xl mx-auto">
                {members.map((member, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.25 }}
                    className="text-center"
                  >
                    <div className="h-64 flex items-center justify-center bg-slate-100 mb-4">
                      <img
                        src={member.photo}
                        alt={member.name}
                        className="max-h-full w-auto grayscale hover:grayscale-0 transition duration-500"
                      />
                    </div>

                    <h5 className="font-medium text-lg">
                      {member.name}
                    </h5>
                    <p className="text-sm text-slate-600">
                      {member.degree}
                    </p>
                    <p className="text-xs uppercase tracking-wide text-slate-500">
                      Experience · {member.experience}
                    </p>

                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </section>


        {/* ================= VALUES ================= */}
        <section>
          <div className="text-center mb-12">
            <h3 className="font-serif text-3xl mb-4">Our Values</h3>
            <p className="text-slate-600">
              Principles that guide our work.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Transparency",
                desc: "Clear communication and shared understanding.",
              },
              {
                title: "Craft",
                desc: "Attention to detail and quality in everything we do.",
              },
              {
                title: "Empathy",
                desc: "Designing with people at the center.",
              },
            ].map((val, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -4 }}
                className="bg-white p-8"
              >
                <h4 className="font-medium mb-3">{val.title}</h4>
                <p className="text-sm text-slate-600">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}
