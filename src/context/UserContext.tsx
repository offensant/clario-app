"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import type { User } from "@supabase/supabase-js";

interface UserContextType {
  user: User | null;
  profile: { full_name: string; email: string; avatar_url: string | null } | null;
  loading: boolean;
  updateProfile: (data: { full_name?: string; avatar_url?: string }) => Promise<void>;
  signOut: () => Promise<void>;
}

const UserContext = createContext<UserContextType>({
  user: null,
  profile: null,
  loading: true,
  updateProfile: async () => {},
  signOut: async () => {},
});

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserContextType["profile"]>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
        const { data } = await supabase
          .from("users")
          .select("full_name, email, avatar_url")
          .eq("id", session.user.id)
          .single();
        if (data) setProfile(data);
      }
      setLoading(false);
    };
    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (session?.user) {
          setUser(session.user);
          const { data } = await supabase
            .from("users")
            .select("full_name, email, avatar_url")
            .eq("id", session.user.id)
            .single();
          if (data) setProfile(data);
        } else {
          setUser(null);
          setProfile(null);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const updateProfile = async (data: { full_name?: string; avatar_url?: string }) => {
    if (!user) return;
    await supabase.from("users").update(data).eq("id", user.id);
    setProfile((prev) => prev ? { ...prev, ...data } : prev);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
  };

  return (
    <UserContext.Provider value={{ user, profile, loading, updateProfile, signOut }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
