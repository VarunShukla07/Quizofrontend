"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function CreateQuiz() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [teacherId, setTeacherId] = useState<number | null>(null); // Store teacher_id in state
  const router = useRouter();

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      const user = JSON.parse(userStr);
      if (user && user.id) {
        setTeacherId(user.id); // Set teacher_id from localStorage
      } else {
        alert("User is not logged in. Please login first.");
        router.push("/login"); // Redirect to login if no teacherId found
      }
    } else {
      alert("User is not logged in. Please login first.");
      router.push("/login"); // Redirect to login if no user found
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!teacherId) {
      alert("Teacher ID is missing.");
      return;
    }

    try {
      const newQuiz = { title, description, teacher_id: teacherId }; // Include teacher_id
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/quizzes`,
        newQuiz,
        { withCredentials: true }
      );
      router.push("/dashboard");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Error creating quiz:",
          error.response ? error.response.data : error
        );
      } else {
        console.error("Error creating quiz:", error);
      }
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Create New Quiz</h1>
      <Card>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium">
                Title
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-sm font-medium"
              >
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex gap-4 justify-between mt-6">
              <Button type="submit" className="w-full sm:w-auto">
                Create Quiz
              </Button>
              <Button
                variant="outline"
                className="w-full sm:w-auto"
                onClick={() => router.push("/dashboard")}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
