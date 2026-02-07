import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { ChildProfile, createChild, listChildren } from "../api/children.api";
import { getBadges, getProgress, getStreak, getXp, BadgeSummary } from "../api/progress.api";

export type ChildInsights = {
  progress: Awaited<ReturnType<typeof getProgress>> | null;
  xp: Awaited<ReturnType<typeof getXp>> | null;
  streak: Awaited<ReturnType<typeof getStreak>> | null;
  badges: BadgeSummary[] | null;
};

type ChildContextValue = {
  children: ChildProfile[];
  activeChild: ChildProfile | null;
  insights: ChildInsights;
  loading: boolean;
  refreshChildren: () => Promise<void>;
  selectChild: (child: ChildProfile) => void;
  addChild: (payload: { displayName: string; age: number }) => Promise<void>;
  refreshInsights: () => Promise<void>;
};

const ChildContext = createContext<ChildContextValue | undefined>(undefined);

export const ChildProvider = ({ children }: { children: React.ReactNode }) => {
  const [childList, setChildList] = useState<ChildProfile[]>([]);
  const [activeChild, setActiveChild] = useState<ChildProfile | null>(null);
  const [insights, setInsights] = useState<ChildInsights>({
    progress: null,
    xp: null,
    streak: null,
    badges: null
  });
  const [loading, setLoading] = useState(false);

  const refreshChildren = async () => {
    setLoading(true);
    const data = await listChildren();
    setChildList(data);
    if (!activeChild && data.length) {
      setActiveChild(data[0]);
    }
    setLoading(false);
  };

  const refreshInsights = async () => {
    if (!activeChild) {
      return;
    }
    const [progress, xp, streak, badges] = await Promise.all([
      getProgress(activeChild.id),
      getXp(activeChild.id),
      getStreak(activeChild.id),
      getBadges(activeChild.id)
    ]);
    setInsights({ progress, xp, streak, badges });
  };

  const addChild = async (payload: { displayName: string; age: number }) => {
    const newChild = await createChild(payload);
    setChildList((prev) => [...prev, newChild]);
    setActiveChild(newChild);
  };

  useEffect(() => {
    if (activeChild) {
      refreshInsights();
    }
  }, [activeChild?.id]);

  const value = useMemo(
    () => ({
      children: childList,
      activeChild,
      insights,
      loading,
      refreshChildren,
      selectChild: setActiveChild,
      addChild,
      refreshInsights
    }),
    [childList, activeChild, insights, loading]
  );

  return <ChildContext.Provider value={value}>{children}</ChildContext.Provider>;
};

export const useChild = () => {
  const context = useContext(ChildContext);
  if (!context) {
    throw new Error("useChild must be used within ChildProvider");
  }
  return context;
};
