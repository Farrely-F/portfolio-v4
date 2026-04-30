import { ResumeData } from "@/types/resume"

export const resumeData: ResumeData = {
  name: "Farrely Firenza",
  title: "Front-End Engineer",
  location: "Tangerang, Banten",
  email: "farrely.firenza@outlook.com",
  website: "https://site.xfarr.dev",
  linkedin: "linkedin.com/in/farrelyf",
  github: "github.com/Farrely-F",
  phone: "0877 7492 3830",
  about:
    "Front-End Engineer with 3+ years of experience building scalable, high-performance web applications using Next.js, TypeScript, and Tailwind CSS. Skilled in integrating blockchain, AI, and payment systems. Proven track record in delivering user-focused solutions, from ideation to deployment.",
  experience: [
    {
      role: "Front End Engineer",
      company: "SLTR Group",
      period: "Sept 2023 – Present",
      bullets: [
        "Delivering unwavering support to the company and its numerous departments, which are in constant pursuit of innovative, tech-driven solutions, fulfilling the critical demands that arise within the realm of front-end engineering.",
        "Engage in dynamic collaboration with fellow engineering experts and the quality assurance team to craft unparalleled user experiences that captivate and delight the end-user.",
        "Produce code that is not only maintainable and scalable but also exemplarily clean, by harnessing the most cutting-edge best practices. This is achieved through rigorous peer code reviews and meticulous preparation of comprehensive code documentation.",
      ],
    },
  ],
  projects: [
    {
      name: "Relynk",
      period: "Aug 2025",
      description:
        "Borderless crypto payment for content creators with full ownership.",
      bullets: [
        "Integrated with LISK, Scroll, and Morph (currently in testnet).",
      ],
      tools: [
        "Xellar Wallet",
        "Wagmi",
        "Next.js",
        "Tailwind CSS",
        "GraphQL",
        "Pinata IPFS",
      ],
      categories: ["Finance", "Crypto", "Web3", "Blockchain"],
    },
    {
      name: "Chatto",
      period: "Aug 2025",
      description:
        "Create, train, and manage AI agent seamlessly.",
      bullets: [
        "Integrate with payment and AI agent microservices.",
      ],
      tools: [
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "PostgreSQL",
        "AI SDK (Vercel)",
        "Docker",
        "LangChain",
      ],
      categories: ["AI Agent", "LLM", "Dashboard", "SaaS"],
    },
    {
      name: "Horus Partner Dashboard",
      period: "Oct 2024",
      description:
        "Connect and onboard partner for HORUS payment gateway through partner dashboard.",
      bullets: [
        "Seamless, secure, intuitive UI for partner to onboard and get used.",
      ],
      tools: ["Next.js", "TypeScript", "Tailwind CSS"],
      categories: ["Finance", "Payment Gateway", "SaaS"],
    },
    {
      name: "INSTN.ID",
      period: "Mar 2024",
      description:
        "Multi-tenancy commerce app for merchant to sell digital product such as mobile credit, internet credit, and game voucher.",
      bullets: [
        "Integrate with company payment gateway HORUS for seamless transaction.",
      ],
      tools: ["Next.js", "TypeScript", "Tailwind CSS"],
      categories: ["E-Commerce", "Multi-tenancy"],
    },
    {
      name: "Gamefinity",
      period: "Dec 2023 – Feb 2024",
      description:
        "Gaming and entertainment media editorial.",
      bullets: [
        "Integrate with WordPress as a headless CMS to write and store content then consumed by the front end.",
      ],
      tools: ["Next.js", "TypeScript", "Tailwind CSS", "WordPress"],
      categories: ["Editorial", "Article", "Entertainment", "Lifestyle"],
    },
  ],
  awards: [
    {
      title: "Finalist of LISK Builders Challenge SEA Round 2",
      period: "Aug 2025",
      bullets: [
        "Build rely.ink, Web3 platform for creators to sell, share, and get paid with full ownership.",
        "Selected among the top 14% of 72 submissions.",
      ],
      tools: [
        "Xellar Wallet",
        "Wagmi",
        "Next.js",
        "Tailwind CSS",
        "GraphQL",
        "Pinata IPFS",
      ],
    },
    {
      title: "Best Project 3 of Kelas Rutin by Blockdev.id",
      period: "Jul 2025",
      bullets: [
        "Develop LiquidArena, a gamified DeFi PvP battle arena where users stake their LP token based on price range and gain duel.",
      ],
      tools: [
        "Solidity",
        "Hardhat",
        "Foundry",
        "Next.js",
        "React",
        "GraphQL",
        "MetaMask Wallet",
      ],
    },
  ],
  coursework: [
    {
      title: "Kelas Rutin",
      organization: "Blockdev.id",
      period: "Jun 2025 – Jul 2025",
      bullets: [
        "Blockchain fundamentals and smart contract development.",
        "Front end integration with the smart contract and blockchain.",
      ],
      tools: [
        "Solidity",
        "Hardhat",
        "Foundry",
        "Next.js",
        "React",
        "GraphQL",
        "MetaMask Wallet",
      ],
    },
    {
      title: "Scalable Web Service with Golang",
      organization: "Hacktiv8 x Digitalent KOMINFO",
      period: "Mar 2024 – Apr 2024",
      bullets: [
        "Go language fundamentals and its framework Gin.",
        "REST API development with Go and GORM.",
      ],
      tools: ["Go", "Gin", "GORM"],
    },
    {
      title: "Generasi Gigih 3.0: Fullstack Engineer Path",
      organization: "GoTo Impact Foundation",
      period: "Jun 2023 – Nov 2023",
      bullets: [
        "MERN stack bootcamp with project-based learning.",
        "From API Development with Express and MongoDB to UI integration with React.",
      ],
      tools: [
        "MongoDB",
        "Express",
        "React",
        "Node.js",
        "Next.js",
        "Tailwind CSS",
        "HTML",
        "CSS",
      ],
    },
    {
      title: "Certified UX Designer",
      organization: "Google x FGA Digitalent",
      period: "Aug 2023 – Sept 2024",
      bullets: [
        "UX and Design Thinking framework.",
        "Prototyping and conducting research for product.",
      ],
      tools: ["Figma"],
    },
    {
      title: "Certified Visual Designer",
      organization: "Adobe",
      period: "Jan 2023",
      bullets: [
        "Visual branding, brand identity.",
      ],
      tools: ["Photoshop"],
    },
  ],
  education: [
    {
      institution: "Telkom University",
      degree: "M.S. in Information System",
      period: "2025 – Present",
      gpa: "3.69/4.0",
    },
    {
      institution: "University of Indonesia",
      degree: "B.S. in Philosophy",
      period: "2019 – 2023",
      gpa: "3.53/4.0",
    },
  ],
  technologies: {
    languages: [
      "TypeScript",
      "JavaScript",
      "Go",
      "Solidity",
    ],
    toolsAndFrameworks: [
      "React",
      "Vue",
      "Next.js",
      "Tailwind CSS",
      "HTML",
      "CSS",
      "Bun",
      "Node.js",
      "Express",
      "Hono",
      "VS Code",
      "Git",
      "GitHub",
      "Docker",
      "Vite",
      "Webpack",
      "React Query",
      "Wagmi",
      "Viem",
    ],
    databaseAndInfrastructure: [
      "PostgreSQL",
      "MongoDB",
      "Vercel",
      "Netlify",
      "GCP",
    ],
  },
}
