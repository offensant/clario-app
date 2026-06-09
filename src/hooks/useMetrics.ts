import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export function useMetrics(workspaceId: string | undefined | null) {
  const [metrics, setMetrics] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      if (!workspaceId) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("metrics_daily")
        .select("*")
        .eq("workspace_id", workspaceId)
        .order("date", { ascending: false })
        .limit(30);

      if (data && !error && data.length > 0) {
        setMetrics(data.reverse()); // chronological for charts
      } else {
        // Mock data
        const mock = Array.from({ length: 30 }).map((_, i) => {
          const date = new Date();
          date.setDate(date.getDate() - (29 - i));
          return {
            id: `mock-${i}`,
            date: date.toISOString().split("T")[0],
            mrr: 10000 + (i * 200) + Math.random() * 500,
            active_clients: 20 + Math.floor(i / 3),
            calls_booked: Math.floor(Math.random() * 5),
            conversion_rate: 0.15 + (Math.random() * 0.05),
            cash_runway: 12 + (i * 0.1),
            roas: 3.5 + (Math.random() * 1.5),
            cac: 40 + Math.random() * 10
          };
        });
        setMetrics(mock);
      }
      setLoading(false);
    };

    fetchMetrics();
  }, [workspaceId]);

  return { metrics, loading };
}
