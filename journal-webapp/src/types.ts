// src/types.ts
export interface Entry {
  id: number;
  content: string;
	date_time: string;
	emotions: JSON;
	title: string;
	tags: string[];
}
