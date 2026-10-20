
// interface DesignIconProps {
//   src: string;
//   color?: string;
//   size?: number;
//   className?: string;
// }

// export function DesignIcon({
//   src,
//   color = "#1A37FF",
//   size = 24,
//   className = "",
// }: DesignIconProps) {
//   return (
//     <span
//       aria-hidden="true"
//       className={`inline-block shrink-0 ${className}`}
//       style={{
//         width: size,
//         height: size,
//         backgroundColor: color,
//         maskImage: `url("${src}")`,
//         WebkitMaskImage: `url("${src}")`,
//         maskRepeat: "no-repeat",
//         WebkitMaskRepeat: "no-repeat",
//         maskPosition: "center",
//         WebkitMaskPosition: "center",
//         maskSize: "contain",
//         WebkitMaskSize: "contain",
//       }}
//     />
//   );
// }





interface DesignIconProps {
  src: string;
  color?: string;
  size?: number;
}

export function DesignIcon({
  src,
  color = "#1A37FF",
  size = 24,
}: DesignIconProps) {
  return (
    <span
      aria-hidden="true"
      className="inline-block shrink-0"
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        maskImage: `url("${src}")`,
        WebkitMaskImage: `url("${src}")`,
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskPosition: "center",
        maskSize: "contain",
        WebkitMaskSize: "contain",
      }}
    />
  );
}
