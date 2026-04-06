"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FiShield,
  FiCalendar,
  FiChevronDown,
  FiChevronUp,
  FiPrinter,
  FiExternalLink,
  FiMapPin,
  FiUser,
  FiLock,
  FiEye,
  FiTrash2,
  FiMail,
} from "react-icons/fi";

interface Section {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  content: string[];
}

const LAST_UPDATED = "April 5, 2026";
const VERSION = "2.1.0";

interface Highlight {
  icon: React.ComponentType<{ className?: string }>;
  bg: string;
  iconColor: string;
  border: string;
  title: string;
  desc: string;
}

const highlights: Highlight[] = [
  {
    icon: FiMapPin,
    bg: "bg-blue-50",
    iconColor: "text-blue-600",
    border: "border-blue-200",
    title: "Location Data",
    desc: "Used only to show nearby crew members. Never sold.",
  },
  {
    icon: FiUser,
    bg: "bg-purple-50",
    iconColor: "text-purple-600",
    border: "border-purple-200",
    title: "Profile Info",
    desc: "Stored securely. Visible only to matched users.",
  },
  {
    icon: FiLock,
    bg: "bg-green-50",
    iconColor: "text-green-600",
    border: "border-green-200",
    title: "Data Security",
    desc: "End-to-end encryption for all messages.",
  },
  {
    icon: FiTrash2,
    bg: "bg-red-50",
    iconColor: "text-red-600",
    border: "border-red-200",
    title: "Your Rights",
    desc: "Delete your account and all data at any time.",
  },
];

const sections: Section[] = [
  {
    id: "introduction",
    title: "1. Introduction",
    icon: FiShield,
    content: [
      'Crew Social, Inc. ("Crew", "we", "us", or "our") is committed to protecting your personal information and your right to privacy. This Privacy Policy describes how we collect, use, store, and share information about you when you use our Crew Social mobile application ("App") and related services.',
      "By using the App, you agree to the collection and use of information in accordance with this Privacy Policy. This policy applies to all users of the Crew App globally, subject to applicable local law.",
    ],
  },
  {
    id: "information-collected",
    title: "2. Information We Collect",
    icon: FiEye,
    content: [
      "We collect information you provide directly to us, including: (a) Account Information -- your phone number, display name, profile photo, date of birth, and bio when you register or update your profile; (b) Profile Preferences -- your selected vibes, scenes, hobbies, and interests; (c) User Content -- photos, messages, and other content you post or share through the App; (d) Communications -- messages and other communications you send to other users or to Crew support.",
      "We automatically collect certain information when you use the App, including: (a) Device Information -- hardware model, operating system version, unique device identifiers, and mobile network information; (b) Location Data -- precise GPS location (with your permission) to enable nearby discovery features; (c) Usage Data -- how you interact with the App, including features used, pages viewed, and time spent; (d) Log Data -- IP address, browser type (if using web), crash reports, and performance data.",
      "With your permission, we may access your device's camera, photo library, microphone, and contacts solely to enable specific App features. We do not access these unless you explicitly grant permission.",
    ],
  },
  {
    id: "how-we-use",
    title: "3. How We Use Your Information",
    icon: FiUser,
    content: [
      "We use the information we collect to: (a) provide, maintain, and improve the App and its features; (b) match you with nearby users and crews based on your location and preferences; (c) personalize your experience and the content you see; (d) process account registration and authentication via phone number verification; (e) facilitate communication between users through our in-app messaging system.",
      "We also use your information to: (a) send you notifications about app activity, new matches, and messages (with your permission); (b) monitor and analyze usage patterns to improve app performance; (c) detect, investigate, and prevent fraudulent activity and violations of our Terms; (d) comply with legal obligations; (e) respond to your support requests.",
      "We do not use your data for automated decision-making or profiling that produces legal or similarly significant effects without your explicit consent.",
    ],
  },
  {
    id: "location-data",
    title: "4. Location Data",
    icon: FiMapPin,
    content: [
      "Location data is central to the Crew Social experience. When you grant location permission, we collect your precise GPS coordinates to show you nearby users, crews, scenes, and events. Location data is used in real-time and is not stored on our servers beyond what is necessary to provide the service.",
      'You have full control over your location sharing: (a) You may set your location visibility to "Everyone", "Matches Only", or "Nobody" from within the App settings; (b) You may enable or disable location services for the App through your device\'s system settings; (c) Disabling location access will limit discovery features but will not affect your ability to use messaging and other features.',
      "We never sell your precise location data to third parties. We may use aggregated, anonymized location insights (e.g., popular areas within a city) to improve the App and for internal analytics. These aggregated insights cannot be used to identify individual users.",
    ],
  },
  {
    id: "information-sharing",
    title: "5. Sharing Your Information",
    icon: FiEye,
    content: [
      "We do not sell your personal information. We may share your information in the following limited circumstances:",
      "(a) With Other Users -- your public profile information (name, photo, bio, vibes, scenes, hobbies) is visible to other users as part of the App's core functionality. Your precise location is only shown to users you match with, and only if you have enabled location sharing. (b) With Service Providers -- we share information with trusted third-party vendors who assist us in operating the App, subject to strict confidentiality agreements. These providers include cloud hosting services, push notification providers, analytics tools, and customer support platforms.",
      "(c) For Legal Compliance -- we may disclose your information if required by law, regulation, legal process, or governmental request, or to protect the rights, property, or safety of Crew, our users, or the public. (d) Business Transfers -- in the event of a merger, acquisition, or sale of all or a portion of our assets, your information may be transferred as part of that transaction. We will notify you via email or App notification of any such change.",
    ],
  },
  {
    id: "data-retention",
    title: "6. Data Retention",
    icon: FiLock,
    content: [
      "We retain your personal information for as long as your account is active or as needed to provide you services. You may request deletion of your account at any time through the App's settings. Upon account deletion, we will delete or anonymize your personal information within 30 days, except where we are required to retain it for legitimate legal or business purposes.",
      "Some residual information may remain in our backup systems for up to 90 days after deletion. Message content exchanged between users is deleted from our servers when both parties delete the conversation or when an account is deleted.",
      "Aggregated and anonymized data derived from your usage may be retained indefinitely as it cannot be used to identify you.",
    ],
  },
  {
    id: "your-rights",
    title: "7. Your Rights & Choices",
    icon: FiUser,
    content: [
      "Depending on your jurisdiction, you may have the following rights regarding your personal information: (a) Access -- request a copy of the personal data we hold about you; (b) Rectification -- request correction of inaccurate or incomplete data; (c) Erasure -- request deletion of your personal data ('right to be forgotten'); (d) Portability -- request a machine-readable copy of your data to transfer to another service; (e) Restriction -- request that we restrict processing of your data under certain circumstances; (f) Objection -- object to processing of your data for certain purposes.",
      "To exercise any of these rights, please contact us at privacy@crewsocial.app. We will respond to your request within 30 days. We may need to verify your identity before processing your request.",
      "You may also: (a) update your profile and notification preferences within the App settings; (b) opt out of marketing communications at any time; (c) withdraw consent for location access through your device settings.",
    ],
  },
  {
    id: "data-security",
    title: "8. Data Security",
    icon: FiLock,
    content: [
      "We implement industry-standard security measures to protect your personal information, including: (a) end-to-end encryption for all messages exchanged between users; (b) TLS/SSL encryption for all data transmitted between the App and our servers; (c) AES-256 encryption for data stored at rest; (d) regular security audits and penetration testing; (e) access controls that limit employee access to your data on a need-to-know basis.",
      "While we strive to protect your personal information, no method of transmission over the internet or electronic storage is 100% secure. We cannot guarantee absolute security. In the event of a data breach that affects your rights and freedoms, we will notify you and relevant authorities as required by applicable law.",
    ],
  },
  {
    id: "children",
    title: "9. Children's Privacy",
    icon: FiUser,
    content: [
      "The Crew App is intended for users who are 18 years of age or older. We do not knowingly collect personal information from anyone under the age of 18. If you are a parent or guardian and believe your child under 18 has provided us with personal information, please contact us immediately at privacy@crewsocial.app.",
      "If we become aware that we have collected personal information from a person under 18, we will take steps to delete such information promptly.",
    ],
  },
  {
    id: "third-party",
    title: "10. Third-Party Links & Services",
    icon: FiExternalLink,
    content: [
      "The App may contain links to third-party websites or services. This Privacy Policy does not apply to those third-party services. We encourage you to review the privacy policies of any third-party services you access through the App.",
      "We integrate with the following categories of third-party services: (a) Analytics -- to understand App usage patterns; (b) Push Notifications -- to deliver timely alerts; (c) Cloud Infrastructure -- to host and store App data securely; (d) Maps -- to provide location-based discovery features.",
    ],
  },
  {
    id: "changes",
    title: "11. Changes to This Policy",
    icon: FiCalendar,
    content: [
      "We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new Privacy Policy on this page with an updated effective date, and by sending you an in-app notification or email.",
      "We encourage you to review this Privacy Policy periodically. Your continued use of the App after any changes constitutes your acceptance of the updated Privacy Policy.",
    ],
  },
  {
    id: "contact",
    title: "12. Contact Us",
    icon: FiMail,
    content: [
      "If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:",
      "Crew Social, Inc.\nPrivacy Team: privacy@crewsocial.app\nGeneral Support: support@crewsocial.app\nWebsite: https://crewsocial.app\nData Protection Officer: dpo@crewsocial.app",
    ],
  },
];

interface AccordionSectionProps {
  section: Section;
  index: number;
}

function AccordionSection({ section, index }: AccordionSectionProps) {
  const [isOpen, setIsOpen] = useState(index < 3);
  const Icon = section.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors duration-150"
      >
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 bg-purple-50 rounded-lg flex items-center justify-center flex-shrink-0">
            <Icon className="w-4 h-4 text-purple-600" />
          </div>
          <h3 className="text-base font-semibold text-gray-900">{section.title}</h3>
        </div>
        {isOpen ? (
          <FiChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0 ml-4" />
        ) : (
          <FiChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0 ml-4" />
        )}
      </button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.2 }}
          className="px-6 pb-5 border-t border-gray-100"
        >
          <div className="pt-4 space-y-3">
            {section.content.map((paragraph, i) => (
              <p
                key={i}
                className="text-sm text-gray-600 leading-relaxed whitespace-pre-line"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

export default function PrivacyPage() {
  const handlePrint = () => window.print();

  return (
    <div className="space-y-6 print:space-y-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <FiShield className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Privacy Policy</h1>
            <p className="text-sm text-gray-500">
              How Crew Social collects, uses, and protects your data
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/terms"
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-purple-600 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors duration-150 border border-purple-200"
          >
            <FiExternalLink className="w-4 h-4" />
            Terms &amp; Conditions
          </a>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-600 bg-white hover:bg-gray-50 rounded-lg transition-colors duration-150 border border-gray-200 print:hidden"
          >
            <FiPrinter className="w-4 h-4" />
            Print
          </button>
        </div>
      </motion.div>

      {/* Meta Info Banner */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="bg-purple-50 border border-purple-200 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center gap-4"
      >
        <div className="flex items-center gap-3 flex-1">
          <div className="w-9 h-9 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <FiCalendar className="w-4 h-4 text-purple-600" />
          </div>
          <div>
            <p className="text-sm font-semibold text-purple-900">
              Last Updated: {LAST_UPDATED}
            </p>
            <p className="text-xs text-purple-600">Document Version {VERSION}</p>
          </div>
        </div>
        <div className="bg-white border border-purple-200 rounded-lg px-4 py-2 text-sm text-purple-800 leading-relaxed max-w-lg">
          We take your privacy seriously. This policy explains exactly what data we collect
          and how we use it to provide the Crew Social experience.
        </div>
      </motion.div>

      {/* Highlights */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {highlights.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + i * 0.06 }}
              className={`bg-white rounded-xl border p-4 flex items-start gap-3 ${item.border}`}
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${item.bg}`}
              >
                <Icon className={`w-4 h-4 ${item.iconColor}`} />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">{item.title}</p>
                <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Table of Contents */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="bg-white rounded-xl border border-gray-100 shadow-sm p-5"
      >
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
          Table of Contents
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="text-sm text-purple-600 hover:text-purple-800 hover:underline truncate transition-colors duration-150"
            >
              {section.title}
            </a>
          ))}
        </div>
      </motion.div>

      {/* Sections */}
      <div className="space-y-3">
        {sections.map((section, index) => (
          <div id={section.id} key={section.id}>
            <AccordionSection section={section} index={index} />
          </div>
        ))}
      </div>
    </div>
  );
}
