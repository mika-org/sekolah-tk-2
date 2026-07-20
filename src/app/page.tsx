"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LandingPage from "@/components/home/LandingPage";
import PpdbForm from "@/components/ppdb/PpdbForm";

export default function Home() {
  const [currentTab, setCurrentTab] = useState<"home" | "ppdb">("home");

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* Sticky Top Navbar */}
      <Navbar currentTab={currentTab} setCurrentTab={setCurrentTab} />

      {/* Main View Area */}
      <main className="flex-1">
        {currentTab === "home" ? (
          <LandingPage onStartRegistration={() => setCurrentTab("ppdb")} />
        ) : (
          <PpdbForm onBackToHome={() => setCurrentTab("home")} />
        )}
      </main>

      {/* Global Brand Footer */}
      <Footer />
    </div>
  );
}
