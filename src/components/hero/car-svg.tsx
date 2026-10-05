/** Static side-profile of the same car. Poster for the 3D scene, and the mobile / reduced-motion fallback. */
export function CarSvg({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 420 150"
      fill="none"
      strokeWidth="1.5"
      strokeLinejoin="round"
      strokeLinecap="round"
      aria-hidden
      className={className}
    >
      <g stroke="currentColor">
        <path d="M70 92h190l60-14 52-6v10l-52 10H70z" />
        <path d="M150 92l12-26h58l26 26" />
        <circle cx="112" cy="104" r="26" />
        <circle cx="112" cy="104" r="9" />
        <circle cx="318" cy="106" r="22" />
        <circle cx="318" cy="106" r="7" />
      </g>
      <path d="M52 40h40v34H52zM44 40v44" stroke="var(--sector-yellow)" />
      <path d="M382 120h22" stroke="var(--sector-purple)" strokeWidth="3" />
      <path d="M176 66c14-22 30-22 44 0" stroke="var(--sector-yellow)" />
      <path d="M150 66l-14-18h28" stroke="var(--sector-green)" />
    </svg>
  )
}
