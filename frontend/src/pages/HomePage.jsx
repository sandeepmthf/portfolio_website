import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
import api from "../services/api";
import profilePhoto from "../assets/profile-photo.png";

const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.45 },
};

export default function HomePage() {
  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [resume, setResume] = useState(null);
  const [darkMode, setDarkMode] = useState(true);
  const [loading, setLoading] = useState(true);
  const [contact, setContact] = useState({ name: "", email: "", message: "" });
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [projectsError, setProjectsError] = useState("");

  const categories = ["All", "Full Stack", "UI/UX", "Machine Learning"];

  useEffect(() => {
    document.documentElement.classList.toggle("light", !darkMode);
  }, [darkMode]);

  useEffect(() => {
    const loadCoreData = async () => {
      const [certRes, resumeRes] = await Promise.all([api.get("/certificates"), api.get("/resume")]);
      setCertificates(certRes.data);
      setResume(resumeRes.data);
    };

    loadCoreData().catch(() => null);
  }, []);

  useEffect(() => {
    const loadProjects = async () => {
      setLoading(true);
      setProjectsError("");
      try {
        const params = activeCategory === "All" ? {} : { category: activeCategory };
        const projectsRes = await api.get("/projects", { params });
        setProjects(projectsRes.data);
      } catch (error) {
        setProjects([]);
        console.error("Failed to load projects:", error);
        setProjectsError("Unable to load projects. Please ensure backend server is running on http://localhost:5000");
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, [activeCategory]);

  const skillGroups = useMemo(
    () => [
      { label: "Frontend", items: ["React", "Tailwind"] },
      { label: "Backend", items: ["Node", "Express"] },
      { label: "DB", items: ["MongoDB"] },
      { label: "Cloud", items: ["AWS", "Vercel", "Render"] },
      { label: "Machine Learning", items: ["Python", "TensorFlow", "Scikit-learn"] },
      { label: "UI/UX", items: ["Figma", "Design Systems", "User Research"] },
      { label: "Graphic Design", items: ["Adobe XD", "Photoshop", "Illustrator"] },
    ],
    []
  );

  const onSendMessage = async (e) => {
    e.preventDefault();
    await api.post("/contact", contact);
    setContact({ name: "", email: "", message: "" });
  };

  const scrollToHero = () => {
    document.getElementById("hero")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  // Exclude Ghartak from featured - show it in regular grid instead
  const featuredProject = filteredProjects.find((project) => project.featured && project.title !== "GharTak");
  const regularProjects = filteredProjects.filter((project) => project._id !== featuredProject?._id);

  if (loading && projects.length === 0) return <div className="loader">Loading portfolio...</div>;

  return (
    <>
      <Helmet>
        <title>Sandeep Kumar | Full Stack Portfolio</title>
        <meta name="description" content="Dynamic MERN portfolio of Sandeep Kumar." />
      </Helmet>
      <div className="min-h-screen bg-base text-slate-100">
        <nav className="sticky top-0 z-50 border-b border-white/10 bg-black/35 backdrop-blur-xl">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <a href="#hero" className="text-lg font-semibold text-cyan-300">Sandeep Kumar</a>
            <div className="flex items-center gap-4 text-sm">
              <a href="#projects">Projects</a>
              <a href="#contact">Contact</a>
              <button
                type="button"
                onClick={scrollToHero}
                className="relative rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60"
                aria-label="Scroll to hero section"
              >
                <motion.span
                  className="absolute inset-0 rounded-full border border-cyan-300/70"
                  animate={{ scale: [1, 1.35], opacity: [0.75, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                />
                <img
                  src={profilePhoto}
                  alt="Sandeep Kumar avatar"
                  className="relative h-9 w-9 rounded-full border border-cyan-300/40 object-cover object-top shadow-[0_0_18px_rgba(56,189,248,0.35)]"
                />
              </button>
              <button onClick={() => setDarkMode((p) => !p)} className="rounded-full border px-3 py-1">
                {darkMode ? "Light" : "Dark"}
              </button>
            </div>
          </div>
        </nav>

        <main className="mx-auto max-w-6xl space-y-14 px-6 py-12">
          <motion.section id="hero" {...fadeInUp} className="card">
            <div className="grid items-center gap-8 md:grid-cols-[1.4fr_1fr]">
              <div>
                <p className="text-sm text-cyan-300">Full Stack Developer | MERN | AWS | Building Scalable Digital Solutions</p>
                <h1 className="mt-2 text-4xl font-bold md:text-6xl">Sandeep Kumar</h1>
                <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 md:text-base">
                  I&apos;m a Full Stack Developer specializing in the MERN stack and cloud-based applications, currently pursuing B.Tech in Computer Science. I build scalable, real-world solutions and have experience in freelance development, AI-driven projects, and hackathons.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a href="#projects" className="btn-primary">View Projects</a>
                  <a href={resume?.fileUrl} className="btn-secondary" target="_blank" rel="noreferrer">Download Resume</a>
                </div>
              </div>
              <motion.div
                whileHover={{ scale: 1.03, y: -4 }}
                transition={{ type: "spring", stiffness: 220, damping: 18 }}
                className="relative mx-auto w-full max-w-xs rounded-full border border-cyan-300/25 bg-white/5 p-2 shadow-[0_0_45px_rgba(56,189,248,0.3)]"
              >
                <motion.span
                  className="pointer-events-none absolute inset-1 rounded-full border border-cyan-300/70"
                  animate={{ scale: [1, 1.08], opacity: [0.7, 0.15, 0.7] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.img
                  src={profilePhoto}
                  alt="Sandeep Kumar profile"
                  whileHover={{ scale: 1.04 }}
                  transition={{ duration: 0.25 }}
                  className="h-[240px] w-[240px] rounded-full object-cover object-top sm:h-[290px] sm:w-[290px] md:h-[360px] md:w-[360px]"
                />
              </motion.div>
            </div>
          </motion.section>

          <motion.section {...fadeInUp} className="card"><h2>About</h2><p>B.Tech CSE, AKGEC Ghaziabad | Delhi NCR</p></motion.section>

          <motion.section {...fadeInUp} className="card">
            <h2>Skills</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {skillGroups.map((group) => (
                <div key={group.label} className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <p className="text-cyan-300">{group.label}</p>
                  <p>{group.items.join(", ")}</p>
                </div>
              ))}
            </div>
          </motion.section>

          <motion.section id="projects" {...fadeInUp} className="card">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h2>Projects</h2>
                <p className="mt-1 text-sm text-slate-400">Explore my full stack and specialized projects</p>
              </div>
              <span className="w-fit rounded-full border border-cyan-300/40 bg-cyan-500/10 px-4 py-1.5 text-sm font-medium text-cyan-200">
                {filteredProjects.length} {filteredProjects.length === 1 ? "project" : "projects"} visible
              </span>
            </div>
            
            {projectsError && (
              <div className="mt-4 rounded-xl border border-red-300/50 bg-red-500/10 p-4 text-sm text-red-200">
                <p className="font-semibold">⚠️ Unable to load projects</p>
                <p className="mt-1 text-xs">{projectsError}</p>
              </div>
            )}

            <div className="mt-6 space-y-4">
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <motion.button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    whileTap={{ scale: 0.95 }}
                    className={`rounded-full border px-4 py-2 text-sm font-medium transition duration-200 ${
                      activeCategory === category
                        ? "border-cyan-300 bg-gradient-to-r from-cyan-400/40 to-violet-500/40 text-cyan-100 shadow-[0_0_20px_rgba(56,189,248,0.3)]"
                        : "border-white/20 bg-white/5 text-slate-300 hover:border-cyan-300/60 hover:bg-white/10"
                    }`}
                  >
                    {category}
                  </motion.button>
                ))}
              </div>
              <input
                className="input w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-slate-200 placeholder-slate-500 transition focus:border-cyan-300/60 focus:bg-white/10 focus:outline-none md:w-96"
                placeholder="🔍 Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-8 space-y-6"
            >
              {featuredProject && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="group relative overflow-hidden rounded-2xl border border-cyan-300/40 bg-gradient-to-br from-cyan-500/15 via-blue-500/10 to-violet-500/15 p-6 shadow-[0_0_50px_rgba(56,189,248,0.25)] transition"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
                  <div className="relative z-10">
                    {featuredProject.image && (
                      <div className="mb-5 overflow-hidden rounded-xl border border-cyan-200/50 bg-gradient-to-br from-white via-slate-100 to-cyan-100 p-4 shadow-[0_0_30px_rgba(56,189,248,0.35)]">
                        <motion.img
                          src={featuredProject.image}
                          alt={`${featuredProject.title} preview`}
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.3 }}
                          className="h-56 w-full object-contain"
                        />
                      </div>
                    )}
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-cyan-300">⭐ Featured Project</p>
                        <p className="mt-2 text-3xl font-bold">{featuredProject.title}</p>
                      </div>
                      <span className="rounded-lg border border-violet-300/40 bg-violet-500/10 px-3 py-1 text-xs font-semibold text-violet-200">
                        {featuredProject.category}
                      </span>
                    </div>
                    <p className="mt-4 leading-6 text-slate-200">{featuredProject.description}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {featuredProject.techStack?.map((tech) => (
                        <span key={tech} className="rounded-full border border-violet-300/40 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-200">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="mt-6 flex flex-wrap gap-3">
                      {featuredProject.liveLink && (
                        <motion.a
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="btn-primary"
                          href={featuredProject.liveLink}
                          target="_blank"
                          rel="noreferrer"
                        >
                          🚀 Live Demo
                        </motion.a>
                      )}
                      {featuredProject.githubLink && (
                        <motion.a
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="btn-secondary"
                          href={featuredProject.githubLink}
                          target="_blank"
                          rel="noreferrer"
                        >
                          💻 GitHub
                        </motion.a>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {regularProjects.map((project) => (
                  <motion.div
                    key={project._id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    whileHover={{ scale: 1.04, y: -8 }}
                    className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/8 to-white/2 p-0 transition duration-300 hover:border-cyan-300/50 hover:shadow-[0_0_50px_rgba(56,189,248,0.3)]"
                  >
                    {/* Background gradient overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-transparent to-violet-500/0 opacity-0 transition duration-500 group-hover:from-cyan-500/10 group-hover:to-violet-500/10 group-hover:opacity-100" />
                    
                    {/* Image section with enhanced styling */}
                    {project.image && (
                      <div className="relative overflow-hidden bg-gradient-to-br from-white via-slate-100 to-cyan-100 p-4">
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-blue-400/10 opacity-0 group-hover:opacity-100 transition duration-500" />
                        <motion.img
                          src={project.image}
                          alt={`${project.title} preview`}
                          whileHover={{ scale: 1.12 }}
                          transition={{ duration: 0.4 }}
                          className="relative h-44 w-full object-contain drop-shadow-lg"
                        />
                      </div>
                    )}

                    {/* Content section */}
                    <div className="relative z-10 space-y-3 p-5">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <h3 className="text-lg font-bold leading-snug text-cyan-100 group-hover:text-cyan-50 transition">
                            {project.title}
                          </h3>
                          <p className="mt-1 text-xs text-slate-400 uppercase tracking-wider">
                            {project.category}
                          </p>
                        </div>
                        <motion.span 
                          whileHover={{ scale: 1.1 }}
                          className="shrink-0 rounded-lg border border-violet-300/40 bg-violet-500/15 px-3 py-1.5 text-xs font-bold text-violet-200"
                        >
                          {project.category.slice(0, 3)}
                        </motion.span>
                      </div>

                      <p className="line-clamp-2 text-sm leading-relaxed text-slate-300">
                        {project.description}
                      </p>

                      {/* Tech stack */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        {project.techStack?.slice(0, 3).map((tech) => (
                          <motion.span 
                            key={tech} 
                            whileHover={{ scale: 1.08 }}
                            className="rounded-full border border-cyan-300/40 bg-cyan-500/15 px-3 py-1 text-xs font-medium text-cyan-200 hover:bg-cyan-500/25 transition"
                          >
                            {tech}
                          </motion.span>
                        ))}
                        {(project.techStack?.length || 0) > 3 && (
                          <span className="rounded-full border border-cyan-300/30 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-300">
                            +{project.techStack.length - 3}
                          </span>
                        )}
                      </div>

                      {/* Action buttons */}
                      <div className="flex gap-2 pt-3">
                        {project.liveLink && (
                          <motion.a
                            whileHover={{ scale: 1.06 }}
                            whileTap={{ scale: 0.94 }}
                            className="flex-1 rounded-lg border border-cyan-400/50 bg-gradient-to-r from-cyan-500/20 to-cyan-500/10 px-3 py-2 text-center text-sm font-semibold text-cyan-200 transition hover:from-cyan-500/30 hover:to-cyan-500/20 hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]"
                            href={project.liveLink}
                            target="_blank"
                            rel="noreferrer"
                          >
                            🚀 Live
                          </motion.a>
                        )}
                        {project.githubLink && (
                          <motion.a
                            whileHover={{ scale: 1.06 }}
                            whileTap={{ scale: 0.94 }}
                            className="flex-1 rounded-lg border border-violet-400/50 bg-gradient-to-r from-violet-500/20 to-violet-500/10 px-3 py-2 text-center text-sm font-semibold text-violet-200 transition hover:from-violet-500/30 hover:to-violet-500/20 hover:shadow-[0_0_20px_rgba(168,85,247,0.3)]"
                            href={project.githubLink}
                            target="_blank"
                            rel="noreferrer"
                          >
                            💻 Code
                          </motion.a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {filteredProjects.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="rounded-xl border border-dashed border-white/20 bg-white/5 py-12 text-center"
                >
                  <p className="text-lg font-semibold text-slate-300">No projects found</p>
                  <p className="mt-1 text-sm text-slate-400">Try a different category or search term</p>
                </motion.div>
              )}
            </motion.div>
          </motion.section>

          <motion.section {...fadeInUp} className="card">
            <h2>Experience</h2>
            <div className="mt-5 space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="rounded-xl border border-cyan-300/30 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <p className="font-semibold text-cyan-200">IBM SkillsBuild Internship</p>
                    <p className="text-sm text-slate-400">AI Strategy & Business Intelligence</p>
                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      Worked on Agentic AI, Watsonx, Granite, and Python. Contributed to SDG (Sustainable Development Goals) projects focusing on AI-driven solutions.
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {["Agentic AI", "Watsonx", "Granite", "Python"].map((tech) => (
                        <span key={tech} className="rounded-full border border-cyan-300/30 bg-cyan-500/10 px-2.5 py-1 text-xs text-cyan-200">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="rounded-xl border border-violet-300/30 bg-gradient-to-r from-violet-500/10 to-purple-500/10 p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <img src="/project-logos/gurukul-logo.png" alt="Gurukul" className="h-8 w-8 rounded-full object-cover" />
                      <div>
                        <p className="font-semibold text-violet-200">Gurukul Institute</p>
                        <p className="text-sm text-slate-400">Freelance Development</p>
                      </div>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-slate-300">
                      Developed full-stack web solutions for educational institute. Focused on creating responsive, user-friendly platforms for student and instructor management.
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {["React", "Node.js", "MongoDB", "Tailwind"].map((tech) => (
                        <span key={tech} className="rounded-full border border-violet-300/30 bg-violet-500/10 px-2.5 py-1 text-xs text-violet-200">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.section>
          <motion.section {...fadeInUp} className="card">
            <h2>Achievements & Hackathons</h2>
            <div className="mt-5 space-y-5">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-xl border border-blue-300/30 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 p-5 hover:border-blue-300/60 transition"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">�</span>
                  <h3 className="text-lg font-bold text-blue-200">Smart India Hackathon (SIH)</h3>
                </div>
                <p className="text-sm text-slate-300 mb-4">
                  Developed scalable solutions for the national-level Smart India Hackathon competition. Focused on solving real-world problems with innovative technology and creative problem-solving.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="https://www.linkedin.com/posts/officialakgec_akgec-hackathon-idealab-activity-7376636654360522752-QR29"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 rounded-lg border border-blue-300/40 bg-blue-500/10 px-4 py-2 text-sm font-semibold text-blue-200 transition hover:bg-blue-500/20"
                  >
                    📱 LinkedIn Post
                  </a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="rounded-xl border border-amber-300/30 bg-gradient-to-r from-amber-500/10 to-orange-500/10 p-5 hover:border-amber-300/60 transition"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">🏆</span>
                  <h3 className="text-lg font-bold text-amber-200">IIIT Delhi Hackathon (Hack4Health)</h3>
                </div>
                <p className="text-sm text-slate-300 mb-4">
                  Created innovative health-tech solutions focused on accessibility and user experience. Participated in competitive evaluation with expert judges and industry professionals.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="/hackathon-certificate.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 rounded-lg border border-amber-300/40 bg-amber-500/10 px-4 py-2 text-sm font-semibold text-amber-200 transition hover:bg-amber-500/20"
                  >
                    📜 View Certificate
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.section>

          <motion.section {...fadeInUp} className="card">
            <h2>Certifications & Credentials</h2>
            <div className="mt-6 space-y-4">
              {/* IBM SDE Certificate */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="rounded-xl border border-orange-300/30 bg-gradient-to-r from-orange-500/10 to-red-500/10 p-4 hover:border-orange-300/60 transition"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">🏢</span>
                      <div>
                        <p className="font-bold text-orange-100">IBM SkillsBuild SDE Certification</p>
                        <p className="text-xs text-slate-400">Software Development Excellence</p>
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-slate-300">
                      Advanced certification in software development, AI strategy, and business intelligence from IBM SkillsBuild program.
                    </p>
                  </div>
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    href="/ibm-sde-certificate.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="shrink-0 rounded-lg border border-orange-300/40 bg-orange-500/15 px-3 py-2 text-sm font-semibold text-orange-200 transition hover:bg-orange-500/25"
                  >
                    📜 View
                  </motion.a>
                </div>
              </motion.div>

              {/* Other Certifications from Database */}
              {certificates.map((c, index) => (
                <motion.div
                  key={c._id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="rounded-xl border border-cyan-300/30 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 p-4 hover:border-cyan-300/60 transition"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <p className="font-bold text-cyan-100">{c.title}</p>
                      <p className="text-xs text-slate-400">{c.issuer}</p>
                    </div>
                    <span className="shrink-0 rounded-lg border border-cyan-300/40 bg-cyan-500/15 px-3 py-1 text-xs font-semibold text-cyan-200">
                      ✓ Verified
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>

          <motion.section {...fadeInUp} className="card">
            <h2>Coding Profiles</h2>
            <p className="mt-1 text-sm text-slate-400">Competitive programming & problem solving</p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {/* LeetCode Profile */}
              <motion.a
                href="https://leetcode.com/u/sandeepmth/"
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -4 }}
                className="group relative overflow-hidden rounded-xl border border-orange-300/30 bg-gradient-to-br from-orange-500/10 to-yellow-500/10 p-5 transition hover:border-orange-300/60 hover:shadow-[0_0_40px_rgba(234,179,8,0.3)]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 to-transparent opacity-0 transition duration-500 group-hover:opacity-20" />
                <div className="relative z-10 flex items-center gap-4">
                  <div className="rounded-lg border border-orange-300/40 bg-orange-500/20 p-3">
                    <span className="text-2xl">🔢</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-orange-100">LeetCode</h3>
                    <p className="text-xs text-slate-400">Competitive Programming</p>
                    <p className="mt-1 text-sm text-orange-200">@sandeepmth</p>
                  </div>
                  <span className="text-2xl opacity-50 group-hover:opacity-100 transition">→</span>
                </div>
              </motion.a>

              {/* CodeForces Profile */}
              <motion.a
                href="https://codeforces.com/profile/sandeepmth"
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                whileHover={{ scale: 1.05, y: -4 }}
                className="group relative overflow-hidden rounded-xl border border-red-300/30 bg-gradient-to-br from-red-500/10 to-pink-500/10 p-5 transition hover:border-red-300/60 hover:shadow-[0_0_40px_rgba(239,68,68,0.3)]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/0 to-transparent opacity-0 transition duration-500 group-hover:opacity-20" />
                <div className="relative z-10 flex items-center gap-4">
                  <div className="rounded-lg border border-red-300/40 bg-red-500/20 p-3">
                    <span className="text-2xl">⚔️</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-red-100">CodeForces</h3>
                    <p className="text-xs text-slate-400">Algorithm Contests</p>
                    <p className="mt-1 text-sm text-red-200">@sandeepmth</p>
                  </div>
                  <span className="text-2xl opacity-50 group-hover:opacity-100 transition">→</span>
                </div>
              </motion.a>
            </div>
          </motion.section>

          <motion.section id="contact" {...fadeInUp} className="card">
            <h2>Contact</h2>
            <p>Email: sandeep636764@gmail.com</p>
            <p>Phone: +91 6367648334</p>
            <div className="my-3 flex gap-3 text-xl">
              <a href="mailto:sandeep636764@gmail.com"><FaEnvelope /></a>
              <a href="https://github.com/sandeepmthf" target="_blank" rel="noreferrer"><FaGithub /></a>
              <a href="#" aria-label="linkedin"><FaLinkedin /></a>
            </div>
            <form onSubmit={onSendMessage} className="grid gap-2 md:max-w-xl">
              <input className="input" placeholder="Name" value={contact.name} onChange={(e) => setContact({ ...contact, name: e.target.value })} required />
              <input className="input" placeholder="Email" type="email" value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} required />
              <textarea className="input min-h-28" placeholder="Message" value={contact.message} onChange={(e) => setContact({ ...contact, message: e.target.value })} required />
              <button className="btn-primary w-fit">Send Message</button>
            </form>
          </motion.section>
        </main>
      </div>
    </>
  );
}
