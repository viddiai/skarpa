import StickyCTA from "../StickyCTA";

export default function StickyCTAExample() {
  return (
    <div className="h-[200vh] relative">
      <div className="p-8">
        <h2>Scroll down to see the sticky CTA appear</h2>
        <p className="text-muted-foreground mt-2">
          The CTA will appear at the bottom on mobile devices after scrolling past the hero section.
        </p>
      </div>
      <StickyCTA />
    </div>
  );
}
