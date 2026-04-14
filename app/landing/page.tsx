import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Factory,
  ClipboardList,
  Package,
  Users,
  BarChart3,
  CheckCircle,
  ArrowRight,
  Star,
  Shield,
  Globe,
  Smartphone,
  Cloud,
  Award,
  Clock,
  Target,
  Layers,
} from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl">
              <Factory className="h-6 w-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                ERP Pro
              </span>
              <div className="text-xs text-muted-foreground">Manufacturing Suite</div>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
              Imkoniyatlar
            </Link>
            <Link href="#solutions" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
              Yechimlar
            </Link>
            <Link href="#pricing" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
              Narxlar
            </Link>
            <Link href="#contact" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
              Aloqa
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild className="text-gray-600">
              <Link href="/login">Kirish</Link>
            </Button>
            <Button
              asChild
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              <Link href="/login">Bepul sinash</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="bg-blue-100 text-blue-700 border-blue-200">
                  🚀 Yangi versiya: AI bilan ishlab chiqarish optimizatsiyasi
                </Badge>
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-gray-900 via-blue-800 to-indigo-800 bg-clip-text text-transparent">
                    Ishlab chiqarishni
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    kelajakka olib boring
                  </span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                  AI quvvati bilan ishlaydigan ERP tizimi orqali ishlab chiqarish jarayonlaringizni avtomatlashtiring,
                  samaradorlikni 3 barobarga oshiring va xarajatlarni 40% gacha kamaytiring.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-lg px-8 py-6"
                >
                  <Link href="/login" className="flex items-center">
                    Bepul boshlash
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-2">
                  Demo ko'rish
                </Button>
              </div>

              <div className="flex items-center gap-8 pt-4">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 border-2 border-white flex items-center justify-center text-white text-xs font-semibold"
                      >
                        {String.fromCharCode(64 + i)}
                      </div>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">1000+ kompaniya ishlatmoqda</span>
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="text-sm text-gray-600 ml-1">4.9/5 reyting</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-3xl blur-3xl opacity-20 transform rotate-6"></div>
              <div className="relative bg-white rounded-3xl shadow-2xl p-8 border">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">Ishlab chiqarish paneli</h3>
                    <Badge className="bg-green-100 text-green-700">Real vaqt</Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <ClipboardList className="h-5 w-5 text-blue-600" />
                        <span className="text-sm font-medium text-blue-900">Buyurtmalar</span>
                      </div>
                      <div className="text-2xl font-bold text-blue-900">142</div>
                      <div className="text-xs text-blue-600">+12% bu oy</div>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Factory className="h-5 w-5 text-green-600" />
                        <span className="text-sm font-medium text-green-900">Ishlab chiqarish</span>
                      </div>
                      <div className="text-2xl font-bold text-green-900">98%</div>
                      <div className="text-xs text-green-600">Samaradorlik</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Bugungi maqsad</span>
                      <span className="font-medium">85%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full"
                        style={{ width: "85%" }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 pt-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-gray-600">28 faol xodim</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-gray-600">15 jarayon</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              Imkoniyatlar
            </Badge>
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Har bir ehtiyojingiz uchun yechim
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Zamonaviy texnologiyalar bilan qurilgan to'liq ERP tizimi. AI, bulutli xizmatlar va real vaqt analitikasi.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: ClipboardList,
                title: "Aqlli buyurtma boshqaruvi",
                description:
                  "AI yordamida buyurtmalarni avtomatik tahlil qiling va optimal ishlab chiqarish rejasini tuzing.",
                color: "from-blue-500 to-blue-600",
                features: ["Avtomatik prioritetlash", "Prognozlash", "Real vaqt kuzatuvi"],
              },
              {
                icon: Factory,
                title: "Ishlab chiqarish optimizatsiyasi",
                description:
                  "Mashinalar va xodimlarning samaradorligini real vaqtda kuzatib boring va optimallashtiring.",
                color: "from-green-500 to-green-600",
                features: ["IoT integratsiya", "Prediksiya tahlili", "Avtomatik sozlash"],
              },
              {
                icon: Package,
                title: "Aqlli inventarizatsiya",
                description: "Zaxiralarni avtomatik boshqaring, kam qolgan materiallar haqida oldindan ogohlantiring.",
                color: "from-purple-500 to-purple-600",
                features: ["Avtomatik buyurtma", "QR/Barcode", "Prognozli tahlil"],
              },
              {
                icon: Users,
                title: "Xodimlar boshqaruvi",
                description:
                  "Jamoangizning samaradorligini oshiring, ko'nikmalarni rivojlantiring va motivatsiyani kuchaytiring.",
                color: "from-orange-500 to-orange-600",
                features: ["Skill tracking", "Performance", "Training plans"],
              },
              {
                icon: BarChart3,
                title: "Advanced Analytics",
                description: "Chuqur tahlillar va AI-powered insights orqali biznesingizni yangi darajaga ko'taring.",
                color: "from-indigo-500 to-indigo-600",
                features: ["Prediksiya modellari", "Custom dashboards", "Export hisobotlar"],
              },
              {
                icon: Cloud,
                title: "Bulutli arxitektura",
                description: "Har qanday joydan, har qanday vaqtda kirish. 99.9% uptime kafolati bilan.",
                color: "from-cyan-500 to-cyan-600",
                features: ["24/7 kirish", "Auto backup", "Scalable infrastructure"],
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:-translate-y-2"
              >
                <CardHeader className="pb-4">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                  <CardDescription className="text-gray-600 leading-relaxed">{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {feature.features.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section id="solutions" className="py-24 px-4">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <Badge variant="secondary" className="mb-4">
                  Yechimlar
                </Badge>
                <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Har qanday sanoat uchun moslashtirilgan
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Bizning ERP tizimi turli sohalarda muvaffaqiyatli qo'llanilmoqda. Har bir sohaning o'ziga xos
                  ehtiyojlarini hisobga olgan holda moslashtirilgan yechimlar.
                </p>
              </div>

              <div className="grid gap-6">
                {[
                  {
                    icon: Layers,
                    title: "Avtomobil sanoati",
                    description: "Just-in-time ishlab chiqarish va supply chain optimizatsiyasi",
                    stats: "40% xarajat tejash",
                  },
                  {
                    icon: Smartphone,
                    title: "Elektronika",
                    description: "Komponentlar boshqaruvi va sifat nazorati",
                    stats: "60% tezroq ishlab chiqarish",
                  },
                  {
                    icon: Target,
                    title: "Oziq-ovqat sanoati",
                    description: "Yaroqlilik muddati kuzatuvi va HACCP compliance",
                    stats: "99.9% sifat kafolati",
                  },
                ].map((solution, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center">
                      <solution.icon className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{solution.title}</h3>
                      <p className="text-gray-600 text-sm mb-2">{solution.description}</p>
                      <Badge variant="secondary" className="text-xs">
                        {solution.stats}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-3xl blur-3xl opacity-20"></div>
              <div className="relative bg-white rounded-3xl shadow-2xl p-8 border">
                <div className="space-y-6">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold mb-2">Samaradorlik ko'rsatkichlari</h3>
                    <p className="text-gray-600">O'rtacha natijalar 6 oy ichida</p>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600 mb-1">↑ 65%</div>
                      <div className="text-sm text-gray-600">Samaradorlik oshishi</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600 mb-1">↓ 40%</div>
                      <div className="text-sm text-gray-600">Xarajatlar kamayishi</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-600 mb-1">↑ 80%</div>
                      <div className="text-sm text-gray-600">Mijozlar mamnunligi</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-orange-600 mb-1">↓ 50%</div>
                      <div className="text-sm text-gray-600">Xatolar kamayishi</div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Award className="h-5 w-5 text-blue-600" />
                      <span className="font-medium text-blue-900">ROI kafolati</span>
                    </div>
                    <p className="text-sm text-blue-700">6 oy ichida investitsiyangiz qaytadi yoki pulni qaytaramiz</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              Narxlar
            </Badge>
            <h2 className="text-4xl font-bold mb-4">Har qanday biznes uchun mos narx</h2>
            <p className="text-xl text-gray-600">Kichik startupdan tortib yirik korporatsiyagacha</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Starter",
                price: "99",
                description: "Kichik bizneslar uchun",
                features: [
                  "5 tagacha foydalanuvchi",
                  "Asosiy modullar",
                  "Email qo'llab-quvvatlash",
                  "Bulutli saqlash 10GB",
                ],
                popular: false,
              },
              {
                name: "Professional",
                price: "299",
                description: "O'rta bizneslar uchun",
                features: [
                  "25 tagacha foydalanuvchi",
                  "Barcha modullar",
                  "24/7 qo'llab-quvvatlash",
                  "Bulutli saqlash 100GB",
                  "Advanced analytics",
                  "API kirish",
                ],
                popular: true,
              },
              {
                name: "Enterprise",
                price: "Kelishilgan",
                description: "Yirik korporatsiyalar uchun",
                features: [
                  "Cheksiz foydalanuvchi",
                  "Custom modullar",
                  "Dedicated support",
                  "Cheksiz saqlash",
                  "White-label yechim",
                  "On-premise deployment",
                ],
                popular: false,
              },
            ].map((plan, index) => (
              <Card
                key={index}
                className={`relative ${plan.popular ? "border-blue-500 shadow-xl scale-105" : "border-gray-200"} hover:shadow-lg transition-all`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-blue-600 to-indigo-600">Eng mashhur</Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <CardDescription className="text-gray-600">{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">
                      {plan.price === "Kelishilgan" ? "" : "$"}
                      {plan.price}
                    </span>
                    {plan.price !== "Kelishilgan" && <span className="text-gray-600">/oy</span>}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full ${plan.popular ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700" : ""}`}
                    variant={plan.popular ? "default" : "outline"}
                  >
                    {plan.price === "Kelishilgan" ? "Aloqa qiling" : "Boshlash"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto text-center relative">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ishlab chiqarishingizni bugun o'zgartiring</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            30 kunlik bepul sinov muddati. Kredit karta talab qilinmaydi. 5 daqiqada sozlash.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
              <Link href="/login" className="flex items-center">
                Bepul boshlash
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 text-white border-white hover:bg-white hover:text-blue-600"
            >
              Demo so'rash
            </Button>
          </div>

          <div className="mt-12 flex items-center justify-center gap-8 opacity-80">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              <span>SSL himoyalangan</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              <span>24/7 qo'llab-quvvatlash</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              <span>ISO sertifikatlangan</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="py-16 px-4 bg-gray-900 text-white">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-5 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl">
                  <Factory className="h-6 w-6 text-white" />
                </div>
                <div>
                  <span className="text-xl font-bold">ERP Pro</span>
                  <div className="text-xs text-gray-400">Manufacturing Suite</div>
                </div>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Ishlab chiqarish jarayonlarini boshqarish uchun eng zamonaviy va samarali ERP yechimi. AI
                texnologiyalari bilan quvvatlantirilgan.
              </p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-blue-400" />
                  <span className="text-sm text-gray-400">50+ davlat</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-green-400" />
                  <span className="text-sm text-gray-400">10,000+ foydalanuvchi</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-white">Mahsulot</h3>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Buyurtmalar
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Ishlab chiqarish
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Inventarizatsiya
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Xodimlar
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Analytics
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-white">Yechimlar</h3>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Avtomobil sanoati
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Elektronika
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Oziq-ovqat
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Tekstil
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Kimyo sanoati
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-white">Qo'llab-quvvatlash</h3>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Yordam markazi
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    API hujjatlari
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Webinarlar
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Aloqa
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Status sahifa
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 text-sm">&copy; 2024 ERP Pro. Barcha huquqlar himoyalangan.</p>
              <div className="flex items-center gap-6 text-sm text-gray-400">
                <Link href="#" className="hover:text-white transition-colors">
                  Maxfiylik siyosati
                </Link>
                <Link href="#" className="hover:text-white transition-colors">
                  Foydalanish shartlari
                </Link>
                <Link href="#" className="hover:text-white transition-colors">
                  Cookie siyosati
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
