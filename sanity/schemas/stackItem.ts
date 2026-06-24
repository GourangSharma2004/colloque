import { defineField, defineType } from "sanity";

export const stackItem = defineType({
  name: "stackItem",
  title: "Stack Item",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
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
      name: "useCase",
      title: "Use Case",
      type: "text",
      rows: 2,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "whyThis",
      title: "Why This",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
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
      name: "documentation",
      title: "Documentation URL",
      type: "string",
    }),
    defineField({
      name: "pipeline",
      title: "Pipeline URL",
      type: "string",
    }),
    defineField({
      name: "cheatsheet",
      title: "Cheat Sheet URL",
      type: "string",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "string",
    }),
    defineField({
      name: "downloadLink",
      title: "Download Link",
      type: "string",
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
