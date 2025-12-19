import React, { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const [sent, setSent] = useState(false);

  const mapLocation = {
    lat: 30.3837,
    lng: 78.0907,
  };

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const newMessage = {
      id: Date.now(),
      name: form.name,
      email: form.email,
      company: form.company,
      message: form.message,
      date: new Date().toLocaleString(),
      read: false,
    };

    const existingMessages =
      JSON.parse(localStorage.getItem("contactMessages")) || [];

    localStorage.setItem(
      "contactMessages",
      JSON.stringify([newMessage, ...existingMessages])
    );

    setSent(true);
    setForm({
      name: "",
      email: "",
      company: "",
      message: "",
    });
  }

  return (
    <main className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-4xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="text-arcadisOrange font-semibold mb-2">
            Get in touch
          </div>
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
            <h3 className="text-xl font-semibold mb-3">
              Send us a message
            </h3>

            {sent ? (
              <div className="p-6 bg-green-50 rounded text-green-700">
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
                    className="px-4 py-2 bg-arcadisOrange text-white rounded-md"
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
                48, Pleasant Valley, Rajpur Rd, IAS Officers Colony,
                Rajpur, Dehradun, Uttarakhand 248009
              </p>

              <div className="mt-4">
                <div className="text-sm text-slate-500">Email</div>
                <a
                  href="mailto:kapil@lifepage.in"
                  className="text-slate-800 font-medium"
                >
                  kapil@lifepage.in
                </a>
              </div>

              <div className="mt-3">
                <div className="text-sm text-slate-500">Phone</div>
                <a
                  href="tel:+919719799992"
                  className="text-slate-800 font-medium"
                >
                  +91 9719799992
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
              <div className="mt-3 h-48 rounded overflow-hidden">
                <iframe
                  title="Office Location"
                  src={`https://www.google.com/maps?q=${mapLocation.lat},${mapLocation.lng}&output=embed`}
                  className="w-full h-full border-0"
                  loading="lazy"
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  );
}
