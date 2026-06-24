import { defineField, defineType } from "sanity";

export const aiTool = defineType({
  name: "aiTool",
  title: "AI Tool",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Tool Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Writing", value: "Writing" },
          { title: "Coding", value: "Coding" },
          { title: "Image", value: "Image" },
          { title: "Video", value: "Video" },
          { title: "Research", value: "Research" },
          { title: "Productivity", value: "Productivity" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "pricing",
      title: "Pricing",
      type: "string",
      options: {
        list: [
          { title: "Free", value: "Free" },
          { title: "Paid", value: "Paid" },
          { title: "Freemium", value: "Freemium" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "url",
      title: "URL",
      type: "url",
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
      title: "name",
      subtitle: "category",
    },
  },
});
