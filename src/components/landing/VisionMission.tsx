"use client"

import { Target, Heart, Zap, TrendingUp, Users, Sparkles } from "lucide-react"

export default function VisionMission() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-white via-blue-50/30 to-white">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-[#007BFF] px-5 py-2.5 rounded-full text-sm font-medium mb-5">
            <Heart className="w-4 h-4" />
            Nasza Misja
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Yieldo - Rozwiązania dla Firm, Które Chcą Więcej
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Dostarczamy kompleksowe rozwiązania AI dla firm, które pragną rozwoju. Yieldo pomaga firmom osiągać więcej – automatyzacja, oszczędność czasu i wzrost przychodów.
          </p>
        </div>

        {/* Vision & Mission Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Vision Card */}
          <div className="bg-gradient-to-br from-[#007BFF] to-[#0056b3] rounded-2xl p-10 text-white shadow-xl">
            <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mb-6">
              <Target className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Yieldo - Rozwiązania AI dla Firm</h3>
            <p className="text-blue-100 leading-relaxed text-lg">
              Każda firma, niezależnie od wielkości, zasługuje na dostęp do zaawansowanych rozwiązań AI od Yieldo. Nasze rozwiązania pomagają firmom rosnąć i osiągać więcej.
            </p>
          </div>

          {/* Mission Card */}
          <div className="bg-white rounded-2xl p-10 border-2 border-[#007BFF] shadow-xl">
            <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
              <Sparkles className="w-8 h-8 text-[#007BFF]" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Nasza Misja</h3>
            <p className="text-gray-600 leading-relaxed text-lg">
              Dostarczamy proste, skuteczne rozwiązania AI, które automatyzują obsługę klienta
              i pozwalają właścicielom firm skupić się na tym, co robią najlepiej.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div>
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Nasze Wartości
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Value 1 */}
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-[#007BFF]" />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">Prostota</h4>
              <p className="text-sm text-gray-600">
                Nasze rozwiązania są łatwe w użyciu – gotowe do pracy w kilka minut
              </p>
            </div>

            {/* Value 2 */}
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">Skuteczność</h4>
              <p className="text-sm text-gray-600">
                Dostarczamy wymierne rezultaty – więcej klientów, mniej straconych okazji
              </p>
            </div>

            {/* Value 3 */}
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-purple-50 rounded-lg flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">Wsparcie</h4>
              <p className="text-sm text-gray-600">
                Jesteśmy z Tobą na każdym kroku – od wdrożenia po codzienne użytkowanie
              </p>
            </div>

            {/* Value 4 */}
            <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-orange-600" />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">Partnerstwo</h4>
              <p className="text-sm text-gray-600">
                Twój sukces to nasz sukces – rozwijamy się razem z Twoją firmą
              </p>
            </div>
          </div>
        </div>

        {/* Story Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-10 border border-blue-100">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Dlaczego Powstało Yieldo?</h3>
            <p className="text-gray-700 leading-relaxed text-lg mb-6">
              Zauważyliśmy, że wiele małych i średnich firm traci klientów przez nieodebrane telefony,
              brak dostępności po godzinach i przeciążenie właścicieli. Wiedzieliśmy, że AI może to zmienić.
            </p>
            <p className="text-gray-700 leading-relaxed text-lg">
              Stworzyliśmy <strong className="text-[#007BFF]">Yieldo</strong>, aby każda firma
              mogła mieć profesjonalną recepcjonistkę AI – za ułamek kosztu zatrudnienia pracownika.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
