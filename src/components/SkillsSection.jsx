import {
  FaCode,
  FaShieldAlt,
  FaMicrochip,
  FaTools,
} from 'react-icons/fa'
import { skillGroups } from '../data/portfolioData'
import SectionTitle from './SectionTitle'

const groupIcons = {
  Languages: <FaCode />,
  'Security Domains': <FaShieldAlt />,
  'Systems & Low-Level': <FaMicrochip />,
  Tooling: <FaTools />,
}

export default function SkillsSection() {
  return (
    <section id="skills" className="section">
      <div className="section-shell">
        <SectionTitle
          eyebrow="Expertise"
          title="A broad stack, but presented with a security-first lens."
          text="The goal is not to dump keywords. It is to show a coherent technical profile that spans security analysis, systems, networking, web application testing, tooling, and reverse engineering."
        />

        <div className="skills-grid">
          {skillGroups.map((group) => (
            <article className="glass-card skill-card" key={group.title} data-reveal>
              <div className="skill-card__top">
                <div className="skill-card__title-wrap">
                  <span className="skill-card__icon">{groupIcons[group.title]}</span>
                  <h3>{group.title}</h3>
                </div>
                <span className="pill">{group.items.length} items</span>
              </div>

              <div className="tag-cloud">
                {group.items.map((item) => (
                  <span className="tag" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}