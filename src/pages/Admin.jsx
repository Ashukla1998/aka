import React, { useEffect, useState } from "react";
import {
  EnvelopeIcon,
  TrashIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";

export default function AdminContacts() {
  const [messages, setMessages] = useState([]);
  const [search, setSearch] = useState("");

  /* LOAD FROM LOCALSTORAGE */
  useEffect(() => {
    const stored =
      JSON.parse(localStorage.getItem("contactMessages")) || [];
    setMessages(stored);
  }, []);

  /* SYNC TO LOCALSTORAGE */
  const sync = (data) => {
    setMessages(data);
    localStorage.setItem("contactMessages", JSON.stringify(data));
  };

  /* SEARCH */
  const filtered = messages.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase())
  );

  /* TOGGLE READ / UNREAD */
  const toggleRead = (id) => {
    sync(
      messages.map((m) =>
        m.id === id ? { ...m, read: !m.read } : m
      )
    );
  };

  /* DELETE MESSAGE */
  const remove = (id) => {
    if (window.confirm("Delete this message?")) {
      sync(messages.filter((m) => m.id !== id));
    }
  };

  /* EXPORT CSV */
  const exportCSV = () => {
    const headers = ["Name", "Email", "Company", "Message", "Date", "Status"];
    const rows = messages.map((m) => [
      m.name,
      m.email,
      m.company || "",
      m.message,
      m.date,
      m.read ? "Read" : "Unread",
    ]);

    const csv = [headers, ...rows]
      .map((r) => r.map((v) => `"${v}"`).join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "contact_messages.csv";
    link.click();
  };

  return (
    <main className="min-h-screen bg-[#f7f7f7] px-8 md:px-24 py-20">

      {/* ================= HEADER ================= */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
        <div>
          <p className="text-xs tracking-widest uppercase text-gray-500 mb-2">
            Admin Panel
          </p>
          <h1 className="font-serif text-3xl">
            Contact Messages
          </h1>
        </div>



        <button
          onClick={exportCSV}
          className="mt-4 md:mt-0 px-6 py-2 text-sm
             border border-gray-900
             hover:bg-gray-900 hover:text-white
             transition flex items-center gap-2"
        >
          <ArrowDownTrayIcon className="w-4 h-4" />
          Export CSV
        </button>

      </div>

      {/* ================= TOOLBAR ================= */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search by name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-96 px-4 py-3 text-sm
                     border border-gray-300 bg-white
                     focus:outline-none focus:border-gray-900"
        />
      </div>

      {/* ================= CARD TABLE ================= */}
      <div className="bg-white border border-gray-200">

        {/* TABLE HEADER */}
        <div className="grid grid-cols-[120px_1.2fr_1.4fr_2fr_160px_120px]
                        px-6 py-4 text-xs uppercase tracking-wider text-gray-500
                        border-b bg-gray-50">
          <div>Status</div>
          <div>Name</div>
          <div>Company</div>
          <div>Email</div>
          <div>Message</div>
          <div>Date</div>
          {/* <div className="text-right">Actions</div> */}
        </div>

        {/* EMPTY STATE */}
        {filtered.length === 0 && (
          <div className="py-20 text-center text-gray-500">
            No messages found
          </div>
        )}

        {/* ROWS */}
        {filtered.map((m) => (
          <div
            key={m.id}
            className={`group grid grid-cols-[120px_1.2fr_1.4fr_2fr_160px_120px]
                        px-6 py-5 border-b items-center
                        hover:bg-gray-50 transition
                        ${!m.read ? "bg-[#fcfbf8]" : ""}`}
          >
            {/* STATUS */}
            <div>
              <button
                onClick={() => toggleRead(m.id)}
                className={`text-xs px-3 py-1 rounded-full
                  ${m.read
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                  }`}
              >
                {m.read ? "Read" : "Unread"}
              </button>
            </div>

            {/* NAME */}
            <div className="font-medium text-gray-900">
              {m.name}
            </div>

            <div className="text-gray-700">
              {m.company}
            </div>

            {/* EMAIL */}
            <div className="text-gray-700">
              {m.email}
            </div>

            {/* MESSAGE */}
            <div className="text-gray-600 line-clamp-2 pr-6">
              {m.message}
            </div>

            {/* DATE */}
            <div className="text-xs text-gray-500">
              {m.date}
            </div>

            {/* ACTIONS */}
            <div className="flex justify-end items-center gap-4
                            opacity-0 group-hover:opacity-100 transition">

              {/* Reply */}
              <a
                href={`mailto:${m.email}?subject=Re: Your enquiry`}
                title="Reply"
                className="p-2 rounded-full
                           text-gray-600 hover:text-blue-600
                           hover:bg-blue-50 transition"
              >
                <EnvelopeIcon className="w-5 h-5" />
              </a>

              <button
                onClick={() => remove(m.id)}
                title="Delete"
                className="p-2 rounded-full
                           text-gray-600 hover:text-red-600
                           hover:bg-red-50 transition"
              >
                <TrashIcon className="w-5 h-5" />
              </button>

            </div>
            
          </div>
        ))}
      </div>

    </main>
  );
}
