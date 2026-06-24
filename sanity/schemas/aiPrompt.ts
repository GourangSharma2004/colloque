import { defineField, defineType } from "sanity";

export const aiPrompt = defineType({
  name: "aiPrompt",
  title: "AI Prompt",
  type: "document",
  fields: [
    defineField({
      name: "id",
      title: "ID",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Image Editing", value: "Image Editing" },
          { title: "Image Generation", value: "Image Generation" },
          { title: "Video", value: "Video" },
          { title: "Web/UI", value: "Web/UI" },
          { title: "Writing & Thinking", value: "Writing & Thinking" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "prompt",
      title: "Prompt",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "produces",
      title: "Produces",
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
      title: "id",
      subtitle: "category",
    },
  },
});
