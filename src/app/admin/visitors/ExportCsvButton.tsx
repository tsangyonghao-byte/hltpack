"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import { toast } from "sonner";
import { exportVisitorLogsCsv } from "@/actions/visitorActions";

export default function ExportCsvButton({ label }: { label: string }) {
  const [loading, setLoading] = useState(false);

  const handleExport = async () => {
    setLoading(true);
    toast.info("Exporting visitor logs...");
    try {
      const csvData = await exportVisitorLogsCsv();
      const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `visitor-logs-${new Date().toISOString().split("T")[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("Visitor logs exported successfully");
    } catch (err: any) {
      console.error(err);
      toast.error("Failed to export logs");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleExport}
      disabled={loading}
      className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-medium text-sm px-4 py-2.5 shadow-sm transition cursor-pointer"
    >
      <Download className="w-4 h-4" />
      {label}
    </button>
  );
}
