import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Menu, X, Crown, Truck, MapPin, Phone, MessageCircle, Instagram, Sparkles, LayoutDashboard, Check } from "lucide-react";
import roses from "@/assets/roses.jpg";
import { categories } from "@/lib/catalog";
import { addOrder } from "@/lib/orders";
import { AdminPanel } from "@/components/AdminPanel";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Büşra’nın Renkli Tasarımları — Elazığ Söz & Nişan Hediyelikleri" },
      { name: "description", content: "İsteme çiçeği, isimli nişan çikolatası, gelin buketi, bebek magneti ve isimlikler. Elazığ içi aynı gün teslimat, Türkiye geneli kargo." },
      { property: "og:title", content: "Büşra’nın Renkli Tasarımları" },
      { property: "og:description", content: "En özel günlerinize kişiye özel, el emeği tasarımlar. Elazığ." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

const PHONE = "05313910653";
const WA = "https://wa.me/905313910653";
const IG = "https://ig.me/m/busrann_renkli_tasarimlari";

const nav = [
  { href: "#koleksiyonlar", label: "Koleksiyonlar" },
  { href: "#ozel-tasarim", label: "Özel Tasarım" },
  { href: "#siparis", label: "Sipariş Oluştur" },
  { href: "#iletisim", label: "İletişim" },
];

const schema = z.object({
  name: z.string().trim().min(2, "Lütfen adınızı yazın").max(80),
  phone: z.string().trim().regex(/^[0-9 +()-]{10,18}$/, "Geçerli bir telefon girin"),
  product: z.string().min(1, "Ürün grubu seçin"),
  note: z.string().trim().max(500),
  city: z.enum(["Elazığ", "Diğer"]),
});

function Index() {
  const [menu, setMenu] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [product, setProduct] = useState("");
  const [orderConfirmation, setOrderConfirmation] = useState(false);

  const openAdmin = () => {
    setMenu(false);
    setAdmin(true);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const r = schema.safeParse(Object.fromEntries(fd));
    if (!r.success) {
      toast.error(r.error.issues[0]?.message ?? "Formu kontrol edin");
      return;
    }
    addOrder(r.data);
    e.currentTarget.reset();
    setProduct("");
    setOrderConfirmation(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-gold/25 bg-background/85 backdrop-blur-md">
        <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 sm:px-6 lg:flex lg:justify-between">
          <a href="#" className="flex min-w-0 items-center gap-2.5">
            <img src="/favicon.svg" alt="" className="h-10 w-10 shrink-0" />
            <span className="min-w-0 leading-tight">
              <span className="block truncate font-script text-2xl text-gold-deep">Büşra’nın</span>
              <span className="block truncate text-[10px] uppercase tracking-[0.25em] text-muted-foreground">Renkli Tasarımları</span>
            </span>
          </a>
          <nav className="hidden items-center gap-8 lg:flex">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="text-sm tracking-wide transition hover:text-gold-deep">{n.label}</a>
            ))}
          </nav>
          <div className="flex shrink-0 items-center gap-2">
            <button onClick={openAdmin} className="attention-glow hidden items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-luxe ring-1 ring-gold/60 transition hover:-translate-y-0.5 sm:inline-flex">
              <LayoutDashboard className="h-4 w-4" /> Yönetim Paneli
            </button>
            <button aria-label="Menü" onClick={() => setMenu(!menu)} className="grid h-10 w-10 place-items-center rounded-full border border-gold/40 lg:hidden">
              {menu ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        {menu && (
          <div className="mobile-menu border-t border-gold/20 bg-background px-4 pb-5 lg:hidden">
            <nav aria-label="Mobil gezinme">
              {nav.map((n) => (
                <a key={n.href} href={n.href} onClick={() => setMenu(false)} className="mobile-menu-link block border-b border-border py-3.5 font-serif text-xl">{n.label}</a>
              ))}
            </nav>
            <button onClick={openAdmin} className="attention-glow mobile-menu-link mt-4 flex w-full items-center justify-center gap-2 rounded-full bg-primary py-3.5 font-medium text-primary-foreground ring-1 ring-gold/60">
              <LayoutDashboard className="h-4 w-4" /> Yönetim Paneli
            </button>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden pt-24 sm:pt-28">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-16 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:pb-24">
          <div className="text-center lg:text-left">
            <p className="hero-enter hero-delay-1 inline-flex items-center gap-2 rounded-full border border-gold/50 px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-gold-deep">
              <Crown className="h-3.5 w-3.5" /> El Emeği · Elazığ
            </p>
            <h1 className="hero-enter hero-delay-2 mt-6 text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-6xl xl:text-7xl">
              En Özel Günlerinize <span className="italic text-gold-gradient">Renk Katacak</span> Kişiye Özel Tasarımlar
            </h1>
            <p className="hero-enter hero-delay-3 mx-auto mt-6 max-w-lg text-base text-muted-foreground sm:text-lg lg:mx-0">
              Söz, nişan ve isteme günleriniz için çiçekten çikolataya, her detayı sizin hikâyenizle hazırlıyoruz.
            </p>
            <div className="hero-enter hero-delay-4 mx-auto mt-6 flex max-w-md items-center gap-3 rounded-2xl border border-gold/40 bg-card p-4 text-left shadow-luxe lg:mx-0">
              <Truck className="h-6 w-6 shrink-0 text-gold-deep" />
              <p className="text-sm font-medium">Elazığ İçi Aynı Gün Teslimat & Türkiye Genelinde Kargo</p>
            </div>
            <div className="hero-enter hero-delay-5 mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <a href="#koleksiyonlar" className="motion-button rounded-full bg-primary px-8 py-4 text-center font-medium text-primary-foreground transition hover:-translate-y-0.5">Koleksiyonu İncele</a>
              <a href="#siparis" className="attention-glow motion-button rounded-full bg-gold-gradient px-8 py-4 text-center font-medium text-primary shadow-luxe transition hover:-translate-y-0.5">Özel Sipariş / Fiyat Al</a>
            </div>
          </div>
          <div className="hero-enter hero-delay-3 relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="absolute -inset-3 rounded-[2.5rem] bg-gold-gradient opacity-40 blur-2xl" />
            <img src={roses} alt="Siyah ambalajlı kırmızı gül isteme buketi" width={1200} height={1408} className="hero-float relative aspect-[4/5] w-full rounded-[2rem] object-cover shadow-luxe ring-1 ring-gold/40" />
            <div className="hero-enter hero-delay-5 absolute -bottom-5 left-4 rounded-2xl bg-primary px-5 py-3 text-primary-foreground shadow-luxe sm:left-6">
              <p className="font-script text-2xl">Kalpten tasarım</p>
            </div>
          </div>
        </div>
      </section>

      {/* Collections */}
      <section id="koleksiyonlar" className="scroll-mt-20 bg-card py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal><SectionTitle kicker="Koleksiyonlar" title="Öne Çıkan Tasarımlar" /></Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((c, i) => (
              <Reveal key={c.title} className="h-full" delayMs={i * 80}>
                <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-gold/25 bg-background transition duration-500 hover:-translate-y-2 hover:shadow-luxe">
                  <div className="aspect-[4/5] overflow-hidden">
                    <img src={c.image} alt={c.title} loading="lazy" width={1024} height={1200} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="text-2xl font-semibold">{c.title}</h3>
                    <p className="mt-2 flex-1 text-sm text-muted-foreground">{c.desc}</p>
                    <a href="#siparis" onClick={() => setProduct(c.title)} className="motion-button mt-5 rounded-full border border-primary py-3 text-center text-sm font-medium transition hover:bg-primary hover:text-primary-foreground">
                      Sipariş Ver / Fiyat Sor
                    </a>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Custom design */}
      <section id="ozel-tasarim" className="scroll-mt-20 bg-primary py-20 text-primary-foreground">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6">
          <Reveal><Sparkles className="mx-auto h-8 w-8 text-gold" /></Reveal>
          <Reveal delayMs={80}><h2 className="mt-4 text-3xl font-semibold sm:text-5xl">Hayalinizdeki tasarım, <span className="italic text-gold-gradient">isminizle</span></h2></Reveal>
          <div className="mt-12 grid gap-6 text-left sm:grid-cols-3">
            {[
              ["01", "Fikrinizi anlatın", "Ürün, renk, isim ve tarih bilgilerinizi formdan iletin."],
              ["02", "Tasarımı onaylayın", "Size özel taslağı ve fiyatı WhatsApp’tan paylaşalım."],
              ["03", "Teslim alın", "Elazığ’a aynı gün, Türkiye geneline özenli kargo."],
            ].map(([n, t, d], i) => (
              <Reveal key={n} delayMs={i * 90}>
                <div className="h-full rounded-2xl border border-gold/30 p-6">
                  <p className="font-serif text-4xl text-gold-gradient">{n}</p>
                  <p className="mt-3 font-serif text-2xl">{t}</p>
                  <p className="mt-2 text-sm opacity-75">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Order form */}
      <section id="siparis" className="scroll-mt-20 py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <Reveal><SectionTitle kicker="Hızlı Sipariş" title="Özel Tasarım Talep Formu" sub="DM karmaşasına son — bilgilerinizi bırakın, biz size dönelim." /></Reveal>
          <Reveal delayMs={100}>
            <form onSubmit={onSubmit} className="mt-10 grid gap-5 rounded-3xl border border-gold/30 bg-card p-5 shadow-luxe sm:grid-cols-2 sm:p-8">
              <Field label="Ad Soyad"><input name="name" maxLength={80} className={inputCls} placeholder="Adınız Soyadınız" /></Field>
              <Field label="Telefon"><input name="phone" type="tel" inputMode="tel" maxLength={18} className={inputCls} placeholder="05xx xxx xx xx" /></Field>
              <Field label="İstenen Ürün Grubu" full>
                <select name="product" value={product} onChange={(e) => setProduct(e.target.value)} className={inputCls}>
                  <option value="">Seçiniz</option>
                  {categories.map((c) => <option key={c.title}>{c.title}</option>)}
                  <option>Diğer / Karma Sipariş</option>
                </select>
              </Field>
              <Field label="Özel İsim / Tarih Notu" full>
                <textarea name="note" rows={3} maxLength={500} className={inputCls} placeholder="Örn: Kübra & Fatih – 16.10.2026, 50 adet" />
              </Field>
              <fieldset className="sm:col-span-2">
                <legend className="mb-2 text-sm font-medium">Teslimat Şehri</legend>
                <div className="grid grid-cols-2 gap-3">
                  {["Elazığ", "Diğer"].map((c, i) => (
                    <label key={c} className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border border-input bg-background py-3 text-sm has-[:checked]:border-gold has-[:checked]:bg-gold/15">
                      <input type="radio" name="city" value={c} defaultChecked={i === 0} className="accent-[var(--gold-deep)]" /> {c === "Diğer" ? "Diğer Şehir" : c}
                    </label>
                  ))}
                </div>
              </fieldset>
              <button type="submit" className="attention-glow motion-button rounded-full bg-primary py-4 font-medium text-primary-foreground ring-1 ring-gold/60 transition hover:-translate-y-0.5 sm:col-span-2">
                Tasarım Talebi Gönder
              </button>
            </form>
          </Reveal>
        </div>
      </section>

      {/* Contact */}
      <section id="iletisim" className="scroll-mt-20 bg-card py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <Reveal><SectionTitle kicker="İletişim" title="Bize Ulaşın" /></Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <Reveal><div className="flex h-full items-center gap-4 rounded-2xl border border-gold/30 bg-background p-5"><MapPin className="h-6 w-6 shrink-0 text-gold-deep" /><div><p className="text-xs uppercase tracking-widest text-muted-foreground">Şehir</p><p className="font-serif text-2xl">Elazığ</p></div></div></Reveal>
            <Reveal delayMs={80}><a href={`tel:${PHONE}`} className="motion-button flex h-full items-center gap-4 rounded-2xl border border-gold/30 bg-background p-5"><Phone className="h-6 w-6 shrink-0 text-gold-deep" /><div><p className="text-xs uppercase tracking-widest text-muted-foreground">Telefon</p><p className="font-serif text-2xl">0531 391 06 53</p></div></a></Reveal>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <Reveal><a href={WA} target="_blank" rel="noreferrer" className="motion-button flex items-center justify-center gap-2 rounded-full bg-primary py-4 font-medium text-primary-foreground"><MessageCircle className="h-5 w-5" /> WhatsApp’tan Hızlı Yaz</a></Reveal>
            <Reveal delayMs={80}><a href={IG} target="_blank" rel="noreferrer" className="motion-button flex items-center justify-center gap-2 rounded-full bg-gold-gradient py-4 font-medium text-primary"><Instagram className="h-5 w-5" /> Instagram Direct</a></Reveal>
          </div>
        </div>
      </section>

      <footer className="bg-primary py-10 text-center text-primary-foreground">
        <p className="font-script text-3xl text-gold">Büşra’nın Renkli Tasarımları</p>
        <p className="mt-2 text-xs opacity-60">© 2026 Büşra Özkan · Elazığ</p>
      </footer>

      <AdminPanel open={admin} onOpenChange={setAdmin} />
      <Dialog open={orderConfirmation} onOpenChange={setOrderConfirmation}>
        <DialogContent className="w-[calc(100vw-2rem)] max-w-md rounded-3xl border-gold/40 bg-card p-6 text-center shadow-luxe duration-300 sm:p-8">
          <DialogHeader className="items-center">
            <span className="grid h-14 w-14 place-items-center rounded-full bg-gold/20 text-gold-deep">
              <Check className="h-7 w-7" />
            </span>
            <DialogTitle className="font-serif text-3xl">Talebiniz alındı</DialogTitle>
            <DialogDescription className="text-base">
              Büşra Hanım en kısa sürede sizinle iletişime geçecek. İlginiz için teşekkür ederiz.
            </DialogDescription>
          </DialogHeader>
          <DialogClose className="motion-button mt-2 inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground shadow-luxe transition">
            Tamam
          </DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  );
}

const inputCls = "w-full rounded-xl border border-input bg-background px-4 py-3 text-base outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/30";

function Field({ label, full, children }: { label: string; full?: boolean; children: React.ReactNode }) {
  return (
    <label className={`block min-w-0 ${full ? "sm:col-span-2" : ""}`}>
      <span className="mb-2 block text-sm font-medium">{label}</span>
      {children}
    </label>
  );
}

function SectionTitle({ kicker, title, sub }: { kicker: string; title: string; sub?: string }) {
  return (
    <div className="text-center">
      <p className="text-xs uppercase tracking-[0.3em] text-gold-deep">{kicker}</p>
      <h2 className="mt-3 text-3xl font-semibold sm:text-5xl">{title}</h2>
      {sub && <p className="mx-auto mt-3 max-w-lg text-muted-foreground">{sub}</p>}
    </div>
  );
}

function Reveal({ children, className = "", delayMs = 0 }: { children: ReactNode; className?: string; delayMs?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`scroll-reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delayMs}ms` }}
    >
      {children}
    </div>
  );
}
