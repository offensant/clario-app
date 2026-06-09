"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

const translations: Record<string, string> = {
  // Navigation
  "nav.today": "Today",
  "nav.today.fr": "Aujourd'hui",
  "nav.intelligence": "Intelligence",
  "nav.intelligence.fr": "Intelligence",
  "nav.pipeline": "Pipeline",
  "nav.pipeline.fr": "Pipeline",
  "nav.acquisition": "Acquisition",
  "nav.acquisition.fr": "Acquisition",
  "nav.revenue": "Revenue",
  "nav.revenue.fr": "Revenus",
  "nav.timeline": "Timeline",
  "nav.timeline.fr": "Historique",
  "nav.axo": "Axo",
  "nav.axo.fr": "Axo",
  "nav.settings": "Settings",
  "nav.settings.fr": "Paramètres",

  // Dashboard
  "dashboard.business_pulse": "Business Pulse",
  "dashboard.business_pulse.fr": "Pouls Business",
  "dashboard.todays_action": "Today's Highest Leverage Action",
  "dashboard.todays_action.fr": "Action Prioritaire du Jour",
  "dashboard.core_snapshot": "Core Snapshot",
  "dashboard.core_snapshot.fr": "Aperçu Clé",
  "dashboard.insights": "Insights",
  "dashboard.insights.fr": "Signaux",

  // Actions
  "action.start": "Start",
  "action.start.fr": "Démarrer",
  "action.done": "Done",
  "action.done.fr": "Terminé",
  "action.skip": "Skip",
  "action.skip.fr": "Passer",
  "action.save": "Save",
  "action.save.fr": "Sauvegarder",
  "action.cancel": "Cancel",
  "action.cancel.fr": "Annuler",
  "action.connect": "Connect",
  "action.connect.fr": "Connecter",
  "action.connected": "Connected",
  "action.connected.fr": "Connecté",
  "action.coming_soon": "Coming Soon",
  "action.coming_soon.fr": "Bientôt disponible",
  "action.upgrade": "Upgrade",
  "action.upgrade.fr": "Passer au Pro",
  "action.sign_out": "Sign out",
  "action.sign_out.fr": "Se déconnecter",

  // Auth
  "auth.sign_in": "Sign in",
  "auth.sign_in.fr": "Se connecter",
  "auth.create_account": "Create account",
  "auth.create_account.fr": "Créer un compte",
  "auth.welcome_back": "Welcome back",
  "auth.welcome_back.fr": "Bon retour",
  "auth.welcome_back_sub": "Sign in to your account to continue.",
  "auth.welcome_back_sub.fr": "Connectez-vous à votre compte.",
  "auth.create_sub": "Start understanding your business.",
  "auth.create_sub.fr": "Commencez à comprendre votre business.",

  // Pipeline
  "pipeline.add_prospect": "Add prospect",
  "pipeline.add_prospect.fr": "Ajouter un prospect",
  "pipeline.empty": "Your pipeline is empty",
  "pipeline.empty.fr": "Votre pipeline est vide",

  // Settings
  "settings.profile": "Profile",
  "settings.profile.fr": "Profil",
  "settings.workspace": "Workspace",
  "settings.workspace.fr": "Espace de travail",
  "settings.integrations": "Integrations",
  "settings.integrations.fr": "Intégrations",
  "settings.billing": "Billing",
  "settings.billing.fr": "Facturation",
  "settings.security": "Security",
  "settings.security.fr": "Sécurité",
  "settings.members": "Members",
  "settings.members.fr": "Membres",
  "settings.invite_member": "Invite member",
  "settings.invite_member.fr": "Inviter un membre",
  "settings.change_role": "Change role",
  "settings.change_role.fr": "Changer le rôle",
  "settings.remove": "Remove",
  "settings.remove.fr": "Retirer",
  "settings.upload_photo": "Upload photo",
  "settings.upload_photo.fr": "Télécharger une photo",
  "settings.language": "Language",
  "settings.language.fr": "Langue",
  "settings.theme": "Theme",
  "settings.theme.fr": "Thème",
  "settings.free_plan": "Free Plan",
  "settings.free_plan.fr": "Plan Gratuit",

  // General
  "general.no_actions": "No actions yet",
  "general.no_actions.fr": "Aucune action pour l'instant",
  "general.generate_pl": "Generate P&L Card",
  "general.generate_pl.fr": "Générer la carte P&L",
};

type Lang = "EN" | "FR";

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "EN",
  setLang: () => {},
  t: (key: string) => key,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>("EN");

  useEffect(() => {
    const saved = localStorage.getItem("clario_lang") as Lang;
    if (saved === "EN" || saved === "FR") {
      setLangState(saved);
    }
  }, []);

  const setLang = useCallback((newLang: Lang) => {
    setLangState(newLang);
    localStorage.setItem("clario_lang", newLang);
  }, []);

  const t = useCallback(
    (key: string) => {
      if (lang === "FR") {
        return translations[key + ".fr"] || translations[key] || key;
      }
      return translations[key] || key;
    },
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
