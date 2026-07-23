"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LandingPage from "@/components/home/LandingPage";
import PpdbForm from "@/components/ppdb/PpdbForm";

export default function Home() {
  const [currentTab, setCurrentTab] = useState<"home" | "ppdb">("home");
  const [schools, setSchools] = useState<any[]>([]);
  const [selectedSchoolCode, setSelectedSchoolCode] = useState<string>("dekeraton");

  useEffect(() => {
    fetch("/api/schools")
      .then((r) => r.json())
      .then((data) => {
        if (data.success && data.data?.length) {
          setSchools(data.data);
          // Default to first school if current selected is invalid
          if (!data.data.some((s: any) => s.code === selectedSchoolCode)) {
            setSelectedSchoolCode(data.data[0].code);
          }
        }
      })
      .catch((err) => console.error("Error loading schools:", err));
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* Sticky Top Navbar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        selectedSchoolCode={selectedSchoolCode}
        onSelectSchool={setSelectedSchoolCode}
        schools={schools}
      />

      {/* Main View Area */}
      <main className="flex-1">
        {currentTab === "home" ? (
          <LandingPage
            onStartRegistration={() => setCurrentTab("ppdb")}
            selectedSchoolCode={selectedSchoolCode}
          />
        ) : (
          <PpdbForm
            onBackToHome={() => setCurrentTab("home")}
            selectedSchoolCode={selectedSchoolCode}
            schools={schools}
          />
        )}
      </main>

      {/* Global Brand Footer */}
      <Footer selectedSchoolCode={selectedSchoolCode} />
    </div>
  );
}
