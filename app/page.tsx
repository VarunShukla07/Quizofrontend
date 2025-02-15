"use client";

import { Button } from "@/components/ui/button";
import { MoveRight, Brain, Trophy, Users, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link"; // Import Link component
export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Brain className="h-8 w-8 text-primary" />
              <span className="ml-2 text-xl font-bold">Quizo</span>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link href="/signup">
                <Button>Sign Up</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
                Master Knowledge Through
                <span className="text-primary"> Interactive Quizzes</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Enhance your learning journey with our engaging quiz platform.
                Challenge yourself, compete with others, and track your
                progress.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/login">
                  <Button size="lg" className="gap-2">
                    Get Started <MoveRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-6 pt-8">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">10K+ Quizzes</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Diverse topics to explore
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">50K+ Users</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Active learning community
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -z-10 top-0 right-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
              <Image
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop"
                alt="Quiz Platform Preview"
                width={600}
                height={400}
                className="rounded-lg shadow-2xl"
                priority
              />
              <div className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-sm p-4 rounded-lg shadow-lg border">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <span className="font-semibold">
                    Real-time Progress Tracking
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Preview */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Why Choose Quizo?</h2>
            <p className="text-muted-foreground mt-4">
              Experience a new way of learning through interactive quizzes
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-lg bg-background border hover:shadow-lg transition-all"
              >
                <feature.icon className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

const features = [
  {
    icon: Brain,
    title: "Adaptive Learning",
    description:
      "Our platform adjusts to your skill level, ensuring optimal learning progress.",
  },
  {
    icon: Trophy,
    title: "Compete & Win",
    description:
      "Join competitions, earn badges, and climb the global leaderboard.",
  },
  {
    icon: Users,
    title: "Community Driven",
    description:
      "Connect with fellow learners and share your knowledge journey.",
  },
];
