import { defineField, defineType } from "sanity";

export const quizQuestion = defineType({
  name: "quizQuestion",
  title: "Quiz Question",
  type: "document",
  fields: [
    defineField({
      name: "question",
      title: "Question",
      type: "text",
      rows: 2,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "options",
      title: "Options",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.required().min(2),
    }),
    defineField({
      name: "correct",
      title: "Correct Answer Index",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "explanation",
      title: "Explanation",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "topic",
      title: "Topic",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: "question",
      subtitle: "topic",
    },
  },
});
