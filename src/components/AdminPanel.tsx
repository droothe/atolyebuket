import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { loadOrders, saveOrders, type Order, type OrderStatus } from "@/lib/orders";
import { categories } from "@/lib/catalog";

const statuses: OrderStatus[] = ["Yeni", "Hazırlanıyor", "Teslim Edildi"];
const statusStyle: Record<OrderStatus, string> = {
  Yeni: "bg-gold-gradient text-primary",
  Hazırlanıyor: "bg-rose/25 text-foreground",
  "Teslim Edildi": "bg-muted text-muted-foreground",
};

export function AdminPanel({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const [orders, setOrders] = useState<Order[]>([]);
  useEffect(() => {
    if (open) setOrders(loadOrders());
  }, [open]);

  const update = (id: string, status: OrderStatus) => {
    const next = orders.map((o) => (o.id === id ? { ...o, status } : o));
    setOrders(next);
    saveOrders(next);
  };

  const count = (s: OrderStatus) => orders.filter((o) => o.status === s).length;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] w-[calc(100vw-1.5rem)] max-w-4xl overflow-y-auto border-gold/40 bg-card p-4 sm:p-8">
        <DialogHeader className="text-left">
          <p className="text-xs uppercase tracking-[0.3em] text-gold-deep">Yönetim Paneli · Demo</p>
          <DialogTitle className="font-serif text-3xl">Hoş geldiniz, Büşra Hanım</DialogTitle>
          <DialogDescription>Gelen tasarım talepleri, müşteri notları ve teslimat durumları.</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-3 gap-2 sm:gap-4">
          {statuses.map((s) => (
            <div key={s} className="rounded-xl border border-border bg-background p-3 sm:p-4">
              <p className="truncate text-[11px] uppercase tracking-wider text-muted-foreground sm:text-xs">{s}</p>
              <p className="font-serif text-3xl text-gold-gradient">{count(s)}</p>
            </div>
          ))}
        </div>

        <Tabs defaultValue="orders" className="mt-2">
          <TabsList className="w-full sm:w-auto">
            <TabsTrigger value="orders" className="flex-1">Siparişler</TabsTrigger>
            <TabsTrigger value="products" className="flex-1">Ürün Kategorileri</TabsTrigger>
          </TabsList>
          <TabsContent value="orders" className="space-y-3">
            {orders.map((o) => (
              <div key={o.id} className="rounded-xl border border-border bg-background p-4">
                <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
                  <div className="min-w-0">
                    <p className="truncate font-medium">{o.name}</p>
                    <p className="truncate text-sm text-muted-foreground">{o.phone} · {o.city}</p>
                  </div>
                  <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${statusStyle[o.status]}`}>{o.status}</span>
                </div>
                <p className="mt-2 text-sm font-medium text-gold-deep">{o.product}</p>
                {o.note && <p className="mt-1 break-words text-sm italic text-muted-foreground">“{o.note}”</p>}
                <div className="mt-3 flex flex-wrap gap-2">
                  {statuses.map((s) => (
                    <button
                      key={s}
                      onClick={() => update(o.id, s)}
                      className={`rounded-full border px-3 py-1 text-xs transition ${o.status === s ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-gold"}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </TabsContent>
          <TabsContent value="products" className="grid gap-3 sm:grid-cols-2">
            {categories.map((c) => (
              <div key={c.title} className="flex items-center gap-3 rounded-xl border border-border bg-background p-3">
                <img src={c.image} alt={c.title} className="h-14 w-14 shrink-0 rounded-lg object-cover" loading="lazy" />
                <div className="min-w-0">
                  <p className="truncate font-medium">{c.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {orders.filter((o) => o.product === c.title).length} talep · Aktif
                  </p>
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
