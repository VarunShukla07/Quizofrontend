"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Brain, ArrowLeft, Save } from "lucide-react";

export default function EditQuiz({ params }: { params: Promise<{ id: string }> }) {
  const [id, setId] = useState<string | null>(null);
  const [quiz, setQuiz] = useState<{ title: string; description: string }>({
    title: "",
    description: "",
  });
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Unwrap `params` since it's now a Promise in Next.js
  useEffect(() => {
    params.then((resolvedParams) => {
      setId(resolvedParams.id);
    });
  }, [params]);

  // Fetch quiz only when `id` is available
  useEffect(() => {
    if (!id) return;

    const fetchQuiz = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/quizzes/${id}`,
          { withCredentials: true }
        );
        setQuiz(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching quiz", error);
      }
    };
    fetchQuiz();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/quizzes/${id}`,
        quiz,
        { withCredentials: true }
      );
      router.push("/dashboard");
    } catch (error) {
      console.error("Error updating quiz", error);
    }
  };

  if (loading || !id) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse flex flex-col items-center gap-4">
          <Brain className="h-8 w-8 text-primary animate-bounce" />
          <p className="text-muted-foreground">Loading quiz...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-primary" />
            <span
              className="font-bold text-lg cursor-pointer"
              onClick={() => router.push("/")}
            >
              Quizo
            </span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8 max-w-2xl">
        <div className="flex items-center justify-between mb-6">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="hover:bg-primary/10"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Dashboard
          </Button>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="pb-4 pt-6 px-6">
            <h1 className="text-2xl font-bold">Edit Quiz</h1>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium">
                  Quiz Title
                </label>
                <Input
                  id="title"
                  value={quiz.title}
                  onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
                  placeholder="Enter quiz title"
                  required
                  className="h-12"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">
                  Description
                </label>
                <Textarea
                  id="description"
                  value={quiz.description}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setQuiz({ ...quiz, description: e.target.value })
                  }
                  placeholder="Enter quiz description"
                  required
                  className="min-h-[120px] resize-none"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <Button
                  type="submit"
                  className="flex-1 bg-primary hover:bg-primary/90"
                >
                  <Save className="h-5 w-5 mr-2" />
                  Save Changes
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
