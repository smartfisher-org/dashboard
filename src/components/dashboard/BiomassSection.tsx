import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FishCountCard } from "./FishCountCard";
import { BiomassCard } from "./BiomassCard";
import { DistributionCard } from "./DistributionCard";
import { KFactorCard } from "./KFactorCard";

export function BiomassSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <FishCountCard />
      <BiomassCard />
      <DistributionCard />
      <KFactorCard />
    </div>
  );
}