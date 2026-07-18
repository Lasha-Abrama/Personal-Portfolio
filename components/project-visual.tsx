import type { ProjectVisual as ProjectVisualType } from "@/types/portfolio";

export function ProjectVisual({ type }: { type: ProjectVisualType }) {
  if (type === "finance") {
    return (
      <div className="project-visual project-visual--finance" aria-hidden="true">
        <div className="visual-top"><span /><span /><span /></div>
        <div className="finance-total"><small>Available balance</small><strong>$12,480.00</strong><i>+8.4%</i></div>
        <div className="finance-grid">
          <div className="mini-chart"><span /><span /><span /><span /><span /><span /></div>
          <div className="finance-ring"><span>72%</span></div>
        </div>
      </div>
    );
  }

  if (type === "atlas") {
    return (
      <div className="project-visual project-visual--atlas" aria-hidden="true">
        <div className="visual-top"><span /><span /><span /></div>
        <div className="atlas-orbit atlas-orbit--one" />
        <div className="atlas-orbit atlas-orbit--two" />
        <div className="atlas-globe"><span>42° N</span><i /></div>
        <div className="atlas-card atlas-card--a"><small>Weather</small><strong>18°</strong></div>
        <div className="atlas-card atlas-card--b"><small>Explore</small><strong>253</strong></div>
      </div>
    );
  }

  if (type === "analytics") {
    return (
      <div className="project-visual project-visual--analytics" aria-hidden="true">
        <div className="visual-top"><span /><span /><span /></div>
        <div className="analytics-kpis"><span><small>Visits</small><strong>2,481</strong></span><span><small>Revenue</small><strong>$184K</strong></span></div>
        <div className="analytics-body">
          <div className="line-chart"><i /><i /><i /><i /><i /></div>
          <div className="donut"><span>84%</span></div>
        </div>
      </div>
    );
  }

  return (
    <div className="project-visual project-visual--directory" aria-hidden="true">
      <div className="visual-top"><span /><span /><span /></div>
      <div className="directory-search" />
      <div className="directory-grid">
        {[0, 1, 2, 3].map((item) => <span key={item}><i /><b /><small /></span>)}
      </div>
    </div>
  );
}

