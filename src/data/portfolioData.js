export const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'writeups', label: 'CTF Writeups' },
  { id: 'skills', label: 'Expertise' },
  { id: 'connect', label: 'Connect' },
]

export const rotatingRoles = [
  'Offensive Security',
  'Defensive Security',
  'Security Tooling',
  'Reverse Engineering',
  'Fuzzing & Exploit Research',
  'CTF Writeups',
]

export const stats = [
  { value: 'MSc', label: 'Cybersecurity @ Sapienza' },
  { value: 'CTF', label: 'HackTheBox / TryHackMe practice' },
  { value: 'R&D', label: 'Security tooling and labs' },
  { value: 'EU', label: 'Barcelona exchange experience' },
]

export const aboutHighlights = [
  {
    title: 'Technical focus',
    text: 'Offensive & defensive security with strong interest in vulnerability research, system internals, security tooling, and practical attack/defense workflows.',
  },
  {
    title: 'Academic background',
    text: "Master's Degree in Cybersecurity at Sapienza University of Rome, Bachelor's Degree in Computer Science at University of Perugia, Erasmus experience at Universitat de Barcelona.",
  },
  {
    title: 'Hands-on practice',
    text: 'CTF solving, malware analysis labs, network defense exercises, exploit experimentation, and project-driven security development.',
  },
]

export const skillGroups = [
  {
    title: 'Languages',
    items: ['Python', 'C', 'C++', 'Java', 'JavaScript', 'Bash', 'PowerShell', 'Go', 'Rust', 'SQL', 'PHP'],
  },
  {
    title: 'Security Domains',
    items: ['Vulnerability Analysis', 'Network Security', 'Red Teaming', 'Blue Teaming', 'Malware Analysis', 'Web Security'],
  },
  {
    title: 'Systems & Low-Level',
    items: ['Linux', 'Windows', 'TCP/IP', 'Socket Programming', 'Distributed Systems', 'System Hardening'],
  },
  {
    title: 'Tooling',
    items: ['Nmap', 'Wireshark', 'Netcat', 'Burp Suite', 'OWASP ZAP', 'ffuf', 'Metasploit', 'pwntools', 'IDA', 'Ghidra', 'GDB', 'Volatility', 'Autopsy', 'Docker', 'Git'],
  },
]

export const experienceTimeline = [
  {
    year: 'Now',
    title: 'Cybersecurity Student & Builder',
    company: 'Personal portfolio / labs / CTF',
    text: 'Building security labs, experimenting with exploit chains, writing tooling, and documenting technical work with a strong learning-by-doing approach.',
  },
  {
    year: '2024',
    title: 'IT & Cybersecurity Intern',
    company: 'Angelantoni Industrie, Massa Martana',
    text: 'Exposure to enterprise IT operations, infrastructure management, security workflows, threat analysis, and system protection practices.',
  },
  {
    year: '2021',
    title: 'ICT Network Technician Internship',
    company: 'Dimensione Impresa SRL, Todi',
    text: 'Worked on technical support, troubleshooting, workflow optimization, and security measures for networks and internal systems.',
  },
]

export const writeupFilters = ['All', 'Web', 'Pwn', 'Reverse', 'Cloud', 'PrivEsc', 'Medium', 'Hard']

export const writeups = [
  {
    title: 'Hack The Box - Principal',
    type: 'Web / JWT / PrivEsc',
    difficulty: 'Medium',
    summary: 'Compromise Jetty-based platform using a JWE/JWT authentication bypass via exposed JWKS, administrative API abuse, credential disclosure, root privilege escalation by abusing a readable SSH CA private key.',
    stack: ['JWE', 'JWKS', 'SSH Certificates', 'Privilege Escalation'],
    category: ['Web', 'JWT', 'PrivEsc', 'Medium'],
    link: 'https://github.com/alessandro-carboni/CTF-Writeups/tree/main/Principal/principal.md',
    image: '/images/Principal.png',
  },
  {
    title: 'Hack The Box - Facts',
    type: 'Web / PrivEsc / Cloud',
    difficulty: 'Medium',
    summary: 'Exploitation of a Web Page built on Camaleon CMS | credential extraction (CVE-2025-2304) | AWS S3 pivoting (CVE-2026-1776) | root privilege escalation via misconfigured files',
    stack: ['Rails', 'Camaleon CMS', 'AWS S3', 'SQLite', 'Privilege Escalation'],
    category: ['Web', 'PrivEsc', 'Cloud', 'Medium'],
    link: 'https://github.com/alessandro-carboni/CTF-Writeups/tree/main/Facts/facts.md',
    image: '/images/Facts.png',
  },
  {
    title: 'Hack The Box - CCTV',
    type: 'Web / Authenticated Exploitation / PrivEsc',
    difficulty: 'Easy',
    summary: 'End-to-end exploitation of a surveillance platform, authenticated SQL injection, database exfiltration, credential cracking, lateral movement via SSH, root access through command injection in an internal motionEye service.',
    stack: ['Apache', 'ZoneMinder', 'MySQL', 'motionEye', 'SSH', 'Linux'],
    category: ['Web', 'SQLi', 'PrivEsc', 'Easy'],
    link: 'https://github.com/alessandro-carboni/CTF-Writeups/tree/main/CCTV/cctv.md',
    image: '/images/Cctv.png',
  },
]

export const projects = [
  {
    title: 'Fuzz Triage Pipeline',
    subtitle: 'Coverage-guided fuzzing & crash triage',
    description: 'A practical pipeline to collect crashes, deduplicate them, and prioritize security-relevant paths for deeper analysis.',
    tags: ['Fuzzing', 'Automation', 'Analysis'],
    link: 'https://github.com/alessandro-carboni/fuzz-triage-pipeline',
  },
  {
    title: 'Ghidra Scripts Pack with AI',
    subtitle: 'Reverse engineering automation with AI support',
    description: 'A set of scripts aimed at speeding up reverse engineering tasks, pattern extraction, and repetitive analysis activities.',
    tags: ['Ghidra', 'Reverse Engineering', 'Automation'],
    link: 'https://github.com/alessandro-carboni/ghidra-scripts-pack',
  },
  {
    title: 'CTF VM Development',
    subtitle: 'Exploit chains and privilege escalation paths',
    description: 'Creation of intentionally vulnerable environments designed to teach exploitation logic, chaining, and realistic post-exploitation reasoning.',
    tags: ['CTF', 'PrivEsc', 'Lab Design'],
    link: 'https://github.com/alessandro-carboni/EH-VM',
  },
  {
    title: 'Cloud Misconfiguration Lab',
    subtitle: 'Attack & detection',
    description: 'Security lab focused on cloud exposure, weak permissions, and the balance between attack simulation and detection opportunities.',
    tags: ['Cloud', 'Detection', 'Security'],
    link: '#',
  },
  {
    title: 'Threat Modeling Lab',
    subtitle: 'STRIDE methodology',
    description: 'A structured lab for identifying assets, trust boundaries, and threats, then translating them into technical mitigations.',
    tags: ['Threat Modeling', 'STRIDE', 'Architecture'],
    link: '#',
  },
  {
    title: 'Secure File Sharing Protocol',
    subtitle: 'Distributed Systems project',
    description: 'Protocol-oriented project exploring communication, reliability, and secure exchange in a distributed setting.',
    tags: ['Distributed Systems', 'Protocols', 'Secure Design'],
    link: 'https://github.com/SoftwareDistribuitUB-2026/practica-1-c15',
  },
]

export const achievements = [
  {
    title: 'Security labs and vulnerable environments',
    text: 'Built and experimented with intentionally vulnerable setups to study privilege escalation, exploit chaining, and realistic offensive workflows.',
  },
  {
    title: 'CTF-oriented technical practice',
    text: 'Solved and documented challenges involving web exploitation, reverse engineering, local privilege escalation, and constrained attack surfaces.',
  },
  {
    title: 'Security tooling and automation mindset',
    text: 'Worked on scripts and tooling for analysis, repeated workflows, debugging support, and more structured security experimentation.',
  },
  {
    title: 'Systems and protocol perspective',
    text: 'Background includes distributed systems, socket programming, low-level reasoning, and security-oriented architecture thinking.',
  },
]

export const connectLinks = [
  {
    label: 'GitHub',
    href: 'https://github.com/alessandro-carboni',
    value: 'github.com/alessandro-carboni',
    kind: 'github',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/alessandro-carboni-0012a5352/',
    value: 'linkedin.com/in/alessandro-carboni',
    kind: 'linkedin',
  },
  {
    label: 'Email',
    href: 'mailto:alessandro.carboni.7@gmail.com',
    value: 'alessandro.carboni.7@gmail.com',
    kind: 'mail',
  },
  {
    label: 'Phone',
    href: 'tel:+393273441905',
    value: '+39 327 344 1905',
    kind: 'phone',
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/alessandro.carboni_?igsh=cHJzbTM1a3M0dHpm',
    value: 'instagram.com/alessandro.carboni_',
    kind: 'instagram',
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/alessandro.carboni.58',
    value: 'facebook.com/Alessandro.Carboni',
    kind: 'facebook',
  },
]

export const heroParagraph =
  'Cybersecurity student focused on offensive and defensive security, practical tooling, exploit research, reverse engineering, and technically detailed writeups.'

export const footerReferences = [
  {
    title: 'Focus Areas',
    items: ['Offensive Security', 'Reverse Engineering', 'Fuzzing', 'Security Tooling'],
  },
  {
    title: 'Work Style',
    items: ['Hands-on labs', 'Structured writeups', 'Technical clarity', 'Continuous experimentation'],
  },
  {
    title: 'Current Direction',
    items: ['CTF practice', 'Exploit research', 'Systems security', 'Bug Hunting'],
  },
]