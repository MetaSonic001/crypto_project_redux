import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Link } from "react-router-dom"
import { ArrowRight, BarChart3, LineChart, RefreshCw, Zap, Code } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">CryptoTrack</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-sm font-medium hover:text-primary">
              Home
            </Link>
            <Link to="/tracker" className="text-sm font-medium hover:text-primary">
              Live Tracker
            </Link>
            <Link to="/demo" className="text-sm font-medium hover:text-primary">
              Demo
            </Link>
            <Link to="/features" className="text-sm font-medium hover:text-primary">
              Features
            </Link>
          </nav>
          <div className="flex gap-2">
            <Link to="/demo">
              <Button variant="outline">Demo Version</Button>
            </Link>
            <Link to="/tracker">
              <Button>Live Tracker</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-background to-muted">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Real-time <span className="text-primary">Crypto</span> Tracking Made Simple
              </h1>
              <p className="text-lg text-muted-foreground">
                Monitor cryptocurrency prices, trends, and market data with our powerful and intuitive tracking
                dashboard.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/tracker">
                  <Button size="lg" className="w-full sm:w-auto">
                    Live Tracker <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/demo">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Demo Version <Code className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex-1">
              <div className="relative">
                <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-primary/20 to-primary opacity-75 blur-lg"></div>
                <div className="relative rounded-lg border bg-card p-2 shadow-lg">
                  <img
                    src="/dashboard-preview.png"
                    alt="Crypto Dashboard Preview"
                    className="rounded-md w-full"
                    width={500}
                    height={300}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our crypto tracker provides everything you need to stay informed about the cryptocurrency market.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Zap className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Real-Time Updates</h3>
                <p className="text-muted-foreground">
                  Get live price updates from major exchanges through our WebSocket integration.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <LineChart className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Advanced Charts</h3>
                <p className="text-muted-foreground">
                  Visualize price trends with interactive charts and technical indicators.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <RefreshCw className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Customizable Views</h3>
                <p className="text-muted-foreground">
                  Sort, filter, and organize your dashboard to focus on the data that matters to you.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-muted">
        <div className="container mx-auto max-w-5xl text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Track the Crypto Market?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Join thousands of traders who rely on our platform for accurate, real-time cryptocurrency data.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/tracker">
              <Button size="lg">
                Launch Live Tracker <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/demo">
              <Button variant="outline" size="lg">
                Try Demo Version <Code className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <BarChart3 className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">CryptoTrack</span>
            </div>
            <div className="flex items-center gap-6">
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Contact
              </a>
            </div>
          </div>
          <div className="mt-8 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} CryptoTrack. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}