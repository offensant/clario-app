"use client";

import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Plus, MoreHorizontal, Phone, Mail, Calendar } from "lucide-react";
import { useState } from "react";

type Prospect = {
  id: string;
  name: string;
  company: string;
  value: string;
  lastContact: string;
};

const initialColumns: Record<string, { label: string; color: string; prospects: Prospect[] }> = {
  high: {
    label: "High Probability",
    color: "#22C55E",
    prospects: [
      { id: "1", name: "Sarah Chen", company: "TechFlow", value: "$12,400", lastContact: "2 days ago" },
      { id: "2", name: "Marc Dupont", company: "DataPulse", value: "$8,200", lastContact: "1 day ago" },
    ],
  },
  risk: {
    label: "At Risk",
    color: "#EF4444",
    prospects: [
      { id: "3", name: "James Wilson", company: "WidgetLab", value: "$15,600", lastContact: "12 days ago" },
    ],
  },
  value: {
    label: "High Value",
    color: "#F97316",
    prospects: [
      { id: "4", name: "Ana Rodriguez", company: "ScaleUp Inc", value: "$24,000", lastContact: "5 days ago" },
      { id: "5", name: "Tom Baker", company: "GrowthCo", value: "$18,500", lastContact: "3 days ago" },
    ],
  },
  stagnant: {
    label: "Stagnant",
    color: "#6B7280",
    prospects: [
      { id: "6", name: "Lisa Park", company: "NovaTech", value: "$6,800", lastContact: "21 days ago" },
    ],
  },
};

function MiniChart() {
  const data = [20, 35, 28, 45, 40, 55, 50, 65, 60, 72];
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 280;
  const h = 80;
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / range) * h}`).join(" ");
  return (
    <svg width="100%" height={h} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="mt-2">
      <polyline points={pts} fill="none" stroke="#F97316" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default function PipelinePage() {
  const [columns, setColumns] = useState(initialColumns);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newName, setNewName] = useState("");
  const [newCompany, setNewCompany] = useState("");
  const [newValue, setNewValue] = useState("");

  const handleAdd = () => {
    if (!newName.trim()) return;
    const updated = { ...columns };
    updated.high.prospects.push({
      id: Date.now().toString(),
      name: newName,
      company: newCompany,
      value: newValue || "$0",
      lastContact: "Just now",
    });
    setColumns(updated);
    setShowAddModal(false);
    setNewName("");
    setNewCompany("");
    setNewValue("");
  };

  const handleDelete = (colKey: string, id: string) => {
    const updated = { ...columns };
    updated[colKey].prospects = updated[colKey].prospects.filter((p) => p.id !== id);
    setColumns(updated);
  };

  return (
    <DashboardLayout title="Pipeline">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-foreground">Pipeline</h2>
            <p className="text-muted-foreground mt-1">Track and manage your prospects.</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-primary hover:bg-[#EA6C00] text-white text-sm font-medium rounded-xl transition-colors"
          >
            <Plus size={16} />
            Add prospect
          </button>
        </div>

        {/* Pipeline Evolution Chart */}
        <div className="glass-card p-6">
          <p className="text-sm font-semibold text-foreground mb-2">Pipeline Evolution</p>
          <MiniChart />
        </div>

        {/* Kanban */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {Object.entries(columns).map(([key, col]) => (
            <div key={key} className="space-y-3">
              <div className="flex items-center gap-2 px-1">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: col.color }} />
                <span className="text-sm font-semibold text-foreground">{col.label}</span>
                <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">{col.prospects.length}</span>
              </div>

              <div className="space-y-2">
                {col.prospects.map((p) => (
                  <div
                    key={p.id}
                    className="glass-card p-4 hover:border-l-2 hover:border-l-primary transition-all cursor-pointer"
                    style={{ borderRadius: "14px" }}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-semibold text-foreground">{p.name}</p>
                        <p className="text-xs text-muted-foreground">{p.company}</p>
                      </div>
                      <button
                        onClick={() => handleDelete(key, p.id)}
                        className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-destructive/10 transition-colors"
                      >
                        <MoreHorizontal size={14} className="text-muted-foreground" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-sm font-bold text-primary">{p.value}</span>
                      <span className="text-xs text-muted-foreground">{p.lastContact}</span>
                    </div>
                    <div className="flex gap-1.5 mt-3">
                      <button className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-accent transition-colors">
                        <Phone size={12} className="text-muted-foreground" />
                      </button>
                      <button className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-accent transition-colors">
                        <Mail size={12} className="text-muted-foreground" />
                      </button>
                      <button className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-accent transition-colors">
                        <Calendar size={12} className="text-muted-foreground" />
                      </button>
                    </div>
                  </div>
                ))}

                {/* Add card */}
                <button
                  onClick={() => setShowAddModal(true)}
                  className="w-full py-3 border-2 border-dashed border-border rounded-xl text-sm text-muted-foreground hover:border-primary/30 hover:text-primary transition-colors"
                >
                  + Add
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Add modal */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={() => setShowAddModal(false)}>
            <div className="glass-card p-8 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
              <h3 className="text-lg font-semibold text-foreground mb-6">Add prospect</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground block mb-1.5">Name</label>
                  <input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Full name" className="w-full h-11 px-4 rounded-xl bg-background border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-1.5">Company</label>
                  <input value={newCompany} onChange={(e) => setNewCompany(e.target.value)} placeholder="Company name" className="w-full h-11 px-4 rounded-xl bg-background border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground block mb-1.5">Estimated value</label>
                  <input value={newValue} onChange={(e) => setNewValue(e.target.value)} placeholder="$10,000" className="w-full h-11 px-4 rounded-xl bg-background border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30" />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={() => setShowAddModal(false)} className="flex-1 h-11 rounded-xl border border-border text-sm font-medium text-foreground hover:bg-accent transition-colors">Cancel</button>
                <button onClick={handleAdd} className="flex-1 h-11 rounded-xl bg-primary hover:bg-[#EA6C00] text-white text-sm font-medium transition-colors">Add prospect</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
