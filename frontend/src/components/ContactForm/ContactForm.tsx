"use client";

import { sendContactMessage } from "@/libs/api/contact";
import React, { useState } from "react";
import { toast } from "react-toastify";

const ContactForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidEmail(form.email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      await sendContactMessage(form);

      toast.success("Thanks for reaching out! I’ll reply as soon as I can.");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      toast.error("Failed to send message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-16 px-4 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8">Contact Me</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            className="block font-medium mb-1 text-gray-800"
            htmlFor="name"
          >
            Name
          </label>
          <input
            required
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-gray-800"
          />
        </div>

        <div>
          <label
            className="block font-medium mb-1 text-gray-800"
            htmlFor="email"
          >
            Email
          </label>
          <input
            required
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-gray-800"
          />
        </div>

        <div>
          <label
            className="block font-medium mb-1 text-gray-800"
            htmlFor="subject"
          >
            Subject
          </label>
          <input
            required
            type="text"
            id="subject"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-gray-800"
          />
        </div>

        <div>
          <label
            className="block font-medium mb-1 text-gray-800"
            htmlFor="message"
          >
            Message
          </label>
          <textarea
            required
            id="message"
            name="message"
            rows={5}
            value={form.message}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none resize-none focus:border-gray-800"
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className="bg-gray-900 text-white py-2 px-6 rounded-md hover:bg-gray-600 transition"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default ContactForm;
