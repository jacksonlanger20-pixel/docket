"use client";

import { useMemo, useState } from "react";
import { opportunities } from "@/lib/data";
import type { City } from "@/lib/types";
import { CityFilter } from "./CityFilter";
import { PageHeader } from "./PageHeader";
import { OpportunitiesTable } from "./OpportunitiesTable";

export function OpportunitiesPageClient() {
  const [city, setCity] = useState<City>("All");

  const filtered = useMemo(() => {
    if (city === "All") return opportunities;
    return opportunities.filter((o) => o.city === city);
  }, [city]);

  return (
    <>
      <PageHeader
        title="Opportunities"
        description="Investment banking summer analyst positions currently accepting applications."
      />
      <CityFilter selected={city} onChange={setCity} />
      <OpportunitiesTable opportunities={filtered} />
    </>
  );
}
