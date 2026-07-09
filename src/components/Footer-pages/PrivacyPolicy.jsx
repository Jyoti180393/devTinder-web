import { privacyContent } from "../../utils/footer-constants";

const sections = [
  { id: "introduction", title: "Introduction" },
  { id: "whoWeAre", title: "Who We Are" },
  { id: "informationWeCollect", title: "Information We Collect" },
  { id: "howWeUseInformation", title: "How We Use Your Information" },
  { id: "developerDiscovery", title: "Developer Discovery & Matching" },
  { id: "connectionRequests", title: "Connection Requests" },
  { id: "messaging", title: "Messaging" },
  { id: "premiumMembership", title: "Premium Membership" },
  { id: "payments", title: "Payments" },
  { id: "sharingInformation", title: "How We Share Information" },
  { id: "thirdPartyServices", title: "Third-Party Services" },
  { id: "dataSecurity", title: "Data Security" },
  { id: "dataRetention", title: "Data Retention" },
  { id: "rightsAndChoices", title: "Your Rights & Choices" },
  { id: "accountDeletion", title: "Account Deletion" },
  { id: "childrenPrivacy", title: "Children's Privacy" },
  { id: "policyChanges", title: "Changes to This Privacy Policy" },
];

export default function PrivacyPolicy() {
  return (
    <div className="bg-base-300 overflow-auto h-auto text-white">
      {/* Hero */}
      <div className="border-b bg-base-300">
        <div className="mx-auto max-w-4xl px-6 py-6 text-center">
          <h1 className="text-5xl font-bold">Privacy Policy</h1>

          <p className="mt-4 text-sm ">Last Updated: July 9, 2026</p>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 ">
            Your privacy matters to us. This Privacy Policy explains how Dev
            Tinder collects, uses, stores, and protects your information while
            you use our developer networking platform.
          </p>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl gap-10 px-6 py-12">
        {/* Sidebar */}
        <aside className="sticky top-24 hidden h-fit w-72 lg:block">
          <div className="rounded-xl border bg-base-300 p-5 shadow-sm">
            <h3 className="mb-4 font-semibold">Contents</h3>

            <nav>
              <ul className="space-y-2">
                {sections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="block rounded-md px-3 py-2 text-xl transition hover:bg-indigo-50 hover:text-indigo-600"
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

              <div className="rounded-xl border bg-base-300 p-8 shadow-sm">
                {privacyContent[section.id]}
              </div>
            </section>
          ))}
        </main>
      </div>
    </div>
  );
}
