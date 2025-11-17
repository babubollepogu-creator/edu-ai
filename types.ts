
export interface Profile {
  name: string;
  age: string;
  gender: string;
  avatar: string;
  avatarUrl: string;
}

export interface Course {
  id: string;
  name: string;
  code: string;
  website: string;
}

export type TaskStatus = 'todo' | 'inprogress' | 'done';

export interface Task {
  id: string;
  title: string;
  description: string;
  courseId: string;
  status: TaskStatus;
}

export interface Note {
  id: string;
  title: string;
  content: string;
}

export interface Habit {
  id: string;
  name: string;
  streak: number;
  lastCompleted: string | null;
}

export interface Goal {
  id: string;
  title: string;
  description: string;
  targetDate: string;
  progress: number;
}

export type AssessmentType = 'exam' | 'quiz';

export interface Assessment {
  id: string;
  courseId: string;
  type: AssessmentType;
  date: string;
  startTime: string;
  duration: number; // in minutes
  notes: string;
  conflict: boolean;
}

export interface AppData {
  profile: Profile;
  courses: Course[];
  tasks: Task[];
  notes: Note[];
  habits: Habit[];
  goals: Goal[];
  assessments: Assessment[];
  settings: {
    theme: 'light' | 'dark';
  };
}

export interface AiMessage {
    sender: 'user' | 'assistant' | 'loading';
    text: string;
}

export type Page = 
  | 'dashboard'
  | 'courses'
  | 'tasks'
  | 'notes'
  | 'habits'
  | 'goals'
  | 'exams'
  | 'motivation'
  | 'appearance'
  | 'profile';
