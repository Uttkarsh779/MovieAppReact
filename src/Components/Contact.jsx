import React, { useState } from "react";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you could send form data to an API or backend
    alert("Message sent successfully!");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="w-full h-full  px-6 sm:px-10 md:px-20  bg-[#1F1E24] text-zinc-200">
      <h1 className="text-4xl sm:text-5xl font-bold text-[#6556cd] mb-6">
        Contact Us
      </h1>

      <p className="text-lg mb-10">
        Have questions, suggestions, or just want to say hi? We'd love to hear
        from you. Fill out the form below and our team will get back to you as
        soon as possible.
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-[#2A2B36] p-6 sm:p-10 rounded-md shadow-md max-w-3xl mx-auto"
      >
        <div className="mb-6">
          <label htmlFor="name" className="block text-lg font-medium mb-2">
            Your Name
          </label>
          <input
            required
            type="text"
            name="name"
            id="name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-[#1F1E24] border border-zinc-600 text-white outline-none focus:ring-2 focus:ring-[#6556cd]"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="email" className="block text-lg font-medium mb-2">
            Your Email
          </label>
          <input
            required
            type="email"
            name="email"
            id="email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-[#1F1E24] border border-zinc-600 text-white outline-none focus:ring-2 focus:ring-[#6556cd]"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="message" className="block text-lg font-medium mb-2">
            Your Message
          </label>
          <textarea
            required
            name="message"
            id="message"
            rows="5"
            value={form.message}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded bg-[#1F1E24] border border-zinc-600 text-white outline-none focus:ring-2 focus:ring-[#6556cd]"
          ></textarea>
        </div>

        <button
          type="submit"
          className="bg-[#6556cd] hover:bg-[#574cbd] text-white px-6 py-2 rounded-md text-lg font-semibold transition duration-200"
        >
          Send Message
        </button>
      </form>

      <p className="text-center text-zinc-400 mt-12 text-sm">
        © {new Date().getFullYear()} UTFlex. Made with ❤️ by Movie Lovers.
      </p>
    </div>
  );
};

export default Contact;
