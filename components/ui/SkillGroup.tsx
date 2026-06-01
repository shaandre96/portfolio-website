import { Fragment } from "react";
import type { SkillGroupData } from "@/lib/data/skills";

export function SkillGroup({ group }: { group: SkillGroupData }) {
  return (
    <div className="group">
      <div className="g-head">
        <span className="g-mark" aria-hidden="true" />
        <span className="g-label">{group.label}</span>
        <span className="g-count" aria-hidden="true">
          {group.count}
        </span>
      </div>
      <div className="pills">
        {group.skills.map((skill, i) => {
          const prev = group.skills[i - 1];
          const showLead = skill.sub && !prev?.sub;
          return (
            <Fragment key={skill.name}>
              {showLead && (
                <span className="sub-lead" aria-hidden="true">
                  ↳
                </span>
              )}
              <span className={`pill ${skill.sub ? "sub" : ""}`.trim()}>
                {skill.name}
              </span>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}
