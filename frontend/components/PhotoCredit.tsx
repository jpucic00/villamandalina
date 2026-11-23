import type { PhotoCredit as Credit } from "@/constants/photoCredits";

// Small credit overlaid on the bottom-right of a photo. Pass linked={false}
// when the photo sits inside a link (nested links are invalid HTML).
export default function PhotoCredit({
  credit,
  label,
  linked = true,
}: {
  credit: Credit;
  label: string;
  linked?: boolean;
}) {
  const license = credit.source !== "Unsplash" ? credit.license : undefined;

  if (!linked) {
    return (
      <small className="photoCredit">
        {label}: {credit.author} / {credit.source}
        {license && `, ${license.name}`}
      </small>
    );
  }

  return (
    <small className="photoCredit">
      {label}:{" "}
      <a href={credit.url} target="_blank" rel="noopener noreferrer">
        {credit.author} / {credit.source}
      </a>
      {license && (
        <>
          ,{" "}
          <a href={license.url} target="_blank" rel="license noopener noreferrer">
            {license.name}
          </a>
        </>
      )}
    </small>
  );
}
