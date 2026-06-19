export const RegionToggle = ({
  region,
  showregs,
  onToggle,
}: {
  region: string;
  showregs: boolean;
  onToggle: () => void;
}) => {
  return (
    <button
      role="combobox"
      aria-haspopup="listbox"
      aria-controls="reg-list"
      aria-label="Select reg"
      aria-expanded={showregs}
      className={`dropdown__button ${showregs ? "active" : ""}`}
      onClick={onToggle}
    >
      {region}
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.33337 5.99999L8.00004 3.33333L10.6667 5.99999"
          stroke="var(--color-neutral-600)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10.6667 10L8.00004 12.6667L5.33337 10"
          stroke="var(--color-neutral-600)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};
