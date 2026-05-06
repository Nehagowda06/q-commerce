import {
  Bell,
  ChevronRight,
  CreditCard,
  HelpCircle,
  LogOut,
  MapPin,
  Settings,
} from "lucide-react";
import PageWrapper from "@/components/layout/PageWrapper";
<<<<<<< HEAD
import { Bell, ChevronRight, CreditCard, HelpCircle, LogOut, MapPin, Settings } from "lucide-react";
=======
>>>>>>> 63d8498fee391372fe81c736efc013a7056ac583

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
        <div className="mb-8 flex items-center gap-4">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-primary/10 text-3xl font-black text-brand-primary">
            JD
          </div>
          <div>
            <h1 className="text-2xl font-black leading-tight text-brand-text">John Doe</h1>
            <p className="text-sm text-brand-text-muted">+91 98765 43210</p>
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-soft">
          {menuItems.map((item, index) => (
            <div
              key={item.label}
              className={`flex cursor-pointer items-center justify-between p-4 transition-colors hover:bg-gray-50 ${
                index !== menuItems.length - 1 ? "border-b border-gray-50" : ""
              }`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gray-50 ${
                    item.color || "text-gray-600"
                  }`}
                >
                  <item.icon size={20} />
                </div>
                <span className={`text-sm font-bold ${item.color || "text-brand-text"}`}>
                  {item.label}
                </span>
              </div>
              <div className="text-gray-300">
                <ChevronRight size={16} />
              </div>
            </div>
          ))}
        </div>
<<<<<<< HEAD
        
        <p className="text-center text-[10px] text-gray-400 font-bold mt-8 uppercase tracking-widest">
          Savega Version 1.0.42
=======

        <p className="mt-8 text-center text-[10px] font-bold uppercase tracking-widest text-gray-400">
          Version 1.0.42
>>>>>>> 63d8498fee391372fe81c736efc013a7056ac583
        </p>
      </div>
    </PageWrapper>
  );
}
