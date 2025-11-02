"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Mail, Lock, User, CheckCircle2 } from "lucide-react"
import { Navbar } from "@/components/ui/navbar"

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState<string>("")
  const [loading, setLoading] = useState(false)

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError("")
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError("Invalid email or password")
      } else {
        router.push("/dashboard")
        router.refresh()
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError("")
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || "Registration failed")
        return
      }

      // Auto-login after registration
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError("Registration successful, but login failed. Please try logging in.")
      } else {
        router.push("/dashboard")
        router.refresh()
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <Navbar />

      <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden pt-24">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50 translate-x-1/2 translate-y-1/2"></div>

      <div className="w-full max-w-md relative z-10">
        <Card className="border-2 border-gray-200 shadow-xl">
          <CardHeader className="space-y-3 pb-4">
            <CardTitle className="text-3xl font-bold text-center text-gray-900">
              Witaj ponownie
            </CardTitle>
            <CardDescription className="text-center text-gray-600 text-base">
              Zaloguj się lub utwórz nowe konto
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-6 border-red-200 bg-red-50">
                <AlertDescription className="text-red-700">{error}</AlertDescription>
              </Alert>
            )}

            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-gray-100 p-1 rounded-lg mb-6">
                <TabsTrigger
                  value="login"
                  className="data-[state=active]:bg-white data-[state=active]:text-[#007BFF] data-[state=active]:shadow-sm rounded-md font-semibold transition-all"
                >
                  Zaloguj
                </TabsTrigger>
                <TabsTrigger
                  value="register"
                  className="data-[state=active]:bg-white data-[state=active]:text-[#007BFF] data-[state=active]:shadow-sm rounded-md font-semibold transition-all"
                >
                  Zarejestruj
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="login-email" className="text-gray-900 font-semibold flex items-center gap-2">
                      <Mail className="w-4 h-4 text-[#007BFF]" />
                      Email
                    </Label>
                    <Input
                      id="login-email"
                      name="email"
                      type="email"
                      placeholder="jan@firma.pl"
                      required
                      disabled={loading}
                      className="h-12 px-4 border-2 border-gray-200 rounded-lg focus:border-[#007BFF] focus:ring-2 focus:ring-[#007BFF]/20 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password" className="text-gray-900 font-semibold flex items-center gap-2">
                      <Lock className="w-4 h-4 text-[#007BFF]" />
                      Hasło
                    </Label>
                    <Input
                      id="login-password"
                      name="password"
                      type="password"
                      placeholder="••••••••"
                      required
                      disabled={loading}
                      className="h-12 px-4 border-2 border-gray-200 rounded-lg focus:border-[#007BFF] focus:ring-2 focus:ring-[#007BFF]/20 transition-all"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full h-12 bg-[#007BFF] hover:bg-[#0056b3] text-white text-base font-semibold rounded-lg shadow-md hover:shadow-lg transition-all mt-6"
                    disabled={loading}
                  >
                    {loading ? "Logowanie..." : "Zaloguj się"}
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600 flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    Bezpieczne połączenie SSL
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="register">
                <form onSubmit={handleRegister} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="register-name" className="text-gray-900 font-semibold flex items-center gap-2">
                      <User className="w-4 h-4 text-[#007BFF]" />
                      Imię i nazwisko
                    </Label>
                    <Input
                      id="register-name"
                      name="name"
                      type="text"
                      placeholder="Jan Kowalski"
                      required
                      disabled={loading}
                      className="h-12 px-4 border-2 border-gray-200 rounded-lg focus:border-[#007BFF] focus:ring-2 focus:ring-[#007BFF]/20 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-email" className="text-gray-900 font-semibold flex items-center gap-2">
                      <Mail className="w-4 h-4 text-[#007BFF]" />
                      Email
                    </Label>
                    <Input
                      id="register-email"
                      name="email"
                      type="email"
                      placeholder="jan@firma.pl"
                      required
                      disabled={loading}
                      className="h-12 px-4 border-2 border-gray-200 rounded-lg focus:border-[#007BFF] focus:ring-2 focus:ring-[#007BFF]/20 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-password" className="text-gray-900 font-semibold flex items-center gap-2">
                      <Lock className="w-4 h-4 text-[#007BFF]" />
                      Hasło
                    </Label>
                    <Input
                      id="register-password"
                      name="password"
                      type="password"
                      placeholder="Minimum 8 znaków"
                      required
                      minLength={8}
                      disabled={loading}
                      className="h-12 px-4 border-2 border-gray-200 rounded-lg focus:border-[#007BFF] focus:ring-2 focus:ring-[#007BFF]/20 transition-all"
                    />
                    <p className="text-xs text-gray-500 mt-1">Hasło musi zawierać minimum 8 znaków</p>
                  </div>
                  <Button
                    type="submit"
                    className="w-full h-12 bg-gradient-to-r from-[#007BFF] to-[#0056b3] hover:shadow-lg text-white text-base font-semibold rounded-lg shadow-md transition-all mt-6"
                    disabled={loading}
                  >
                    {loading ? "Tworzenie konta..." : "Utwórz konto"}
                  </Button>
                </form>

                <div className="mt-6 space-y-2">
                  <p className="text-sm text-gray-600 text-center flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    Darmowe konto bez karty kredytowej
                  </p>
                  <p className="text-xs text-gray-500 text-center">
                    Rejestrując się, akceptujesz naszą politykę prywatności zgodną z RODO
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            © 2025 Yieldo. Wszystkie prawa zastrzeżone.
          </p>
        </div>
      </div>
    </div>
    </div>
  )
}
