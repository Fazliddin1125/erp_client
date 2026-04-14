import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Factory, ClipboardList, Package, Users, BarChart3, ArrowRight, Star, Shield, Clock, Award } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between max-w-6xl">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-xl">
              <Factory className="h-6 w-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold text-blue-600">ERP Pro</span>
              <div className="text-xs text-gray-500">Manufacturing Suite</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" asChild>
              <Link href="/login">Kirish</Link>
            </Button>
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                🚀 Yangi versiya mavjud
              </Badge>
              <h1 className="text-4xl lg:text-5xl font-bold leading-tight text-gray-900">
                Ishlab chiqarishni
                <br />
                <span className="text-blue-600">kelajakga olib boring</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                AI quvvati bilan ishlaydigan ERP tizimi orqali ishlab chiqarish jarayonlaringizni avtomatlashtiring va
                samaradorlikni oshiring.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700" asChild>
                  <Link href="/dashboard">
                    Bepul boshlash
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline">
                  Demo ko'rish
                </Button>
              </div>

              <div className="flex items-center gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full bg-blue-500 border-2 border-white flex items-center justify-center text-white text-xs font-semibold"
                      >
                        {String.fromCharCode(64 + i)}
                      </div>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">1000+ kompaniya</span>
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="text-sm text-gray-600">4.9/5</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl shadow-xl p-6 border">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">Ishlab chiqarish paneli</h3>
                    <Badge className="bg-green-100 text-green-700">Real vaqt</Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <ClipboardList className="h-5 w-5 text-blue-600" />
                        <span className="text-sm font-medium">Buyurtmalar</span>
                      </div>
                      <div className="text-2xl font-bold text-blue-900">142</div>
                      <div className="text-xs text-blue-600">+12% bu oy</div>
                    </div>

                    <div className="bg-green-50 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Factory className="h-5 w-5 text-green-600" />
                        <span className="text-sm font-medium">Samaradorlik</span>
                      </div>
                      <div className="text-2xl font-bold text-green-900">98%</div>
                      <div className="text-xs text-green-600">Yuqori</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Bugungi maqsad</span>
                      <span className="font-medium">85%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: "85%" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Asosiy imkoniyatlar</h2>
            <p className="text-xl text-gray-600">Zamonaviy ERP tizimi bilan biznesingizni rivojlantiring</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: ClipboardList,
                title: "Buyurtma boshqaruvi",
                description: "Buyurtmalarni samarali boshqaring va kuzatib boring",
                color: "text-blue-600",
                bg: "bg-blue-50",
              },
              {
                icon: Factory,
                title: "Ishlab chiqarish",
                description: "Ishlab chiqarish jarayonlarini optimallashtiring",
                color: "text-green-600",
                bg: "bg-green-50",
              },
              {
                icon: Package,
                title: "Inventarizatsiya",
                description: "Zaxiralarni real vaqtda kuzatib boring",
                color: "text-purple-600",
                bg: "bg-purple-50",
              },
              {
                icon: Users,
                title: "Xodimlar",
                description: "Jamoangizning faoliyatini boshqaring",
                color: "text-orange-600",
                bg: "bg-orange-50",
              },
              {
                icon: BarChart3,
                title: "Analitika",
                description: "Chuqur tahlillar va hisobotlar",
                color: "text-indigo-600",
                bg: "bg-indigo-50",
              },
              {
                icon: Shield,
                title: "Xavfsizlik",
                description: "Yuqori darajadagi ma'lumotlar himoyasi",
                color: "text-red-600",
                bg: "bg-red-50",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-shadow bg-white hover:bg-gray-50"
              >
                <CardHeader>
                  <div className={`w-12 h-12 rounded-xl ${feature.bg} flex items-center justify-center mb-4`}>
                    <feature.icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-gray-600">{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Bizning natijalarimiz</h2>
            <p className="text-xl text-gray-600">Mijozlarimiz erishgan yutuqlar</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { number: "65%", label: "Samaradorlik oshishi" },
              { number: "40%", label: "Xarajatlar kamayishi" },
              { number: "80%", label: "Mijozlar mamnunligi" },
              { number: "50%", label: "Xatolar kamayishi" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-blue-600 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-6">Bugun boshlang</h2>
          <p className="text-xl mb-8 opacity-90">30 kunlik bepul sinov. Kredit karta talab qilinmaydi.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/dashboard">
                Bepul boshlash
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600">
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
      <footer className="py-12 px-4 bg-gray-900 text-white">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-600 rounded-xl">
                  <Factory className="h-6 w-6 text-white" />
                </div>
                <div>
                  <span className="text-xl font-bold">ERP Pro</span>
                  <div className="text-xs text-gray-400">Manufacturing Suite</div>
                </div>
              </div>
              <p className="text-gray-400 mb-4">
                Ishlab chiqarish jarayonlarini boshqarish uchun eng zamonaviy ERP yechimi.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Mahsulot</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/dashboard" className="hover:text-white">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/orders" className="hover:text-white">
                    Buyurtmalar
                  </Link>
                </li>
                <li>
                  <Link href="/production" className="hover:text-white">
                    Ishlab chiqarish
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Qo'llab-quvvatlash</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white">
                    Yordam markazi
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Aloqa
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="hover:text-white">
                    Kirish
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">&copy; 2024 ERP Pro. Barcha huquqlar himoyalangan.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
