import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import teamImage from "../images/team.jpg";

export default function About() {
  const [leaders, setLeaders] = useState([]);
  const [groupedTeams, setGroupedTeams] = useState({});
  const [loading, setLoading] = useState(true);
  
  const TotalExperience = (num) =>{
    const CurrentYear = new Date().getFullYear();
    const Intnum = parseInt(num, 10);
    return CurrentYear - Intnum;
  };
  

  useEffect(() => {
    async function fetchMembers() {
      try {
        const response = await fetch("https://www.lifepage.in/n/api/GetFilterMember");
        const json = await response.json();

        if (json?.success === 1 && json?.data && typeof json.data === "object") {
          const apiData = json.data;

          // 1. Leadership Team for Directors section
          const leadershipList = (apiData["Leadership Team"] || []).filter(
            (item) => item.is_active !== false
          );
          setLeaders(leadershipList);

          // 2. All other categories for The Team section
          const restCategories = {};
          Object.keys(apiData).forEach((categoryKey) => {
            if (categoryKey !== "Leadership Team") {
              const activeMembers = (apiData[categoryKey] || []).filter(
                (item) => item.is_active !== false
              );
              if (activeMembers.length > 0) {
                restCategories[categoryKey] = activeMembers;
              }
            }
          });

          setGroupedTeams(restCategories);
        }
      } catch (err) {
        console.error("Failed to load AKA members:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchMembers();
  }, []);

  return (
    <main className="min-h-screen bg-white text-neutral-900 py-16">
      <div className="max-w-7xl mx-auto px-6">

        {/* ================= HEADER ================= */}
        <div className="text-center mb-20">
          <p className="text-xs tracking-[0.3em] uppercase text-arcadisOrange mb-4">
            About Us
          </p>

          <h2 className="text-4xl md:text-5xl font-semibold mb-6 text-neutral-900">
            We design meaningful experiences
          </h2>

          <p className="max-w-2xl mx-auto text-neutral-600 leading-relaxed">
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
          >
            <img
              src={teamImage}
              alt="Our team"
              className="w-full h-[420px] object-cover rounded-[20px]"
            />
          </motion.div>

          <motion.div
            initial={{ x: 40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-3xl font-semibold mb-6 text-neutral-900">
              Our Mission
            </h3>

            <p className="text-neutral-600 mb-8 leading-relaxed">
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
                  <div className="font-medium text-neutral-900">{item.title}</div>
                  <div className="text-sm text-neutral-600">{item.desc}</div>
                </li>
              ))}
            </ul>
          </motion.div>
        </section>

        {/* ================= LEADERS / DIRECTORS ================= */}
        {!loading && leaders.length > 0 && (
          <section className="mb-32">
            <h3 className="text-3xl md:text-4xl font-normal tracking-tight mb-8 text-neutral-900">
              Directors
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 border-t border-b border-neutral-200 divide-x divide-neutral-200">
              {leaders.map((member, index) => (
                <div
                  key={member.memberid || index}
                  className="group p-4 flex flex-col justify-between cursor-pointer"
                >
                  <div className="w-full aspect-[3/4] bg-neutral-100 overflow-hidden mb-4">
                    <img
                      src={member.photo}
                      alt={member.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition duration-500 ease-out group-hover:grayscale"
                    />
                  </div>

                  <div>
                    <div className="flex items-end justify-between gap-2 pt-2">
                      <div className="min-w-0">
                        <h4 className="text-sm md:text-base font-medium text-neutral-900 leading-snug line-clamp-2">
                          {member.name}
                        </h4>
                      </div>
                      <svg
                        className="w-4 h-4 text-neutral-900 shrink-0 mb-0.5 transition-transform duration-300 group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                        />
                      </svg>
                    </div>
                    {member.degree && (
                      <p className="text-xs text-neutral-500 mt-1 font-mono tracking-tight">
                        {member.degree}
                      </p>
                    )}

                    {member.experience && (
                      <p className="text-xs text-neutral-500 mt-1 font-mono tracking-tight">
                        {TotalExperience(member.experience)} years of Experience
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ================= THE TEAM ================= */}
        {!loading && Object.keys(groupedTeams).length > 0 && (
          <section className="mb-28">
            <div className="max-w-3xl mb-12">
              <h3 className="text-3xl font-normal tracking-tight mb-2 text-neutral-900">
                The Team
              </h3>
              <p className="text-neutral-600">
                A collaborative, cross-disciplinary group working as one.
              </p>
            </div>

            {Object.entries(groupedTeams).map(([teamName, groupMembers], i) => (
              <div key={i} className="mb-16">
                <h4 className="text-lg uppercase tracking-wider text-neutral-500 mb-6 font-medium">
                  {teamName}
                </h4>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 border-t border-b border-neutral-200 divide-x divide-neutral-200">
                  {groupMembers.map((member, index) => (
                    <div
                      key={member.memberid || index}
                      className="group p-4 flex flex-col justify-between cursor-pointer"
                    >
                      <div className="w-full aspect-[3/4] bg-neutral-100 overflow-hidden mb-4">
                        <img
                          src={member.photo}
                          alt={member.name}
                          loading="lazy"
                          className="w-full h-full object-cover transition duration-500 ease-out group-hover:grayscale"
                        />
                      </div>

                      <div>
                        <div className="flex items-end justify-between gap-2 pt-2">
                          <div className="min-w-0">
                            <h5 className="text-sm md:text-base font-medium text-neutral-900 leading-snug line-clamp-2">
                              {member.name}
                            </h5>
                          </div>
                          <svg
                            className="w-4 h-4 text-neutral-900 shrink-0 mb-0.5 transition-transform duration-300 group-hover:translate-x-1"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                            />
                          </svg>
                        </div>
                        {member.degree && (
                          <p className="text-xs text-neutral-500 mt-1 font-mono tracking-tight">
                            {member.degree}
                          </p>
                        )}

                        {member.experience && (
                          <p className="text-xs text-neutral-500 mt-1 font-mono tracking-tight">
                            {TotalExperience(member.experience)} years of Experience
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </section>
        )}

        {/* ================= VALUES ================= */}
        <section className="border-b border-gray-200 backdrop-blur-sm pb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-semibold mb-4 text-neutral-900">
              Our Values
            </h3>
            <p className="text-neutral-600">
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
                className="bg-neutral-50 border border-neutral-200 p-8 rounded-[20px]"
              >
                <h4 className="font-medium mb-3 text-neutral-900">
                  {val.title}
                </h4>
                <p className="text-sm text-neutral-600">
                  {val.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}
