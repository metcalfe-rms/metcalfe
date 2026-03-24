import { ActionGrid } from "@/components/workspace/action-grid";
import { PageHero } from "@/components/workspace/page-hero";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { missionCards } from "@/lib/metcalfe";

export default function MissionsPage() {
  return (
    <div className="space-y-6">
      <PageHero
        eyebrow="Mission pages"
        title="Operational missions group the platform’s bigger workflows into a simple hub."
        description="This page stands in for the broader mission-oriented flows you mentioned and points users to the project, readiness, camera, and team routes that now work."
        meta={[
          { label: "Focus", value: "Launch, readiness, coverage, permissions" },
          { label: "Audience", value: "Admins, clients, contractors" },
          { label: "Mode", value: "Grouped hub for mission workflows" },
        ]}
      />

      <ActionGrid items={missionCards} />

      <Card className="rounded-[1.75rem] border-slate-200 bg-white/95">
        <CardHeader>
          <CardTitle className="text-2xl">How to use this hub</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          {[
            "Start here when the user describes a goal rather than a page name.",
            "Each mission card lands on a route-backed process instead of a placeholder.",
            "Use the utility pages hub when the request sounds small or ambiguous.",
          ].map((item) => (
            <div key={item} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
              {item}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

