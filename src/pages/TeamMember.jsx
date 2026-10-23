import React, { useEffect, useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import Spinner from "../components/Spinner";
import Seo, { SITE_URL, SITE_NAME } from "../components/Seo";

const MEMBERS_API = "https://www.lifepage.in/n/api/GetFilterMember";
const RELATED_MEMBER_COUNT = 6;

/* URL slug for a member, e.g. "Ar. Preeti Saini" -> "ar-preeti-saini" */
export const memberSlug = (member) =>
  String(member?.name || member?.memberid || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

/* `experience` holds the year the member started practising */
export const yearsOfExperience = (startYear) => {
  const year = parseInt(startYear, 10);
  return Number.isNaN(year) ? null : new Date().getFullYear() - year;
};

/* Remount per slug so moving between colleagues resets the profile state */
export default function TeamMember() {
  const { slug } = useParams();
  return <TeamMemberProfile key={slug} slug={slug} />;
}

function TeamMemberProfile({ slug }) {
  const { state } = useLocation();

  // Member passed from the About page renders instantly; the API fills in the rest
  const [member, setMember] = useState(state?.member || null);
  const [colleagues, setColleagues] = useState([]);
  const [loading, setLoading] = useState(!state?.member);

  useEffect(() => {
    window.scrollTo(0, 0);
    const controller = new AbortController();

    async function fetchMember() {
      try {
        const response = await fetch(MEMBERS_API, { signal: controller.signal });
        const json = await response.json();
        if (json?.success !== 1 || !json?.data || typeof json.data !== "object") return;

        const allMembers = Object.values(json.data)
          .flat()
          .filter((item) => item.is_active !== false);

        const found = allMembers.find((item) => memberSlug(item) === slug);
        setMember(found || null);

        if (found) {
          setColleagues(
            allMembers
              .filter((item) => item.category === found.category && item.memberid !== found.memberid)
              .slice(0, RELATED_MEMBER_COUNT)
          );
        }
      } catch (err) {
        if (err.name !== "AbortError") console.error("Failed to load member:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchMember();
    return () => controller.abort();
  }, [slug]);

  if (loading) {
    return (
      <main className="w-full min-h-[70vh] flex flex-col justify-center items-center bg-white">
        <Spinner isLoading={true} />
        <span className="mt-4 text-xs uppercase tracking-[0.25em] text-gray-400 animate-pulse">
          Loading Profile
        </span>
      </main>
    );
  }

  if (!member) {
    return (
      <main className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center bg-white">
        <Seo title="Team Member Not Found" noindex />
        <span className="text-xs uppercase tracking-[0.3em] text-arcadisOrange mb-3">
          Error 404
        </span>
        <h2 className="text-3xl sm:text-4xl font-light text-gray-900 tracking-tight mb-4">
          Team Member Not Found
        </h2>
        <p className="text-gray-500 max-w-md text-sm mb-8 leading-relaxed">
          The profile you are looking for could not be found or is no longer available.
        </p>
        <Link
          to="/about"
          className="inline-flex items-center gap-2 px-6 py-3 border border-gray-900 text-xs uppercase tracking-widest text-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300"
        >
          ← Back to About Us
        </Link>
      </main>
    );
  }

  const years = yearsOfExperience(member.experience);

  const details = [
    { label: "Role", value: member.role },
    { label: "Team", value: member.category },
    { label: "Qualification", value: member.degree },
    { label: "Experience", value: years !== null ? `${years} years` : null },
    { label: "Practising Since", value: member.experience },
  ].filter((item) => Boolean(item.value));

  const profileUrl = `${SITE_URL}/team/${slug}`;
  const seoDescription =
    member.description ||
    `${member.name}${member.role ? `, ${member.role}` : ""} at ${SITE_NAME}${
      member.degree ? ` (${member.degree})` : ""
    }.`;

  const personSchema = [
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: member.name,
      jobTitle: member.role || undefined,
      image: member.photo || undefined,
      description: seoDescription,
      url: profileUrl,
      worksFor: { "@id": `${SITE_URL}/#organization` },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "About", item: `${SITE_URL}/about` },
        { "@type": "ListItem", position: 3, name: member.name, item: profileUrl },
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-white text-neutral-900 py-12">
      <Seo
        title={[member.name, member.role].filter(Boolean).join(", ")}
        description={seoDescription}
        image={member.photo}
        type="profile"
        schema={personSchema}
      />
      <div className="max-w-7xl mx-auto px-6">

        {/* ================= BREADCRUMB ================= */}
        <div className="border-b border-neutral-200 pb-4 mb-12">
          <Link
            to="/about"
            className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-neutral-500 hover:text-neutral-900 transition-colors"
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
            <span>About Us</span>
          </Link>
        </div>

        {/* ================= PROFILE ================= */}
        <section className="grid md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-12 lg:gap-20 items-start mb-28">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="w-full aspect-[3/4] bg-neutral-100 overflow-hidden"
          >
            {member.photo && (
              <img
                src={member.photo}
                alt={member.name}
                className="w-full h-full object-cover"
              />
            )}
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:pt-4"
          >
            {member.category && (
              <p className="text-xs tracking-[0.3em] uppercase text-arcadisOrange mb-4">
                {member.category}
              </p>
            )}

            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-3 text-neutral-900">
              {member.name}
            </h1>

            {member.role && (
              <p className="text-lg text-neutral-600 mb-10">{member.role}</p>
            )}

            {details.length > 0 && (
              <dl className="grid grid-cols-1 sm:grid-cols-2 border-t border-neutral-200 mb-10">
                {details.map((item) => (
                  <div key={item.label} className="py-4 border-b border-neutral-200 sm:pr-6">
                    <dt className="text-[11px] uppercase tracking-[0.2em] text-neutral-400 mb-1">
                      {item.label}
                    </dt>
                    <dd className="text-sm md:text-base text-neutral-900 font-mono tracking-tight">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>
            )}

            {member.description && (
              <div className="text-neutral-600 leading-relaxed whitespace-pre-line">
                {member.description}
              </div>
            )}
          </motion.div>
        </section>

        {/* ================= SAME TEAM ================= */}
        {colleagues.length > 0 && (
          <section className="mb-16">
            <h3 className="text-3xl font-normal tracking-tight mb-8 text-neutral-900">
              More from {member.category}
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 border-t border-b border-neutral-200 divide-x divide-neutral-200">
              {colleagues.map((colleague) => (
                <Link
                  key={colleague.memberid}
                  to={`/team/${memberSlug(colleague)}`}
                  state={{ member: colleague }}
                  className="group p-4 flex flex-col"
                >
                  <div className="w-full aspect-[3/4] bg-neutral-100 overflow-hidden mb-4">
                    <img
                      src={colleague.photo}
                      alt={colleague.name}
                      loading="lazy"
                      className="w-full h-full object-cover transition duration-500 ease-out group-hover:grayscale"
                    />
                  </div>
                  <h4 className="text-sm md:text-base font-medium text-neutral-900 leading-snug line-clamp-2">
                    {colleague.name}
                  </h4>
                  {colleague.role && (
                    <p className="text-xs text-neutral-500 mt-1 font-mono tracking-tight">
                      {colleague.role}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
