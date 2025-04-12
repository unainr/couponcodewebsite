import { List } from "lucide-react";
import { defineField } from "sanity";

export default {
    name: 'category',
    title: 'Category',
    type: 'document',
    icon: List,
    fields: [
      defineField({
        name: "name",
        title: "Category Name",
        type: "string",
      }),
      defineField({
        name: "slug",
        title: "Slug",
        type: "slug",
        options: {
          source: "name",
          maxLength: 96,
        },
        validation: (Rule) => Rule.required(),
      }),
      
    ],
  }