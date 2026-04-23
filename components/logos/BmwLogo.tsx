/** BMW roundel — gradients from `Icons/EV/BMW.svg` */
export function BmwLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <path
        fill="url(#lci-bmw-ring)"
        d="M16 2C8.268 2 2 8.268 2 16s6.268 14 14 14 14-6.268 14-14S23.732 2 16 2"
      />
      <path fill="#fff" d="M16 24.943a8.943 8.943 0 1 1 0-17.886 8.943 8.943 0 0 1 0 17.886" />
      <path fill="url(#lci-bmw-quarters)" d="M7.633 16H16V7.632A8.37 8.37 0 0 0 7.633 16M16 16v8.367A8.367 8.367 0 0 0 24.368 16z" />
      <path
        fill="#fff"
        fillRule="evenodd"
        d="M8.244 7.36c.43-.268.888-.18 1.184.107.456.443.389.955-.044 1.471l-1.897 2.26-2.826-2.372 1.798-2.143c.372-.443.892-.797 1.387-.382l.026.022c.135.112.202.168.376.486a.82.82 0 0 1-.004.55m-.803-.137c-.181-.152-.464-.158-.59-.01l-1.08 1.288.669.56L7.508 7.79c.134-.16.133-.398-.067-.566m.185 2.834 1.126-1.342c.15-.178.128-.456-.09-.639-.193-.162-.48-.117-.607.036L6.92 9.464zM17.44 3.876l-.971 2.573h-.806l-.971-2.573V6.45h-.738V2.764h1.109l1.003 2.625 1.003-2.625h1.108V6.45h-.738zM24.999 9.949l1.389-1.967-.612-.755-2.212.95 1.447-1.894-.57-.704-2.312 2.973.676.828 2.184-.899.008.01-1.333 1.95.669.832 3.39-1.642-.571-.705z"
        clipRule="evenodd"
      />
      <defs>
        <linearGradient id="lci-bmw-ring" x1={6.277} x2={25.183} y1={6.277} y2={26.264} gradientUnits="userSpaceOnUse">
          <stop offset=".027" stopColor="#949AA0" />
          <stop offset=".403" stopColor="#1A1D1E" />
          <stop offset="1" stopColor="#040606" />
        </linearGradient>
        <linearGradient id="lci-bmw-quarters" x1={16} x2={16} y1={7.632} y2={24.367} gradientUnits="userSpaceOnUse">
          <stop stopColor="#7CD1F4" />
          <stop offset={1} stopColor="#1274B9" />
        </linearGradient>
      </defs>
    </svg>
  )
}
