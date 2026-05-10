"use client";

import { ArrowLeft, Camera } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import PageWrapper from "@/components/layout/PageWrapper";

export default function EditProfilePage() {
  const [name, setName] = useState("Savega User");
  const [phone, setPhone] = useState("+91 98765 43210");
  const [email, setEmail] = useState("user@savega.in");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <PageWrapper>
      <div className="p-3">
        <div className="flex items-center gap-3 mb-5">
          <Link href="/profile">
            <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-brand-text">
              <ArrowLeft size={18} strokeWidth={2.5} />
            </div>
          </Link>
          <h1 className="text-base font-black text-brand-text">Edit Profile</h1>
        </div>

        {/* Avatar */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary text-2xl font-black">
              SV
            </div>
            <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-brand-primary text-white flex items-center justify-center shadow-soft">
              <Camera size={14} strokeWidth={2.5} />
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {[
            { label: "Full Name", value: name, setter: setName, type: "text" },
            { label: "Phone Number", value: phone, setter: setPhone, type: "tel" },
            { label: "Email Address", value: email, setter: setEmail, type: "email" },
          ].map(({ label, value, setter, type }) => (
            <div key={label}>
              <label className="block text-[10px] font-black text-brand-text-muted uppercase tracking-wider mb-1">
                {label}
              </label>
              <input
                type={type}
                value={value}
                onChange={(e) => setter(e.target.value)}
                className="w-full h-11 px-3 rounded-xl border border-gray-200 bg-white text-xs font-bold text-brand-text focus:outline-none focus:border-brand-primary transition-colors"
              />
            </div>
          ))}
        </div>

        <button
          onClick={handleSave}
          className={`mt-6 w-full h-11 rounded-xl text-xs font-black uppercase tracking-widest transition-colors ${
            saved ? "bg-brand-accent text-white" : "bg-brand-primary text-white"
          }`}
        >
          {saved ? "✓ Saved!" : "Save Changes"}
        </button>
      </div>
    </PageWrapper>
  );
}
