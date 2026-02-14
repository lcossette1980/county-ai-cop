export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export const faqData: FAQItem[] = [
  {
    category: "General",
    question: "What is the AI Community of Practice?",
    answer: "The AI Community of Practice (AI CoP) is a collaborative group dedicated to helping county government employees understand, adopt, and responsibly use AI technology. We provide resources, training, tools, and governance frameworks to support AI initiatives across departments.",
  },
  {
    category: "General",
    question: "Who can participate in the AI CoP?",
    answer: "All county government employees are welcome to participate. Whether you're a complete beginner or an experienced technologist, there's something here for you. We offer resources at every skill level.",
  },
  {
    category: "General",
    question: "What AI tools are approved for use?",
    answer: "Approved tools vary by county and department. Check with your IT department for the specific list of sanctioned AI tools. Common approved tools include enterprise versions of ChatGPT, Microsoft Copilot, and Google Gemini. Our governance page has more details on the approval process.",
  },
  {
    category: "Getting Started",
    question: "I'm new to AI. Where should I start?",
    answer: "Start with our Getting Started guide, which covers AI basics in plain language. Then explore the Prompt Library for ready-to-use templates. We also recommend attending our office hours for hands-on guidance.",
  },
  {
    category: "Getting Started",
    question: "Do I need technical skills to use AI?",
    answer: "No. Modern AI tools are designed to be conversational and user-friendly. If you can write an email, you can use AI. Our resources focus on practical skills, not technical jargon.",
  },
  {
    category: "Getting Started",
    question: "How can AI help with my specific job?",
    answer: "AI can assist with tasks like drafting documents, summarizing reports, analyzing data, creating presentations, translating content, and brainstorming solutions. Visit our Prompt Library for examples organized by department and function.",
  },
  {
    category: "Security & Privacy",
    question: "Can I put confidential data into AI tools?",
    answer: "No. Never enter personally identifiable information (PII), confidential records, or sensitive data into AI tools unless specifically approved for that purpose with appropriate security controls. Always follow your county's data classification policies.",
  },
  {
    category: "Security & Privacy",
    question: "Is AI-generated content secure?",
    answer: "AI-generated content itself is not inherently secure or insecure. However, you should treat AI outputs as drafts that require review. Be cautious about AI generating content that could inadvertently reveal sensitive information patterns.",
  },
  {
    category: "Security & Privacy",
    question: "What data does AI retain from my prompts?",
    answer: "This depends on the specific tool and license. Enterprise versions of AI tools typically offer data protection agreements. Consumer versions may use your inputs for training. Always use the enterprise/government version of approved tools.",
  },
  {
    category: "Governance",
    question: "Do I need approval to use AI at work?",
    answer: "Basic AI use for personal productivity (like drafting emails or brainstorming) is generally allowed with approved tools. However, AI projects that involve department data, public-facing applications, or automated decision-making require formal approval through our governance process.",
  },
  {
    category: "Governance",
    question: "How long does the approval process take?",
    answer: "Timelines vary by project complexity and risk level. Low-risk projects may be approved in 1-2 weeks. Medium-risk projects typically take 3-4 weeks. High-risk projects requiring comprehensive review may take 6-8 weeks.",
  },
  {
    category: "Governance",
    question: "What happens if I use AI without approval?",
    answer: "Using unapproved AI tools or bypassing governance processes may violate county policy and could create security, privacy, or legal risks. If you're unsure whether something needs approval, contact us — we're here to help, not to police.",
  },
  {
    category: "Ethics",
    question: "How do we prevent AI bias in government services?",
    answer: "We use a multi-layered approach including diverse training data review, regular bias audits, human oversight for high-impact decisions, community feedback mechanisms, and mandatory equity impact assessments for AI systems affecting constituents.",
  },
  {
    category: "Ethics",
    question: "Should I disclose when I use AI?",
    answer: "Yes, transparency is a core principle. For internal work, let colleagues know when AI significantly contributed to a deliverable. For public-facing content, follow your county's disclosure requirements. Our ethics framework provides specific guidance.",
  },
];
