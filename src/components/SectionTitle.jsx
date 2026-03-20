export default function SectionTitle({
  eyebrow,
  title,
  text,
  align = 'left',
}) {
  return (
    <div className={`section-title section-title--${align}`} data-reveal>
      <span className="section-eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {text ? <p>{text}</p> : null}
    </div>
  )
}