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

const KEY = "brt-orders";

const seed: Order[] = [
  { id: "s1", name: "Kübra Yılmaz", phone: "0532 000 00 01", product: "İsteme & Nişan Çiçekleri", note: "Kübra & Fatih – 101 kırmızı gül, siyah ambalaj", city: "Elazığ", status: "Hazırlanıyor", createdAt: "2026-11-07T10:20:00Z" },
  { id: "s2", name: "Hilal Demir", phone: "0533 000 00 02", product: "İsimli Nişan Çikolatası", note: "H & T – 16.10.2026, 60 adet", city: "Diğer", status: "Yeni", createdAt: "2026-11-08T08:05:00Z" },
  { id: "s3", name: "Aleyna Kaya", phone: "0535 000 00 03", product: "Bebek Magneti & Hediyelik", note: "Göktuğ – ayıcık temalı, 40 adet", city: "Elazığ", status: "Teslim Edildi", createdAt: "2026-11-05T14:40:00Z" },
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
