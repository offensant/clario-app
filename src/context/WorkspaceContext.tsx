"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useUser } from "@/context/UserContext";

interface Workspace {
  id: string;
  name: string;
  slug: string;
}

interface BusinessProfile {
  business_type: string;
  mrr: number;
  active_clients: number;
  goal_90d: number;
}

interface WorkspaceContextType {
  workspace: Workspace | null;
  businessProfile: BusinessProfile | null;
  businessType: string;
  role: string;
  loading: boolean;
  refreshWorkspace: () => Promise<void>;
}

const WorkspaceContext = createContext<WorkspaceContextType>({
  workspace: null,
  businessProfile: null,
  businessType: "agency",
  role: "owner",
  loading: true,
  refreshWorkspace: async () => {},
});

export function WorkspaceProvider({ children }: { children: React.ReactNode }) {
  const { user } = useUser();
  const [workspace, setWorkspace] = useState<Workspace | null>(null);
  const [businessProfile, setBusinessProfile] = useState<BusinessProfile | null>(null);
  const [role, setRole] = useState("owner");
  const [loading, setLoading] = useState(true);

  const loadWorkspace = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    // Get user's workspace membership
    const { data: membership } = await supabase
      .from("workspace_members")
      .select("workspace_id, role")
      .eq("user_id", user.id)
      .single();

    if (membership) {
      setRole(membership.role);

      // Get workspace
      const { data: ws } = await supabase
        .from("workspaces")
        .select("*")
        .eq("id", membership.workspace_id)
        .single();

      if (ws) setWorkspace(ws);

      // Get business profile
      const { data: bp } = await supabase
        .from("business_profiles")
        .select("*")
        .eq("workspace_id", membership.workspace_id)
        .single();

      if (bp) setBusinessProfile(bp);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadWorkspace();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const businessType = businessProfile?.business_type || "agency";

  return (
    <WorkspaceContext.Provider
      value={{
        workspace,
        businessProfile,
        businessType,
        role,
        loading,
        refreshWorkspace: loadWorkspace,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  return useContext(WorkspaceContext);
}
