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
    let detectedCode = "";

    if (typeof window !== "undefined") {
      const host = window.location.hostname.toLowerCase();
      // Match subdomain e.g. cikarang.elevore.web.id -> cikarang
      const hostParts = host.split(".");
      if (hostParts.length >= 3 && hostParts[0] !== "www" && hostParts[0] !== "localhost" && hostParts[0] !== "127") {
        detectedCode = hostParts[0];
      }

      if (!detectedCode) {
        if (host.includes("cikarang")) detectedCode = "cikarang";
        else if (host.includes("dekeraton")) detectedCode = "dekeraton";
      }

      const params = new URLSearchParams(window.location.search);
      const qSchool = params.get("school") || params.get("code") || params.get("cabang");
      if (qSchool) {
        detectedCode = qSchool.toLowerCase();
      }
    }

    fetch("/api/schools")
      .then((r) => r.json())
      .then((data) => {
        if (data.success && data.data?.length) {
          const loadedSchools = data.data;
          setSchools(loadedSchools);

          if (detectedCode) {
            const matched = loadedSchools.find(
              (s: any) =>
                s.code.toLowerCase() === detectedCode ||
                s.code.toLowerCase().includes(detectedCode) ||
                detectedCode.includes(s.code.toLowerCase()) ||
                s.name.toLowerCase().includes(detectedCode)
            );
            if (matched) {
              setSelectedSchoolCode(matched.code);
              return;
            }
          }

          if (typeof window !== "undefined") {
            const host = window.location.hostname.toLowerCase();
            const matchedHost = loadedSchools.find((s: any) =>
              host.includes(s.code.toLowerCase()) ||
              s.code.toLowerCase().includes(host.split(".")[0])
            );
            if (matchedHost) {
              setSelectedSchoolCode(matchedHost.code);
              return;
            }
          }

          if (!loadedSchools.some((s: any) => s.code === selectedSchoolCode)) {
            setSelectedSchoolCode(loadedSchools[0].code);
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
