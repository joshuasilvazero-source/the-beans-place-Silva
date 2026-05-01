// ============================================================
// CONTACTFORM.JSX — Simple Contact Form (Day 3)
// ============================================================
// A standalone contact form component with form validation.
// This is a simpler alternative to the ContactSection's
// inline form — used for learning form basics.
//
// WHAT YOU WILL LEARN:
// - useState for managing form data (object state)
// - Controlled inputs (value + onChange pattern)
// - Form submission with e.preventDefault()
// - Conditional rendering for validation messages
// - Dynamic className for error styling
// - Async functions and try/catch/finally
//
// CONCEPTS COVERED:
// - Object destructuring in event handlers
// - Spread operator for updating state: { ...prev, [name]: value }
// - Ternary expressions in className
// - Conditional rendering with && operator
//
// ============================================================

// STEP 1: Import useState from "react"

/* --- YOUR IMPORTS GO HERE --- */


// STEP 2: Create and export the ContactForm component
// export default function ContactForm() { ... }
//
// STEP 3: State variables (4 total)
//   const [submitted, setSubmitted] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const [formData, setFormData] = useState({
//     firstName: "", lastName: "", email: "", message: ""
//   });
//
// STEP 4: Event handlers
//
//   handleChange — updates formData when user types
//     const handleChange = (e) => {
//       const { name, value } = e.target;
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     };
//     DISCUSSION: What does { ...prev, [name]: value } do?
//     It creates a copy of the previous state and updates
//     only the field that changed (computed property name).
//
//   handleSubmit — validates and "sends" the form
//     - Call e.preventDefault() to stop page reload
//     - Set submitted to true (shows validation errors)
//     - Check if all fields are filled
//     - Set loading to true, simulate sending, show success/error
//
//   sendEmail — simulates an API call
//     const sendEmail = async (data) => {
//       console.log("Email would be sent with:", data);
//       return new Promise((resolve) => setTimeout(resolve, 1000));
//     };
//
// STEP 5: Build the JSX
//   <form onSubmit={handleSubmit} className="...">
//     - <h2> title
//     - Message display (success or error)
//     - Input fields: firstName, lastName (2-column grid)
//     - Input field: email (full width, col-span-2)
//     - Textarea: message (full width, col-span-2)
//     - Submit button (disabled when loading)
//
//   Each input should be a CONTROLLED INPUT:
//     <input
//       type="text"
//       name="firstName"
//       value={formData.firstName}
//       onChange={handleChange}
//       className={`... ${submitted && !formData.firstName ? "border-red" : "border-normal"}`}
//     />
//
//   Show validation error below each input:
//     {submitted && !formData.firstName && (
//       <p className="text-red-700 text-sm">First name is required</p>
//     )}

/* --- YOUR COMPONENT CODE GOES HERE --- */

import { useState } from "react";

export default function ContactForm() {
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        message: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const sendEmail = async (data) => {
        console.log("Email would be sent with:", data);
        return new Promise((resolve) => setTimeout(resolve, 1000));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true);

        if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
            setMessage("Please fill in all required fields.");
            return;
        }

        setLoading(true);

        try {
            await sendEmail(formData);
            setMessage("Thank you! Your message has been sent.");
            setFormData({ firstName: "", lastName: "", email: "", message: "" });
            setSubmitted(false);
        } catch {
            setMessage("Error sending message. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const inputClass = (field) =>
        `w-full min-w-0 rounded-xl border px-4 py-3 text-sm outline-none transition-all duration-300
        bg-[var(--expresso)]/50 text-white placeholder:text-white/45
        focus:bg-[var(--expresso)]/75 focus:ring-2 focus:ring-[var(--taupe)]/60
        ${
            submitted && !formData[field]
                ? "border-red-700 ring-1 ring-red-700/50"
                : "border-[var(--taupe)]/40"
        }`;

    return (
        <section className="w-full overflow-hidden px-4 py-10 sm:px-6 lg:px-8">
            <div className="mx-auto w-full max-w-6xl">
                <form
                    onSubmit={handleSubmit}
                    className="group relative grid w-full grid-cols-1 overflow-hidden rounded-3xl
                    border border-[var(--taupe)]/30
                    bg-gradient-to-br from-[var(--brown-700)]/45 via-[var(--expresso)]/60 to-black/40
                    shadow-2xl backdrop-blur-md transition-all duration-500 ease-out
                    md:grid-cols-[0.85fr_1.15fr]
                    md:hover:-translate-y-1 md:hover:shadow-[0_25px_80px_rgba(0,0,0,0.45)]"
                >
                    <div className="pointer-events-none absolute inset-0 bg-white/5" />

                    <div className="relative flex flex-col justify-between gap-6 border-b border-[var(--taupe)]/20 p-6 sm:p-8 md:border-b-0 md:border-r md:p-10">
                        <div>
                            <p className="text-xs uppercase tracking-[0.25em] text-[var(--taupe)]">
                                Contact Us
                            </p>

                            <h2 className="mt-3 text-3xl font-bold leading-tight text-white sm:text-4xl">
                                Let’s Start a Conversation
                            </h2>

                            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/70 sm:text-base">
                                Have a question, custom request, or partnership idea? Send us a message
                                and we’ll get back to you soon.
                            </p>
                        </div>

                        <div className="rounded-2xl border border-[var(--taupe)]/20 bg-black/15 p-4">
                            <p className="text-sm font-semibold text-white">Quick Response</p>
                            <p className="mt-1 text-sm text-white/60">
                                We typically respond as soon as possible.
                            </p>
                        </div>
                    </div>

                    <div className="relative grid grid-cols-1 gap-4 p-6 sm:p-8 md:grid-cols-2 md:p-10">
                        {message && (
                            <p
                                className={`col-span-1 rounded-xl px-4 py-3 text-center text-sm font-medium md:col-span-2 ${
                                    message.includes("Error") || message.includes("required")
                                        ? "border border-red-700/40 bg-red-900/30 text-red-200"
                                        : "border border-green-700/40 bg-green-900/30 text-green-200"
                                }`}
                            >
                                {message}
                            </p>
                        )}

                        <label className="flex min-w-0 flex-col gap-2">
                            <span className="text-sm font-semibold text-white/85">First Name</span>
                            <input
                                type="text"
                                name="firstName"
                                placeholder="Joshua"
                                value={formData.firstName}
                                onChange={handleChange}
                                className={inputClass("firstName")}
                            />
                            {submitted && !formData.firstName && (
                                <p className="text-xs text-red-300">First name is required.</p>
                            )}
                        </label>

                        <label className="flex min-w-0 flex-col gap-2">
                            <span className="text-sm font-semibold text-white/85">Last Name</span>
                            <input
                                type="text"
                                name="lastName"
                                placeholder="Silva"
                                value={formData.lastName}
                                onChange={handleChange}
                                className={inputClass("lastName")}
                            />
                            {submitted && !formData.lastName && (
                                <p className="text-xs text-red-300">Last name is required.</p>
                            )}
                        </label>

                        <label className="col-span-1 flex min-w-0 flex-col gap-2 md:col-span-2">
                            <span className="text-sm font-semibold text-white/85">Email Address</span>
                            <input
                                type="email"
                                name="email"
                                placeholder="you@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                className={inputClass("email")}
                            />
                            {submitted && !formData.email && (
                                <p className="text-xs text-red-300">Email is required.</p>
                            )}
                        </label>

                        <label className="col-span-1 flex min-w-0 flex-col gap-2 md:col-span-2">
                            <span className="text-sm font-semibold text-white/85">Message</span>
                            <textarea
                                name="message"
                                rows={4}
                                placeholder="Tell us how we can help..."
                                value={formData.message}
                                onChange={handleChange}
                                className={`${inputClass("message")} resize-none`}
                            />
                            {submitted && !formData.message && (
                                <p className="text-xs text-red-300">Please enter a message.</p>
                            )}
                        </label>

                        <button
                            type="submit"
                            disabled={loading}
                            className="col-span-1 rounded-xl bg-[var(--brown-700)]
                            px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300
                            hover:bg-[var(--brown-700)]/85 disabled:cursor-not-allowed disabled:opacity-60
                            md:col-span-2 md:hover:-translate-y-0.5 md:hover:shadow-xl"
                        >
                            {loading ? "Sending..." : "Submit Message"}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}