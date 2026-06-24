import { defineField, defineType } from "sanity";

export const learningLevel = defineType({
  name: "learningLevel",
  title: "Learning Level",
  type: "document",
  fields: [
    defineField({
      name: "num",
      title: "Level Number",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "concept",
      title: "Concept",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "resourceTitle",
      title: "Resource Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "resourceUrl",
      title: "Resource URL",
      type: "url",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "resourceType",
      title: "Resource Type",
      type: "string",
      options: {
        list: [
          { title: "Paper", value: "Paper" },
          { title: "Video", value: "Video" },
          { title: "Article", value: "Article" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "exercise",
      title: "Exercise",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "num",
    },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle: `Level ${subtitle}`,
      };
    },
  },
});
