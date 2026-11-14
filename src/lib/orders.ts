// Demo-only storage: requests live in this browser's localStorage.
export type OrderStatus = "Yeni" | "Hazırlanıyor" | "Teslim Edildi";
export type Order = {
  id: string;
  name: string;
  phone: string;
  product: string;
  note: string;
  city: string;
  status: OrderStatus;
  createdAt: string;
};

const KEY = "atolyebuket-demo-orders";

const seed: Order[] = [
  { id: "s1", name: "Demo Müşteri 1", phone: "0500 000 00 01", product: "İsteme & Nişan Çiçekleri", note: "Kırmızı gül buketi, siyah ambalaj", city: "Şehir İçi", status: "Hazırlanıyor", createdAt: "2026-11-07T10:20:00Z" },
  { id: "s2", name: "Demo Müşteri 2", phone: "0500 000 00 02", product: "İsimli Nişan Çikolatası", note: "16.10.2026, 60 adet", city: "Diğer", status: "Yeni", createdAt: "2026-11-08T08:05:00Z" },
  { id: "s3", name: "Demo Müşteri 3", phone: "0500 000 00 03", product: "Bebek Magneti & Hediyelik", note: "Ayıcık temalı, 40 adet", city: "Şehir İçi", status: "Teslim Edildi", createdAt: "2026-11-05T14:40:00Z" },
];

export function loadOrders(): Order[] {
  if (typeof window === "undefined") return seed;
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Order[]) : seed;
  } catch {
    return seed;
  }
}

export function saveOrders(orders: Order[]) {
  localStorage.setItem(KEY, JSON.stringify(orders));
}

export function addOrder(o: Omit<Order, "id" | "status" | "createdAt">) {
  const order: Order = { ...o, id: crypto.randomUUID(), status: "Yeni", createdAt: new Date().toISOString() };
  saveOrders([order, ...loadOrders()]);
  return order;
}
