import PageWrapper from "@/components/layout/PageWrapper";
import { User, Settings, CreditCard, MapPin, Bell, HelpCircle, LogOut } from "lucide-react";

const menuItems = [
  { icon: CreditCard, label: "Payments & Refunds" },
  { icon: MapPin, label: "My Addresses" },
  { icon: Bell, label: "Notifications" },
  { icon: Settings, label: "Settings" },
  { icon: HelpCircle, label: "Customer Support" },
  { icon: LogOut, label: "Log Out", color: "text-red-500" },
];

export default function ProfilePage() {
  return (
    <PageWrapper>
      <div className="p-4">
        {/* Profile Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-20 h-20 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary text-3xl font-black">
            JD
          </div>
          <div>
            <h1 className="text-2xl font-black text-brand-text leading-tight">John Doe</h1>
            <p className="text-sm text-brand-text-muted">+91 98765 43210</p>
          </div>
        </div>

        {/* Menu Items */}
        <div className="bg-white rounded-3xl shadow-soft border border-gray-100 overflow-hidden">
          {menuItems.map((item, i) => (
            <div 
              key={i} 
              className={`flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                i !== menuItems.length - 1 ? "border-b border-gray-50" : ""
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center ${item.color || "text-gray-600"}`}>
                  <item.icon size={20} />
                </div>
                <span className={`font-bold text-sm ${item.color || "text-brand-text"}`}>{item.label}</span>
              </div>
              <div className="text-gray-300">
                <Settings size={16} /> {/* Using Settings as a generic chevron-like icon for now, or just remove */}
              </div>
            </div>
          ))}
        </div>
        
        <p className="text-center text-[10px] text-gray-400 font-bold mt-8 uppercase tracking-widest">
          Version 1.0.42
        </p>
      </div>
    </PageWrapper>
  );
}
