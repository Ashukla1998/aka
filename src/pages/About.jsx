import React from "react";
import { motion } from "framer-motion";
import teamImage from "../images/team.jpg";
import member from "../images/member.jpg";
export default function About() {
  return (
    <main className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-indigo-600 font-semibold mb-2">About us</div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800">
            We design meaningful experiences
          </h2>
          <p className="mt-3 text-slate-600">
            We combine research, creativity and engineering to deliver products
            and services that move people.
          </p>
        </div>

        {/* Mission Section */}
        <section className="grid md:grid-cols-2 gap-8 items-center mb-12">
          <motion.div
            className="rounded-2xl overflow-hidden shadow-lg"
            initial={{ x: -40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <img
              src={teamImage}
              alt="team"
              className="w-full h-96 object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.12 }}
          >
            <h3 className="text-2xl font-bold mb-3">Our mission</h3>
            <p className="text-slate-600 mb-4">
              We help organisations unlock growth by designing digital products
              that create measurable value. Our approach blends strategy, design
              and engineering.
            </p>

            <ul className="space-y-3">
              {[
                {
                  title: "Research-led design",
                  desc: "User research and data guide every decision.",
                },
                {
                  title: "Iterative delivery",
                  desc: "Small, frequent releases that reduce risk.",
                },
                {
                  title: "Human-centered outcomes",
                  desc: "We measure success through real user impact.",
                },
              ].map((item, i) => (
                <li key={i} className="flex gap-3 items-start">
                  <div className="text-indigo-600 mt-1">●</div>
                  <div>
                    <div className="font-semibold">{item.title}</div>
                    <div className="text-sm text-slate-600">{item.desc}</div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex gap-3">
              <a
                href="/services"
                className="px-4 py-2 rounded-md bg-indigo-600 text-white"
              >
                See services
              </a>
              <a
                href="/contact"
                className="px-4 py-2 rounded-md border"
              >
                Get in touch
              </a>
            </div>
          </motion.div>
        </section>

        {/* Team Section */}
        <section className="mb-12">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-semibold">Meet the team</h3>
            <p className="text-slate-600 mt-2">
              Our small, cross-disciplinary team.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <motion.figure
                key={i}
                whileHover={{ y: -6 }}
                className="bg-white rounded-2xl p-4 shadow-sm"
              >
                <img
                  src={member}
                  alt="person"
                  className="w-full h-44 object-cover rounded-lg mb-4"
                />
                <figcaption>
                  <div className="font-semibold">Person {i}</div>
                  <div className="text-sm text-slate-600">Design Lead</div>
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </section>

        {/* Values Section */}
        <section>
          <div className="text-center mb-6">
            <h3 className="text-2xl font-semibold">Our values</h3>
            <p className="text-slate-600 mt-2">
              We follow a clear set of principles
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Transparency",
                desc: "Open communication with clients and teams.",
              },
              {
                title: "Craft",
                desc: "We sweat the details and ship quality products.",
              },
              {
                title: "Empathy",
                desc: "Design for humans first; metrics second.",
              },
            ].map((val, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.02 }}
                className="bg-white p-6 rounded-2xl shadow-sm"
              >
                <h4 className="font-semibold mb-2">{val.title}</h4>
                <p className="text-sm text-slate-600">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
