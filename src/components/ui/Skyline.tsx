export function Skyline({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1440 320"
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M0 320V180l60-40 40 30 70-70 50 20 90-90 60 60 40-20 80 50 100-110 70 80 50-30 90 100 60-40 80 60 60-20 90 70 40-30 80 40 60-50 60 40V320H0Z"
        fill="currentColor"
      />
    </svg>
  );
}
