import { aboutContent } from "../../utils/footer-constants";

const sections = [
  { id: "ourStory", title: "Our Story" },
  { id: "ourMission", title: "Our Mission" },
  { id: "whatWeOffer", title: "What We Offer" },
  { id: "whyChooseDevTinder", title: "Why Choose Dev Tinder?" },
  { id: "ourValues", title: "Our Values" },
  { id: "ourVision", title: "Our Vision" },
  { id: "joinCommunity", title: "Join Our Community" },
];

export default function AboutUs() {
  return (
    <div className="bg-slate-950 text-white scroll-smooth">
      {/* Hero */}
      <section className="border-b border-slate-800 sticky top-15 bg-slate-950">
        <div className="mx-auto max-w-4xl px-5 py-10 text-center">
          <h1 className="text-5xl font-bold">About Dev Tinder</h1>

          <p className="mt-4 text-sm text-slate-400">
            Learn more about our mission, vision, and the community we're
            building for developers.
          </p>
        </div>
      </section>

      <div className="mx-auto flex max-w-7xl gap-10 px-6 py-12">
        {/* Table of Contents */}
        <aside className="sticky top-60 hidden h-fit w-72 lg:block">
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
            <h3 className="mb-4 text-lg font-semibold">Contents</h3>

            <nav>
              <ul className="space-y-2">
                {sections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="block rounded-md px-3 py-2 transition hover:bg-slate-800 hover:text-indigo-400"
                    >
                      {section.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="mx-auto w-full max-w-4xl">
          {sections.map((section, index) => (
            <section
              key={section.id}
              id={section.id}
              className="scroll-mt-28 mb-16"
            >
              <h2 className="mb-5 text-3xl font-bold">
                {index + 1}. {section.title}
              </h2>

              <div className="rounded-xl border border-slate-800 bg-slate-900 p-8 min-h-[180px]">
                {aboutContent[section.id]}
              </div>
            </section>
          ))}
        </main>
      </div>
    </div>
  );
}
