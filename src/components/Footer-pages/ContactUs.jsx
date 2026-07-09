export default function ContactUs() {
  return (
    <div className="min-h-screen bg-base-300 text-white">
      {/* Hero */}
      <section className="border-b border-slate-800">
        <div className="mx-auto max-w-5xl px-6 py-10 text-center">
          <h1 className="text-5xl font-bold">Contact Us</h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-400">
            Have a question, feedback, or need assistance? We'd love to hear
            from you. Reach out using any of the contact options below.
          </p>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Support */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-indigo-600/20">
              💬
            </div>

            <h2 className="text-xl font-semibold">General Queries</h2>

            <p className="mt-3 text-slate-400">
              For any questions, suggestions, or feedback regarding Dev Tinder,
              feel free to get in touch with us.
            </p>
          </div>

          {/* Email */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-indigo-600/20">
              📧
            </div>

            <h2 className="text-xl font-semibold">Email Us</h2>

            <a
              href="mailto:support@dev-tinder.com"
              className="mt-3 block text-lg font-medium text-indigo-400 hover:underline"
            >
              support@dev-tinder.com
            </a>

            <p className="mt-2 text-slate-400">
              We'll do our best to respond as soon as possible.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
