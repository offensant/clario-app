import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export function useActions(workspaceId: string | undefined | null) {
  const [actions, setActions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchActions = async () => {
    if (!workspaceId) {
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("axo_actions")
      .select("*")
      .eq("workspace_id", workspaceId)
      .eq("status", "pending")
      .order("priority_score", { ascending: false });

    if (data && !error && data.length > 0) {
      setActions(data);
    } else {
      setActions([
        { id: "mock-1", action_text: "Launch the Q3 acquisition campaign", priority_score: 9.5, status: "pending" },
        { id: "mock-2", action_text: "Review the pricing model for Top Tier clients", priority_score: 8.2, status: "pending" },
        { id: "mock-3", action_text: "Hire a dedicated account manager", priority_score: 7.4, status: "pending" }
      ]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchActions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workspaceId]);

  const markDone = async (id: string) => {
    if (!id.startsWith("mock-")) {
      await supabase.from("axo_actions").update({ status: "done" }).eq("id", id);
    }
    setActions(actions.filter(a => a.id !== id));
  };

  const markSkipped = async (id: string) => {
    if (!id.startsWith("mock-")) {
      await supabase.from("axo_actions").update({ status: "skipped" }).eq("id", id);
    }
    setActions(actions.filter(a => a.id !== id));
  };

  return { actions, loading, markDone, markSkipped, refresh: fetchActions };
}
