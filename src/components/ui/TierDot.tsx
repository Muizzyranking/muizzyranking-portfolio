import type { StackTier } from "@/lib/stack";

const TIER_DOT_CLASS: Record<StackTier, string> = {
  production: "bg-accent",
  comfortable: "border-[1.5px] border-text-muted",
  exploring: "border-[1.5px] border-dashed border-text-muted",
};

export default function TierDot({ tier }: { tier: StackTier }) {
  return <span aria-hidden="true" className={`inline-block size-[6px] shrink-0 rounded-full ${TIER_DOT_CLASS[tier]}`} />;
}
