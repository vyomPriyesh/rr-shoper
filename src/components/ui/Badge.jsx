const VARIANTS = {
  orange: "bg-orange-500/20 border border-orange-500/40 text-orange-300",
  success: "bg-green-500/20 text-green-400",
  blue: "bg-blue-100 text-blue-800",
  popular: "bg-gradient-to-r from-orange-500 to-orange-400 text-white",
};

export default function Badge({ children, variant = "orange", className = "" }) {
  return (
    <span
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${
        VARIANTS[variant] ?? VARIANTS.orange
      } ${className}`}
    >
      {children}
    </span>
  );
}
