import { ArrowDownRight } from "lucide-react";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="page-hero">
      <div className="container page-hero__grid">
        <div>
          <p className="eyebrow"><span aria-hidden="true" />{eyebrow}</p>
          <h1>{title}</h1>
        </div>
        <div className="page-hero__aside">
          <ArrowDownRight aria-hidden="true" />
          <p>{description}</p>
        </div>
      </div>
    </section>
  );
}
