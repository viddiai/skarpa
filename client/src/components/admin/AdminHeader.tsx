import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { clearAdminToken } from "@/lib/adminAuth";
import { LogOut } from "lucide-react";

export default function AdminHeader() {
  const [, navigate] = useLocation();

  function handleLogout() {
    clearAdminToken();
    navigate("/admin/login");
  }

  return (
    <header className="border-b bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-lg font-semibold">
            <span className="text-primary">skarp</span>
            <span className="text-red-600">a</span>
          </span>
          <span className="text-sm text-muted-foreground hidden sm:inline">
            Admin Dashboard
          </span>
        </div>
        <Button variant="ghost" size="sm" onClick={handleLogout}>
          <LogOut className="w-4 h-4 mr-2" />
          Logga ut
        </Button>
      </div>
    </header>
  );
}
