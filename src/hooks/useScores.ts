import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export function useScores(workspaceId: string | undefined | null) {
  const [scores, setScores] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScores = async () => {
      if (!workspaceId) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("axo_scores")
        .select("*")
        .eq("workspace_id", workspaceId)
        .order("calculated_at", { ascending: false })
        .limit(1)
        .single();

      if (data && !error) {
        setScores(data);
      } else {
        // Mock if empty
        setScores({
          business_pulse: 7.2,
          revenue_stability: 8.4,
          client_dependency: "MODERATE",
          lead_leverage: 5.8,
          execution_score: 6.1
        });
      }
      setLoading(false);
    };

    fetchScores();
  }, [workspaceId]);

  return { scores, loading };
}
