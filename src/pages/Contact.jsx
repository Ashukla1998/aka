import React, { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Form submitted:", form);
    setSent(true);
  }

  return (
    <main className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-4xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="text-indigo-600 font-semibold mb-2">Get in touch</div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800">
            Contact us
          </h2>
          <p className="mt-3 text-slate-600">
            Fill the form and we will reply within one business day.
          </p>
        </div>

        {/* Layout */}
        <div className="grid md:grid-cols-2 gap-8">

          {/* Contact Form */}
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold mb-3">Send us a message</h3>

            {sent ? (
              <div className="p-6 bg-green-50 rounded">
                Thanks! We’ll respond shortly.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-sm mb-1 block">Name</label>
                  <input
                    required
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded-md"
                  />
                </div>

                <div>
                  <label className="text-sm mb-1 block">Email</label>
                  <input
                    required
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded-md"
                  />
                </div>

                <div>
                  <label className="text-sm mb-1 block">Company</label>
                  <input
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded-md"
                  />
                </div>

                <div>
                  <label className="text-sm mb-1 block">Message</label>
                  <textarea
                    required
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    className="w-full border px-3 py-2 rounded-md h-28"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-md"
                  >
                    Send message
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setForm({
                        name: "",
                        email: "",
                        company: "",
                        message: "",
                      })
                    }
                    className="px-4 py-2 border rounded-md"
                  >
                    Clear
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h4 className="font-semibold">Our office</h4>
              <p className="text-sm text-slate-600 mt-2">
                123, Your Street, City — Open Mon–Fri
              </p>

              <div className="mt-4">
                <div className="text-sm text-slate-500">Email</div>
                <a
                  href="mailto:hello@yourdomain.com"
                  className="text-slate-800 font-medium"
                >
                  hello@yourdomain.com
                </a>
              </div>

              <div className="mt-3">
                <div className="text-sm text-slate-500">Phone</div>
                <a href="tel:+911234567890" className="text-slate-800 font-medium">
                  +91 12345 67890
                </a>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h4 className="font-semibold">Opening hours</h4>
              <ul className="mt-3 text-sm text-slate-600 space-y-1">
                <li>Mon–Fri: 9:00 — 18:00</li>
                <li>Sat: 10:00 — 14:00</li>
                <li>Sun: Closed</li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h4 className="font-semibold">Map</h4>
              <div className="mt-3 h-40 rounded overflow-hidden bg-slate-100 flex items-center justify-center text-slate-400">
                Map Placeholder
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
