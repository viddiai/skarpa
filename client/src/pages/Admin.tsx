import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { getAdminToken, adminFetch } from "@/lib/adminAuth";
import AdminHeader from "@/components/admin/AdminHeader";
import OverviewTab from "@/components/admin/OverviewTab";
import ContactsTab from "@/components/admin/ContactsTab";
import OutreachTab from "@/components/admin/OutreachTab";
import BookingsTab from "@/components/admin/BookingsTab";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Admin() {
  const [, navigate] = useLocation();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const token = getAdminToken();
    if (!token) {
      navigate("/admin/login");
      return;
    }
    // Quick auth check against the server
    adminFetch("/api/admin/analytics?days=1")
      .then((res) => {
        if (res.ok) {
          setAuthorized(true);
        } else {
          navigate("/admin/login");
        }
      })
      .catch(() => navigate("/admin/login"));
  }, [navigate]);

  if (!authorized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Verifierar…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <AdminHeader />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <Tabs defaultValue="overview">
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Översikt</TabsTrigger>
            <TabsTrigger value="contacts">Kontakter</TabsTrigger>
            <TabsTrigger value="outreach">Outreach</TabsTrigger>
            <TabsTrigger value="bookings">Bokningar</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <OverviewTab />
          </TabsContent>
          <TabsContent value="contacts">
            <ContactsTab />
          </TabsContent>
          <TabsContent value="outreach">
            <OutreachTab />
          </TabsContent>
          <TabsContent value="bookings">
            <BookingsTab />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
