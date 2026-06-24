import { defineField, defineType } from "sanity";

export const taskRule = defineType({
  name: "taskRule",
  title: "Task Rule",
  type: "document",
  fields: [
    defineField({
      name: "keywords",
      title: "Keywords",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "model",
      title: "Recommended Model",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "modelReason",
      title: "Model Reason",
      type: "text",
      rows: 2,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tool",
      title: "Recommended Tool",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "toolReason",
      title: "Tool Reason",
      type: "text",
      rows: 2,
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
      title: "model",
      subtitle: "tool",
    },
  },
});
