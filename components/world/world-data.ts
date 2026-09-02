export type SignKind = "about" | "experience" | "project" | "contact" | "resume"

export type SignLink = { label: string; href: string }

export type SignData = {
  id: string
  kind: SignKind
  title: string
  subtitle?: string
  meta?: string
  bullets: string[]
  tags?: string[]
  links?: SignLink[]
  /** ground position [x, z] */
  position: [number, number]
}

export const COLORS: Record<SignKind, string> = {
  about: "#7c3aed",
  experience: "#1e40af",
  project: "#0ea5e9",
  contact: "#0d9488",
  resume: "#f59e0b",
}

/** Vivid sunset-plaza palette for project/experience posters. */
export const POSTER_PALETTE = [
  "#ff6b4a",
  "#ff9f1c",
  "#ffd23f",
  "#8ac926",
  "#2ec4b6",
  "#4d7cff",
  "#9b5de5",
  "#f15bb5",
  "#f9844a",
  "#00bbf9",
]

export function posterColor(seedId: string): string {
  let h = 2166136261
  for (let i = 0; i < seedId.length; i++) {
    h ^= seedId.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return POSTER_PALETTE[(h >>> 0) % POSTER_PALETTE.length]
}

export const SIGN_EMOJI: Record<string, string> = {
  about: "👋",
  saronic: "🌊",
  amazon: "📦",
  amrl: "🤖",
  dell: "📊",
  coley: "🗂️",
  paradigm: "🔥",
  omron: "🚗",
  "vqa-disagree": "🧠",
  davatar: "💧",
  "silicon-prairie": "🛰️",
  secondlens: "👓",
  arcade: "🕹️",
  stock: "📈",
  "plate-em": "🍽️",
  steamboard: "🎮",
  sat3dgs: "🌐",
  "this-site": "🌎",
  contact: "✉️",
  resume: "📄",
}

export const ZONES: { label: string; position: [number, number, number] }[] = [
  { label: "START", position: [0, 0.02, 4] },
  { label: "EXPERIENCE", position: [-15, 0.02, -5] },
  { label: "PROJECTS", position: [15, 0.02, -7] },
]

/** Fast-travel targets shown as chips in the HUD. */
export const TRAVEL: { label: string; position: [number, number] }[] = [
  { label: "About", position: [0, -3] },
  { label: "Experience", position: [-11, -6] },
  { label: "Projects", position: [13, -6] },
  { label: "Contact", position: [3, -13] },
]

export const SIGNS: SignData[] = [
  // ---------------------------------------------------------------- about
  {
    id: "about",
    kind: "about",
    title: "Ashwin Prakash",
    subtitle: "ECE Senior · UT Austin · Robotics minor",
    meta: "Austin, TX",
    bullets: [
      "B.S. Electrical & Computer Engineering, May 2027 · GPA 3.7",
      "Machine learning, computer vision, and robotics — perception pipelines, multimodal models, sensor fusion, and simulation.",
      "I like building systems that can see and reason about the physical world, and shipping them end to end.",
    ],
    tags: ["Algorithms", "Software Testing", "Data Science Lab", "Embedded Systems", "Probability"],
    links: [{ label: "GitHub", href: "https://github.com/AshwinP10" }],
    position: [0, -6],
  },

  // ------------------------------------------------------------- experience
  {
    id: "saronic",
    kind: "experience",
    title: "Saronic Technologies",
    subtitle: "Software Engineering Intern · Texas Convergent",
    meta: "Aug 2026 – Present · Austin, TX",
    bullets: [
      "Building a Python Gym-style API (reset, step, observe) around NVIDIA Isaac Sim — a closed-loop virtual ocean for testing autonomous boat software without a boat in the water.",
      "Integrating a boat dynamics model so autonomy control inputs update boat state and the simulator renders camera observations back to the stack in real time, with configurable scenarios for RL navigation training.",
    ],
    tags: ["Python", "NVIDIA Isaac Sim", "Reinforcement Learning", "Simulation"],
    position: [-6, -8],
  },
  {
    id: "amazon",
    kind: "experience",
    title: "Amazon",
    subtitle: "SDE Intern · Computer Vision (Amazon Key, Devices)",
    meta: "Jun 2026 – Present · Austin, TX",
    bullets: [
      "Designed a serverless pipeline on AWS (Lambda, EventBridge, API Gateway, S3), provisioned via the AWS CDK in TypeScript, automating the Amazon Key installation-audit workflow.",
      "Trained and fine-tuned detection and classification models (YOLO, ResNet) in PyTorch to verify device installation and flag wiring and component anomalies from real-world captures.",
      "Layered lightweight checks using CNNs, DINOv2 embeddings, and Claude Sonnet 5 vision calls to surface installation anomalies for review.",
    ],
    tags: ["AWS CDK", "TypeScript", "PyTorch", "YOLO", "ResNet", "DINOv2"],
    position: [-11, -10],
  },
  {
    id: "amrl",
    kind: "experience",
    title: "Autonomous Mobile Robotics Laboratory",
    subtitle: "Robotics Software Engineer · Sensor Fusion & Perception",
    meta: "Sep 2025 – May 2026 · Austin, TX",
    bullets: [
      "Implemented sensor-fusion pipelines combining LiDAR, IMU, and camera data to improve localization accuracy by 27%.",
      "Implemented open-source visual SLAM and object-tracking modules in ROS 2, reducing pose-estimation drift by 18%.",
      "Deployed real-time perception and control modules on NVIDIA Jetson for onboard navigation and obstacle avoidance.",
    ],
    tags: ["ROS 2", "Sensor Fusion", "Visual SLAM", "NVIDIA Jetson", "C++"],
    position: [-16, -11],
  },
  {
    id: "dell",
    kind: "experience",
    title: "Dell Technologies",
    subtitle: "Software Engineering Intern",
    meta: "Jun 2025 – Aug 2025 · Round Rock, TX",
    bullets: [
      "Built an AI-powered sprint reporting system with LangChain and Gemma, automating Jira analytics and cutting report generation time by 50%.",
      "Trained and deployed a Random Forest classifier at 91% accuracy for issue-spillover prediction, improving triage.",
      "Added a RAG pipeline (bge-m3 embeddings + Elasticsearch vector store) and containerized the backend with Docker.",
    ],
    tags: ["LangChain", "Gemma", "Random Forest", "RAG", "Elasticsearch", "Docker"],
    position: [-20, -9],
  },
  {
    id: "coley",
    kind: "experience",
    title: "Coley GCS",
    subtitle: "Backend Software Engineer Contractor · Texas Convergent",
    meta: "Feb 2025 – May 2025 · Austin, TX",
    bullets: [
      "Built an internal CRM on Supabase + PostgreSQL with row-level security, authentication, and granular user permissions.",
      "Integrated a fine-tuned Gemini LLM to extract and cluster key topics from PDFs, automating contract analysis.",
      "Engineered backend pipelines and parsers for ingesting government contracts with metadata tagging and search.",
    ],
    tags: ["Supabase", "PostgreSQL", "Gemini", "Python"],
    position: [-22, -4],
  },
  {
    id: "paradigm",
    kind: "experience",
    title: "Paradigm Robotics",
    subtitle: "Student Software Engineer",
    meta: "Jan 2024 – May 2025 · Austin, TX",
    bullets: [
      "Fine-tuned YOLOv5 on a custom thermal + optical dataset in PyTorch for reliable human detection in low-visibility field robotics.",
      "Built C++ drivers for optical and thermal sensors, streaming to ROS nodes in containerized Docker/Ubuntu.",
      "Built a real-time robot control GUI with OpenCV, WebSockets, and TCP/IP on an embedded Linux Raspberry Pi.",
    ],
    tags: ["YOLOv5", "PyTorch", "ROS", "C++", "OpenCV", "Raspberry Pi"],
    position: [-21, 0],
  },
  {
    id: "omron",
    kind: "experience",
    title: "Omron Robotics & Safety Technologies",
    subtitle: "Software Engineering Intern",
    meta: "Jun 2023 – Aug 2023 · Pleasanton, CA",
    bullets: [
      "Built and deployed a FastAPI REST service on AWS EC2 with password auth, a NoSQL credential store, and Postman-tested endpoints.",
      "Integrated a ROS Turtlebot with an OMRON robot fleet, publishing real-time 2D location data to the fleet manager for control of up to 10 robots.",
    ],
    tags: ["FastAPI", "AWS EC2", "NoSQL", "ROS", "Postman"],
    position: [-17, 3],
  },

  // ---------------------------------------------------------------- projects
  {
    id: "vqa-disagree",
    kind: "project",
    title: "VQA-Disagree",
    subtitle: "Workshop paper · DataMFM @ CVPR 2026",
    bullets: [
      "Multi-model disagreement pipeline running four 7B vision-language models (Qwen2-VL, LLaVA-1.6, InternVL2, MiniCPM-V) on Modal to auto-stratify 1,500 VQA items into difficulty buckets with zero human annotation.",
      "Validated with a Qwen2-VL-72B oracle (4-bit QLoRA on A100), confirming a 28.3 pp Easy–Hard accuracy gap.",
      "Released a 456-sample difficulty-stratified benchmark on Hugging Face.",
    ],
    tags: ["PyTorch", "Vision-Language Models", "QLoRA", "Modal"],
    links: [
      { label: "Code", href: "https://github.com/AshwinP10/vqa-disagree" },
      { label: "Dataset", href: "https://huggingface.co/datasets/AshwinP10/VQA-Disagree" },
    ],
    position: [7, -9],
  },
  {
    id: "davatar",
    kind: "project",
    title: "DAVATaR",
    subtitle: "RobIN Lab · submitted to CoRL 2026",
    bullets: [
      "Co-authored DAVATaR: multimodal transformer policies trained via imitation learning that fuse RGB vision, tactile, and immersion-depth signals for contact-rich manipulation across the air–water interface.",
      "Physically-grounded visual augmentations (reflection/refraction) raised mean real-world task success from 28% (vision-only) to 71%.",
      "Built PyTorch behavior-cloning pipelines: ResNet-18 spatial-softmax encoder + transformer fusion, with closed-loop real-world rollouts.",
    ],
    tags: ["PyTorch", "Imitation Learning", "Multimodal Transformers", "Behavior Cloning"],
    links: [{ label: "Website", href: "https://davatar-corl26.github.io/" }],
    position: [12, -11],
  },
  {
    id: "silicon-prairie",
    kind: "project",
    title: "Silicon Prairie",
    subtitle: "Forecasting Austin–San Antonio megacity convergence",
    bullets: [
      "Modeled 10 years of Sentinel-2 imagery (pulled via Google Earth Engine) across 43,264 tiles as a latent-space forecasting problem — 512-dim embeddings from a ResNet-18 (benchmarked vs a ViT) trained to 98% land-use accuracy.",
      "2-layer LSTM with a residual 'delta' formulation and structural-prior bias forecasts land-use transitions, converging to MSE 0.055.",
      "Projects a continuous high-density corridor merging Austin and San Antonio by 2030.",
    ],
    tags: ["ResNet-18", "ViT", "LSTM", "Google Earth Engine", "PyTorch"],
    links: [
      {
        label: "Article",
        href: "https://medium.com/@ashwinprakash10/predicting-the-silicon-prairie-megacity-mapping-the-austin-san-antonio-convergence-with-deep-ad2486f133f3",
      },
      { label: "Video", href: "https://www.youtube.com/watch?v=dZCs_dmNhyU" },
    ],
    position: [17, -12],
  },
  {
    id: "secondlens",
    kind: "project",
    title: "SecondLens",
    subtitle: "HackMIT · smart-glasses memory graph",
    bullets: [
      "Smart-glasses platform that captures real-world interactions and organizes them into a searchable memory graph.",
      "Python facial-recognition service with dlib and OpenCV — detection, landmark alignment, and embedding extraction robust to low light and motion blur.",
      "Node.js + Supabase backend and a React PWA, with identities rendered in an interactive Three.js knowledge graph.",
    ],
    tags: ["OpenCV", "dlib", "Claude API", "Three.js", "Supabase", "React"],
    links: [
      { label: "Report", href: "https://plume.hackmit.org/project/pakgt-inxow-qfdlj-ipbaa" },
      { label: "Code", href: "https://github.com/AshwinP10/mentra-photo-sender" },
    ],
    position: [22, -10],
  },
  {
    id: "arcade",
    kind: "project",
    title: "Handheld Arcade Game",
    subtitle: "PCB design + embedded firmware",
    bullets: [
      "Designed a PCB game controller in KiCAD for a TI microcontroller and hand-soldered 40+ components (switches, audio ports, LCD, UART).",
      "Debugged UART and DAC audio with DMMs and oscilloscopes.",
      "Recreated 'Asteroids' in C, C++, and ARM Assembly using multithreading with SysTick interrupts for player input.",
    ],
    tags: ["C", "C++", "ARM Assembly", "KiCAD", "Embedded Systems"],
    links: [
      { label: "Demo", href: "https://youtu.be/-TJatr4mJDc" },
      { label: "Code", href: "https://github.com/AshwinP10/gamelab" },
    ],
    position: [8, -4],
  },
  {
    id: "stock",
    kind: "project",
    title: "Stock Price Predictor",
    subtitle: "Technical-indicator forecasting on Streamlit",
    bullets: [
      "Python tool with 5 technical indicators across models like XGBoost, served on Streamlit.",
      "Engineered a yfinance pipeline for real-time retrieval, processing, and visualization, with user history stored in SQLite.",
    ],
    tags: ["Python", "scikit-learn", "XGBoost", "Streamlit", "SQL"],
    links: [
      { label: "Demo", href: "https://stockindex.streamlit.app" },
      { label: "Code", href: "https://github.com/AshwinP10/StockPricePredictor" },
    ],
    position: [13, -5],
  },
  {
    id: "plate-em",
    kind: "project",
    title: "Plate 'Em",
    subtitle: "Texas Convergent F24 · team of 7",
    bullets: [
      "Dining-hall meal-planning app: scraped menu data across 3 UT dining halls with Python + BeautifulSoup into Firebase.",
      "Built a React Native UI with health metrics and goal planning, and used the GPT API for personalized meal recommendations.",
    ],
    tags: ["React Native", "BeautifulSoup", "Firebase", "GPT API"],
    position: [18, -6],
  },
  {
    id: "steamboard",
    kind: "project",
    title: "Steamboard",
    subtitle: "Steam data dashboard",
    bullets: ["A React dashboard for exploring Steam game and player statistics."],
    tags: ["React", "Data Visualization"],
    links: [{ label: "Code", href: "https://github.com/AshwinP10/steamboard" }],
    position: [23, -3],
  },
  {
    id: "sat3dgs",
    kind: "project",
    title: "Sat3DGS",
    subtitle: "Satellite 3D Gaussian Splatting",
    bullets: ["Team exploration of 3D Gaussian Splatting for reconstruction from satellite imagery."],
    tags: ["3D Gaussian Splatting", "Python"],
    links: [{ label: "Code", href: "https://github.com/NEural-TransmissionS/Sat3DGS" }],
    position: [20, 0],
  },
  {
    id: "this-site",
    kind: "project",
    title: "This Portfolio",
    subtitle: "The world you're standing in",
    bullets: [
      "A Next.js + Three.js playable world — drive the robot to a sign to read a resume point.",
      "Built with @react-three/fiber and no physics engine: kinematic movement + proximity triggers to keep it light.",
    ],
    tags: ["Next.js", "React Three Fiber", "TypeScript"],
    links: [{ label: "Code", href: "https://github.com/AshwinP10/portfolio-3s" }],
    position: [14, 1],
  },

  // ---------------------------------------------------------------- contact
  {
    id: "contact",
    kind: "contact",
    title: "Contact",
    subtitle: "Open to software, ML, and robotics roles",
    bullets: ["ashwinprakash@utexas.edu", "(781) 759-2993", "github.com/AshwinP10"],
    links: [
      { label: "Email", href: "mailto:ashwinprakash@utexas.edu" },
      { label: "GitHub", href: "https://github.com/AshwinP10" },
      { label: "Résumé PDF", href: "/resume.pdf" },
    ],
    position: [3, -16.5],
  },

  // ---------------------------------------------------------------- resume pillar
  {
    id: "resume",
    kind: "resume",
    title: "Résumé",
    subtitle: "One page, PDF",
    bullets: ["The full one-page résumé — experience, projects, and skills."],
    links: [{ label: "Open Résumé (PDF)", href: "/resume.pdf" }],
    position: [4, 2],
  },
]
