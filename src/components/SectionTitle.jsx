export default function SectionTitle({
  eyebrow,
  title,
  text,
  align = 'left',
  terminal = false,
  terminalLabel = 'init.section',
}) {
  return (
    <div
      className={`section-title section-title--${align} ${terminal ? 'section-title--terminal' : ''}`}
      data-reveal
    >
      <span className="section-eyebrow">{eyebrow}</span>

      {terminal ? (
        <div className="section-terminal-line" aria-hidden="true">
          <span className="section-terminal-line__prompt">$</span>
          <span className="section-terminal-line__label">{terminalLabel}</span>
          <span className="section-terminal-line__cursor" />
        </div>
      ) : null}

      <h2>{title}</h2>
      {text ? <p>{text}</p> : null}
    </div>
  )
}