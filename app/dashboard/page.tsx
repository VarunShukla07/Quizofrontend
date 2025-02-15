"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Brain, PlusCircle, Edit2, Trash2, LogOut } from "lucide-react";

interface Quiz {
  id: number;
  title: string;
  description: string;
  created_at: string;
}

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function QuizDashboard() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [filter, setFilter] = useState("all");
  const [user, setUser] = useState<{ username: string } | null>(null);
  const router = useRouter();
  const teacherId = 1;

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (!userData) {
      router.push("/login");
    } else {
      setUser(JSON.parse(userData));
    }
  }, [router]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const endpoint = `${BACKEND_URL}/quizzes`;
        const res = await axios.get(endpoint, { withCredentials: true });
        setQuizzes(res.data);
      } catch (error) {
        console.error("Error fetching quizzes", error);
      }
    };
    fetchQuizzes();
  }, [filter, teacherId]);

  const handleEdit = (id: number) => {
    router.push(`/dashboard/edit/${id}`);
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`${BACKEND_URL}/quizzes/${id}`, {
        withCredentials: true,
      });
      setQuizzes(quizzes.filter((quiz) => quiz.id !== id));
    } catch (error) {
      console.error("Error deleting quiz", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    axios
      .post(`${BACKEND_URL}/logout`, {}, { withCredentials: true })
      .then(() => router.push("/login"))
      .catch((error) => console.error("Error logging out", error));
  };

  if (!user) return null;

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
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 mr-4">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-sm font-medium">
                  {user.username[0].toUpperCase()}
                </span>
              </div>
              <span className="font-medium">{user.username}</span>
            </div>
            <Button
              variant="ghost"
              onClick={handleLogout}
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <LogOut className="h-5 w-5 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Action Buttons */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex gap-4">
            <Button
              onClick={() => router.push("/dashboard/create")}
              className="bg-primary hover:bg-primary/90"
            >
              <PlusCircle className="h-5 w-5 mr-2" />
              Create Quiz
            </Button>
            <ToggleGroup type="single" value={filter} onValueChange={setFilter}>
              <ToggleGroupItem value="all" className="px-4">
                All Quizzes
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>

        {/* Quizzes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizzes.map((quiz) => (
            <Card
              key={quiz.id}
              className="group hover:shadow-lg transition-shadow"
            >
              <CardContent className="p-6">
                <div className="flex flex-col h-full">
                  <h2 className="text-xl font-bold text-primary mb-2">
                    {quiz.title}
                  </h2>
                  <p className="text-muted-foreground flex-grow mb-4">
                    {quiz.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {new Date(quiz.created_at).toLocaleDateString()}
                    </span>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(quiz.id)}
                        className="hover:bg-primary/10 hover:text-primary"
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(quiz.id)}
                        className="hover:bg-destructive/10 hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
