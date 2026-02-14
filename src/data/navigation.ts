export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export const mainNavItems: NavItem[] = [
  { label: "Getting Started", href: "/getting-started" },
  {
    label: "Tools",
    href: "#",
    children: [
      { label: "Prompt Library", href: "/prompt-library" },
      { label: "ROI Calculator", href: "/roi-calculator" },
      { label: "Submit Project", href: "/submit-project" },
      { label: "Submit Prompt", href: "/submit-prompt" },
    ],
  },
  {
    label: "Learn",
    href: "#",
    children: [
      { label: "Best Practices", href: "/best-practices" },
      { label: "Ethics", href: "/ethics" },
      { label: "Governance", href: "/governance" },
    ],
  },
  { label: "Resources", href: "/resources" },
  { label: "FAQ", href: "/faq" },
  { label: "Events", href: "/events" },
];

export const footerNavItems = {
  about: [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "FAQ", href: "/faq" },
  ],
  tools: [
    { label: "Prompt Library", href: "/prompt-library" },
    { label: "ROI Calculator", href: "/roi-calculator" },
    { label: "Submit Project", href: "/submit-project" },
  ],
  resources: [
    { label: "Getting Started", href: "/getting-started" },
    { label: "Best Practices", href: "/best-practices" },
    { label: "Ethics", href: "/ethics" },
    { label: "Governance", href: "/governance" },
    { label: "Resources", href: "/resources" },
  ],
  community: [
    { label: "Events", href: "/events" },
    { label: "Submit Prompt", href: "/submit-prompt" },
  ],
};
