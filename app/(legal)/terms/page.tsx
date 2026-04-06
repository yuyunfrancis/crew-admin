"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FiFileText,
  FiCalendar,
  FiChevronDown,
  FiChevronUp,
  FiPrinter,
  FiExternalLink,
} from "react-icons/fi";
import type { Metadata } from "next";

interface Section {
  id: string;
  title: string;
  content: string[];
}

const LAST_UPDATED = "April 5, 2026";
const VERSION = "2.1.0";

const sections: Section[] = [
  {
    id: "acceptance",
    title: "1. Acceptance of Terms",
    content: [
      'By downloading, installing, or using the Crew Social application ("App"), you agree to be bound by these Terms and Conditions ("Terms"). If you do not agree to these Terms, please do not use the App.',
      'These Terms constitute a legally binding agreement between you and Crew Social, Inc. ("Crew", "we", "us", or "our"). We reserve the right to modify these Terms at any time. Continued use of the App after changes constitutes acceptance of the updated Terms.',
    ],
  },
  {
    id: "eligibility",
    title: "2. Eligibility & Account Registration",
    content: [
      "You must be at least 18 years of age to use the Crew App. By using the App, you represent and warrant that you meet this age requirement.",
      "To access certain features, you must register for an account using a valid phone number. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.",
      "You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete. Crew reserves the right to suspend or terminate your account if any information is found to be inaccurate or incomplete.",
    ],
  },
  {
    id: "user-conduct",
    title: "3. User Conduct & Prohibited Activities",
    content: [
      "You agree to use the Crew App only for lawful purposes and in a manner that does not infringe the rights of, restrict, or inhibit anyone else's use and enjoyment of the App.",
      "You are prohibited from: (a) posting or transmitting any content that is unlawful, harmful, threatening, abusive, harassing, defamatory, vulgar, obscene, or otherwise objectionable; (b) impersonating any person or entity; (c) engaging in any form of harassment or stalking; (d) using the App to facilitate illegal activities; (e) attempting to gain unauthorized access to any part of the App or its related systems; (f) using automated tools, bots, or scrapers to access the App.",
      "Violation of these conduct rules may result in immediate account suspension or termination, at our sole discretion.",
    ],
  },
  {
    id: "location",
    title: "4. Location Data & Services",
    content: [
      "The Crew App is a location-based social discovery platform. To use core features of the App, you must grant permission to access your device's location services. Your location data is used to show you nearby users, crews, and events.",
      "You may adjust your location sharing settings at any time through the App's settings or your device's privacy settings. Disabling location services may limit your ability to use certain features of the App.",
      "We retain location data only as long as necessary to provide our services. We do not sell your precise location data to third parties. Aggregated and anonymized location data may be used for analytics purposes to improve the App.",
    ],
  },
  {
    id: "user-content",
    title: "5. User Content & Intellectual Property",
    content: [
      'You retain ownership of any content you submit, post, or display on or through the Crew App ("User Content"). By submitting User Content, you grant Crew a worldwide, non-exclusive, royalty-free, sublicensable, and transferable license to use, reproduce, distribute, prepare derivative works of, display, and perform the User Content in connection with the App and Crew\'s business.',
      "You represent and warrant that: (a) you own or have the necessary licenses, rights, consents, and permissions to submit the User Content; (b) the User Content does not violate any third-party rights; (c) the User Content complies with these Terms and all applicable laws.",
      "Crew's trademarks, logos, and service marks displayed on the App are the property of Crew Social, Inc. You are not permitted to use these marks without our prior written consent.",
    ],
  },
  {
    id: "privacy",
    title: "6. Privacy",
    content: [
      "Your privacy is important to us. Our Privacy Policy, which is incorporated into these Terms by reference, explains how we collect, use, and share information about you when you use our App.",
      "By using the App, you consent to the collection and use of your information as described in our Privacy Policy. Please review our Privacy Policy carefully before using the App.",
    ],
  },
  {
    id: "disclaimers",
    title: "7. Disclaimers & Warranties",
    content: [
      'THE CREW APP IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.',
      "Crew does not warrant that: (a) the App will be uninterrupted or error-free; (b) defects will be corrected; (c) the App or the servers that make it available are free of viruses or other harmful components; (d) the results of using the App will meet your requirements.",
      "Some jurisdictions do not allow the exclusion of certain warranties, so some of the above exclusions may not apply to you.",
    ],
  },
  {
    id: "liability",
    title: "8. Limitation of Liability",
    content: [
      "TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, CREW SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES.",
      "IN NO EVENT SHALL CREW'S TOTAL LIABILITY TO YOU EXCEED THE GREATER OF: (A) THE AMOUNT YOU HAVE PAID TO CREW IN THE PAST TWELVE MONTHS; OR (B) ONE HUNDRED US DOLLARS ($100).",
    ],
  },
  {
    id: "termination",
    title: "9. Termination",
    content: [
      "We reserve the right to suspend or terminate your access to the Crew App at any time, with or without cause, and with or without notice. Grounds for termination include, but are not limited to, violation of these Terms, fraudulent or illegal activity, or at our sole discretion.",
      "Upon termination, your right to use the App will immediately cease. Sections of these Terms that by their nature should survive termination shall survive, including ownership provisions, warranty disclaimers, indemnity, and limitations of liability.",
    ],
  },
  {
    id: "governing-law",
    title: "10. Governing Law & Dispute Resolution",
    content: [
      "These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which Crew Social, Inc. is incorporated, without regard to its conflict of law provisions.",
      "Any disputes arising from or relating to these Terms or the App shall first be attempted to be resolved through good-faith negotiation. If negotiation fails, disputes shall be resolved through binding arbitration, except where prohibited by law.",
    ],
  },
  {
    id: "changes",
    title: "11. Changes to Terms",
    content: [
      "We reserve the right to modify these Terms at any time. We will notify users of material changes through the App or by email. Your continued use of the App after such notification constitutes your acceptance of the updated Terms.",
      "We encourage you to review these Terms periodically to stay informed of any changes.",
    ],
  },
  {
    id: "contact",
    title: "12. Contact Information",
    content: [
      "If you have any questions about these Terms and Conditions, please contact us at:",
      "Crew Social, Inc.\nEmail: legal@crewsocial.app\nWebsite: https://crewsocial.app\nSupport: https://support.crewsocial.app",
    ],
  },
];

interface AccordionSectionProps {
  section: Section;
  index: number;
}

function AccordionSection({ section, index }: AccordionSectionProps) {
  const [isOpen, setIsOpen] = useState(index < 3);

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
        <h3 className="text-base font-semibold text-gray-900">{section.title}</h3>
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

export default function TermsPage() {
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
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <FiFileText className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Terms &amp; Conditions</h1>
            <p className="text-sm text-gray-500">Crew Social legal agreement for users</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/privacy"
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors duration-150 border border-blue-200"
          >
            <FiExternalLink className="w-4 h-4" />
            Privacy Policy
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
        className="bg-blue-50 border border-blue-200 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center gap-4"
      >
        <div className="flex items-center gap-3 flex-1">
          <div className="w-9 h-9 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <FiCalendar className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-semibold text-blue-900">Last Updated: {LAST_UPDATED}</p>
            <p className="text-xs text-blue-600">Document Version {VERSION}</p>
          </div>
        </div>
        <div className="bg-white border border-blue-200 rounded-lg px-4 py-2 text-sm text-blue-800 leading-relaxed max-w-lg">
          Please read these terms carefully before using the Crew Social App. By using the App,
          you agree to be bound by these Terms and Conditions.
        </div>
      </motion.div>

      {/* Table of Contents */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
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
              className="text-sm text-blue-600 hover:text-blue-800 hover:underline truncate transition-colors duration-150"
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
