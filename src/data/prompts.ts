export interface PromptTemplate {
  id: number;
  title: string;
  category: string;
  description: string;
  template: string;
  tags: string[];
  featured?: boolean;
}

export const categories = [
  { id: "all", label: "All Prompts" },
  { id: "governmental", label: "Government Operations" },
  { id: "public-service", label: "Public Service" },
  { id: "compliance", label: "Compliance" },
  { id: "citizen-service", label: "Citizen Services" },
  { id: "hr", label: "Human Resources" },
  { id: "it", label: "IT & Data" },
  { id: "operations", label: "Operations" },
  { id: "document", label: "Document Writing" },
  { id: "universal", label: "Universal" },
  { id: "advanced", label: "Advanced" },
];

export const prompts: PromptTemplate[] = [
  {
    id: 1,
    title: "Public Meeting Minutes Summarizer",
    category: "governmental",
    description: "Create comprehensive, compliant meeting minutes from notes",
    template: `Please create formal meeting minutes from these notes:

Meeting: [Meeting name/type]
Date/Time: [Date and time]
Attendees: [List attendees and titles]
Meeting Notes: [Paste raw notes here]

Format the minutes to include:
1. Call to Order and Roll Call
2. Approval of Previous Minutes
3. Public Comment Period Summary
4. Action Items with Motion/Second/Vote
5. Discussion Items Summary
6. Department Reports
7. New Business
8. Next Meeting Date
9. Adjournment Time

Ensure compliance with:
- Open Meeting Law requirements
- ADA accessibility standards
- Clear action item tracking
- Professional government tone`,
    tags: ["meeting-minutes", "documentation", "compliance", "public-records"],
    featured: true,
  },
  {
    id: 2,
    title: "Public Records Request Response",
    category: "governmental",
    description: "Draft compliant responses to public records requests",
    template: `Help me draft a response to this public records request:

Request details: [Describe the request]
Responsive documents: [What we have/don't have]
Exemptions that may apply: [Any applicable exemptions]
Timeline: [Response deadline]

Create a response that:
1. Acknowledges receipt and request number
2. Lists responsive documents
3. Explains any exemptions clearly
4. Provides cost estimate if applicable
5. States timeline for fulfillment
6. Includes appeal rights
7. Maintains professional, transparent tone

Ensure compliance with state public records law.`,
    tags: ["public-records", "FOIA", "transparency", "compliance"],
  },
  {
    id: 3,
    title: "Policy Impact Analysis",
    category: "governmental",
    description: "Analyze proposed policy changes for government initiatives",
    template: `Analyze this proposed policy/regulation:

Policy/Regulation: [Describe the policy]
Current State: [Existing policy or situation]
Proposed Change: [What's being proposed]
Affected Population: [Who will be impacted]

Provide analysis including:
1. Executive Summary
2. Stakeholder Impact Assessment
3. Implementation Requirements
4. Timeline and Milestones
5. Risk Assessment
6. Success Metrics
7. Recommendation with Justification

Consider equity, accessibility, and fiscal impacts.`,
    tags: ["policy", "analysis", "impact-assessment", "planning"],
    featured: true,
  },
  {
    id: 4,
    title: "Grant Application Writer",
    category: "governmental",
    description: "Develop compelling grant applications for government funding",
    template: `Help write a grant application for:

Grant Program: [Name of grant]
Funding Amount Requested: [$]
Project Title: [Your project name]
Project Description: [Brief description]

Create application sections:
1. Executive Summary (250 words)
2. Statement of Need with data
3. Project Description with goals and timeline
4. Evaluation Plan with success metrics
5. Budget Justification
6. Organizational Capacity
7. Sustainability Plan

Emphasize public benefit and alignment with grant priorities.`,
    tags: ["grants", "funding", "proposals", "budget"],
  },
  {
    id: 5,
    title: "Regulatory Compliance Checker",
    category: "compliance",
    description: "Review documents for regulatory compliance",
    template: `Review this document/process for compliance:

Document/Process: [Describe what needs review]
Applicable Regulations: [List relevant laws/regulations]
Jurisdiction: [Federal/State/Local]
Department: [Which department]

Check for:
1. Regulatory Requirements Met/Not Met
2. Documentation Completeness
3. Required Approvals/Signatures
4. Timeline Compliance
5. Public Notice Requirements
6. Accessibility Standards

Provide a compliance checklist, gap analysis, and remediation recommendations.`,
    tags: ["compliance", "regulatory", "audit", "risk-management"],
  },
  {
    id: 6,
    title: "Emergency Response Coordinator",
    category: "governmental",
    description: "Create emergency response communications and plans",
    template: `Create emergency response materials for:

Emergency Type: [Natural disaster/Public health/Safety]
Severity Level: [Low/Medium/High/Critical]
Affected Area: [Geographic scope]
Population Impacted: [Estimated numbers]

Develop:
1. Initial Public Alert (clear danger statement, actions, resources)
2. Staff Communication Plan
3. Resource Deployment List
4. Media Talking Points
5. Social Media Updates
6. Follow-up Communications Schedule
7. Recovery Resources Information

Include multilingual considerations and ADA compliance.`,
    tags: ["emergency", "crisis-management", "public-safety", "communications"],
  },
  {
    id: 7,
    title: "Budget Justification Writer",
    category: "governmental",
    description: "Create detailed budget justifications for government programs",
    template: `Create a budget justification for:

Program/Project: [Name]
Total Budget Request: [$]
Fiscal Year: [Year]
Department: [Department name]

Include:
1. Executive Summary
2. Program Overview and Goals
3. Line-Item Budget Breakdown
4. Cost-Benefit Analysis
5. Staffing Requirements
6. Performance Metrics
7. Comparison to Previous Year
8. Alignment with County Priorities`,
    tags: ["budget", "finance", "justification", "planning"],
  },
  {
    id: 8,
    title: "Citizen Service Response Template",
    category: "citizen-service",
    description: "Craft professional responses to citizen inquiries and complaints",
    template: `Create a response to this citizen inquiry/complaint:

Nature of Contact: [Inquiry/Complaint/Request]
Topic: [Describe the issue]
Citizen's Concern: [Their specific question or concern]
Department: [Relevant department]
Available Resolution: [What we can offer]

Create a response that:
1. Acknowledges their concern
2. Explains relevant policies clearly
3. Provides next steps
4. Includes relevant resources
5. Offers alternative solutions if needed
6. Uses plain, accessible language
7. Includes contact for follow-up`,
    tags: ["citizen-service", "communications", "complaint-resolution"],
    featured: true,
  },
  {
    id: 9,
    title: "Community Outreach Plan",
    category: "public-service",
    description: "Develop comprehensive community engagement strategies",
    template: `Create a community outreach plan for:

Initiative: [What are you promoting/communicating]
Target Audience: [Demographics and communities]
Goals: [What you want to achieve]
Budget: [Available resources]
Timeline: [Campaign duration]

Develop:
1. Audience Analysis
2. Key Messages (plain language)
3. Channel Strategy (digital, print, in-person)
4. Multilingual Communication Plan
5. Accessibility Considerations
6. Event/Activity Calendar
7. Partner Organizations
8. Success Metrics
9. Feedback Collection Plan`,
    tags: ["outreach", "community", "engagement", "communications"],
  },
  {
    id: 10,
    title: "ADA Compliance Reviewer",
    category: "compliance",
    description: "Review content and processes for ADA accessibility",
    template: `Review this content/process for ADA compliance:

Content Type: [Document/Website/Event/Service]
Current State: [Describe what exists]
Intended Audience: [Who will use this]

Evaluate for:
1. Web Content Accessibility (WCAG 2.1 AA)
2. Document Accessibility
3. Plain Language Standards
4. Alternative Format Availability
5. Physical Accessibility (if applicable)
6. Communication Accessibility
7. Assistive Technology Compatibility

Provide specific recommendations for each area.`,
    tags: ["accessibility", "ADA", "compliance", "inclusion"],
  },
  {
    id: 11,
    title: "Privacy Impact Assessment",
    category: "compliance",
    description: "Conduct privacy assessments for data-handling processes",
    template: `Conduct a privacy impact assessment for:

System/Process: [Name and description]
Data Collected: [Types of personal data]
Data Sources: [Where data comes from]
Users/Stakeholders: [Who accesses the data]

Assess:
1. Data Collection Necessity
2. Data Minimization Compliance
3. Consent and Notice Requirements
4. Storage and Retention Policies
5. Access Controls
6. Sharing and Disclosure Practices
7. Security Measures
8. Individual Rights (access, correction, deletion)
9. Risk Mitigation Recommendations`,
    tags: ["privacy", "data-protection", "compliance", "assessment"],
  },
  {
    id: 12,
    title: "Performance Review Assistant",
    category: "hr",
    description: "Help write fair, constructive performance reviews",
    template: `Help write a performance review for:

Employee Role: [Job title/function]
Review Period: [Timeframe]
Key Accomplishments: [List achievements]
Areas for Growth: [Development needs]
Goals from Last Period: [Previous goals and status]

Create a review that:
1. Highlights specific achievements with examples
2. Provides constructive feedback for growth areas
3. Sets SMART goals for next period
4. Addresses professional development needs
5. Maintains objective, fair language
6. Aligns with department and county goals`,
    tags: ["hr", "performance", "evaluation", "management"],
  },
  {
    id: 13,
    title: "Data Analysis Summary",
    category: "it",
    description: "Summarize and present data analysis findings",
    template: `Help me summarize this data analysis:

Dataset Description: [What data was analyzed]
Analysis Method: [How it was analyzed]
Key Findings: [List major findings]
Audience: [Who will read this]
Purpose: [What decision will this inform]

Create a summary that includes:
1. Executive Overview (2-3 sentences)
2. Key Findings with visual descriptions
3. Trends and Patterns
4. Statistical Highlights
5. Limitations and Caveats
6. Recommendations
7. Next Steps

Use plain language and avoid technical jargon.`,
    tags: ["data", "analysis", "reporting", "visualization"],
  },
  {
    id: 14,
    title: "RFP/RFQ Response Writer",
    category: "document",
    description: "Draft responses to government procurement solicitations",
    template: `Help draft a response to this RFP/RFQ:

Solicitation: [RFP/RFQ number and title]
Issuing Agency: [Who issued it]
Key Requirements: [Core requirements]
Our Qualifications: [Relevant experience]
Budget Range: [If known]

Create response sections:
1. Cover Letter
2. Executive Summary
3. Technical Approach
4. Qualifications and Experience
5. Staffing Plan
6. Project Timeline
7. Cost Proposal Framework
8. References and Past Performance`,
    tags: ["procurement", "RFP", "proposals", "contracts"],
  },
  {
    id: 15,
    title: "Training Material Creator",
    category: "public-service",
    description: "Develop training materials for staff education",
    template: `Create training materials for:

Topic: [Training subject]
Audience: [Who will be trained]
Skill Level: [Beginner/Intermediate/Advanced]
Duration: [Length of training]
Format: [In-person/Virtual/Self-paced]

Develop:
1. Learning Objectives
2. Pre-Assessment Questions
3. Content Outline with Key Points
4. Interactive Exercises/Activities
5. Real-World Scenarios
6. Knowledge Check Questions
7. Resource List for Further Learning
8. Post-Training Evaluation Form`,
    tags: ["training", "education", "workforce-development"],
  },
  {
    id: 16,
    title: "Interdepartmental Communication",
    category: "operations",
    description: "Craft clear communications between departments",
    template: `Help write an interdepartmental communication:

From: [Your department]
To: [Target department(s)]
Purpose: [What you need]
Context: [Background information]
Urgency: [Timeline]

Create a communication that:
1. Clearly states the purpose
2. Provides necessary background
3. Specifies what you need from them
4. Proposes timeline
5. Identifies key contacts
6. Suggests next steps
7. Maintains collaborative tone`,
    tags: ["internal-communications", "collaboration", "operations"],
  },
  {
    id: 17,
    title: "Equity Impact Analyzer",
    category: "advanced",
    description: "Assess equity implications of policies and programs",
    template: `Conduct an equity impact analysis for:

Policy/Program: [Name and description]
Affected Communities: [Demographics]
Current State: [Existing disparities, if known]

Analyze through these lenses:
1. Racial Equity Impact
2. Socioeconomic Impact
3. Geographic Access (urban/rural)
4. Language Access
5. Disability Access
6. Age-Related Considerations
7. Gender and LGBTQ+ Impact

For each area provide:
- Potential positive impacts
- Potential negative impacts
- Mitigation strategies
- Data gaps to address
- Community engagement recommendations`,
    tags: ["equity", "DEI", "impact-assessment", "policy"],
    featured: true,
  },
  {
    id: 18,
    title: "Strategic Plan Developer",
    category: "advanced",
    description: "Create comprehensive strategic plans for departments",
    template: `Develop a strategic plan for:

Department/Program: [Name]
Planning Horizon: [e.g., 3-5 years]
Current Mission: [Existing mission statement]
Key Challenges: [Main issues to address]
Stakeholder Input: [Summary of stakeholder feedback]

Create:
1. Vision Statement
2. Mission Statement (refined)
3. Core Values
4. SWOT Analysis
5. Strategic Goals (3-5)
6. Objectives for Each Goal
7. Key Performance Indicators
8. Implementation Timeline
9. Resource Requirements
10. Monitoring and Evaluation Framework`,
    tags: ["strategic-planning", "leadership", "management", "goals"],
    featured: true,
  },
  {
    id: 19,
    title: "Crisis Communication Plan",
    category: "advanced",
    description: "Develop crisis communication strategies",
    template: `Create a crisis communication plan for:

Organization: [Department/Agency]
Crisis Scenario: [Type of crisis]
Stakeholders: [Key audiences]

Develop:
1. Crisis Assessment Framework
2. Communication Chain of Command
3. Initial Response Statement (within 1 hour)
4. Media Briefing Template
5. Internal Staff Communication
6. Social Media Response Plan
7. Constituent FAQ Document
8. Partner/Stakeholder Updates
9. De-escalation Communication
10. Post-Crisis Recovery Messaging

Ensure ADA compliance and multilingual access.`,
    tags: ["crisis", "communications", "media", "public-relations"],
  },
  {
    id: 20,
    title: "The Problem Solver",
    category: "universal",
    description: "Structured approach to solving any workplace problem",
    template: `Help me solve this problem:

Problem: [Describe the issue]
Context: [Relevant background]
Constraints: [Limitations, budget, timeline]
Stakeholders: [Who is affected]
Previous Attempts: [What's been tried]

Guide me through:
1. Problem Definition (clarify the real issue)
2. Root Cause Analysis
3. Option Generation (at least 3 approaches)
4. Pro/Con Analysis for Each Option
5. Recommended Solution with Rationale
6. Implementation Steps
7. Risk Mitigation
8. Success Metrics`,
    tags: ["problem-solving", "universal", "decision-making", "analysis"],
    featured: true,
  },
  {
    id: 21,
    title: "Email Drafter",
    category: "universal",
    description: "Draft professional emails for various situations",
    template: `Help me draft an email:

To: [Recipient role/relationship]
Purpose: [Why you're writing]
Tone: [Formal/Friendly/Urgent]
Key Points: [What you need to communicate]
Action Needed: [What you want them to do]

Draft an email that:
1. Has a clear, descriptive subject line
2. Gets to the point quickly
3. Includes all necessary context
4. Has a clear call to action
5. Is appropriately professional
6. Ends with next steps`,
    tags: ["email", "communications", "universal", "writing"],
  },
  {
    id: 22,
    title: "Permit Application Guide",
    category: "citizen-service",
    description: "Create clear permit application instructions for citizens",
    template: `Create a citizen-friendly guide for:

Permit Type: [Building/Business/Event/etc.]
Jurisdiction: [Which authority]
Common Applicant: [Typical applicant profile]

Include:
1. Plain-language overview
2. Eligibility requirements
3. Required documents checklist
4. Step-by-step application process
5. Fees and payment options
6. Processing timeline
7. Common reasons for denial
8. Appeal process
9. Contact information
10. Frequently asked questions

Use 6th-grade reading level. Include accessibility information.`,
    tags: ["permits", "citizen-service", "guides", "accessibility"],
    featured: true,
  },
  {
    id: 23,
    title: "Report Executive Summary",
    category: "document",
    description: "Create concise executive summaries from detailed reports",
    template: `Create an executive summary from this report:

Report Title: [Title]
Full Report: [Paste key sections or entire report]
Audience: [Who will read the summary]
Key Decision: [What decision does this inform]

Create a summary that:
1. Is no longer than 1 page
2. Highlights the most important findings
3. Includes key data points and metrics
4. States clear recommendations
5. Notes any urgent items
6. Uses bullet points for readability
7. Avoids jargon and technical language`,
    tags: ["executive-summary", "reporting", "writing", "documentation"],
  },
  {
    id: 24,
    title: "Public Health Communication",
    category: "public-service",
    description: "Create health-related public communications",
    template: `Create a public health communication about:

Health Topic: [Issue/campaign]
Target Audience: [Community segment]
Key Message: [Main point to convey]
Action Desired: [What people should do]
Distribution Channels: [How this will be shared]

Develop:
1. Headline that captures attention
2. Key facts (verified, sourced)
3. Clear call to action
4. Resource links and phone numbers
5. Multilingual considerations
6. Accessibility formatting
7. Social media versions
8. Print-ready version`,
    tags: ["public-health", "communications", "outreach", "community"],
  },
  {
    id: 25,
    title: "Process Improvement Analysis",
    category: "operations",
    description: "Analyze and improve government workflows",
    template: `Analyze this process for improvement:

Process Name: [Name]
Current Steps: [Describe current workflow]
Pain Points: [Known issues]
Volume: [How often this process runs]
Stakeholders: [Who is involved]

Provide:
1. Current State Analysis
2. Bottleneck Identification
3. Waste/Redundancy Assessment
4. Improvement Recommendations
5. Estimated Time/Cost Savings
6. Implementation Priority Matrix
7. Change Management Considerations
8. Success Metrics`,
    tags: ["process-improvement", "efficiency", "operations", "lean"],
  },
];
