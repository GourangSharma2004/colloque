import { defineField, defineType } from "sanity";

export const aiModel = defineType({
  name: "aiModel",
  title: "AI Model",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Model Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "bestAt",
      title: "Best At",
      type: "text",
      rows: 2,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "weakness",
      title: "Weakness",
      type: "text",
      rows: 2,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "idealFor",
      title: "Ideal For",
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
      title: "name",
      subtitle: "bestAt",
    },
  },
});
