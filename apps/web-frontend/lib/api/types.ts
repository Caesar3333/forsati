export type JobType = "full-time" | "part-time" | "contract" | "remote";

export type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  type: JobType;
  level: string;
  salary: string;
  tags: string[];
  category: string;
  description: string;
  requirements: string[];
  benefits: string[];
  postedAt: string;
};

export type Company = {
  slug: string;
  name: string;
  about: string;
  location: string;
  industry: string;
  size: string;
  website: string;
};

export type Application = {
  id: string;
  jobTitle: string;
  company: string;
  status: "new" | "review" | "interview" | "offer" | "rejected";
  date: string;
};

export type Candidate = {
  id: string;
  name: string;
  role: string;
  location: string;
  skills: string[];
  availability: string;
  score: number;
};
