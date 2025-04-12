import { Store } from "lucide-react";
import { defineField, defineType } from "sanity";

export const storeAdd = defineType({
    name: "storeAdd",
    title: "Add Store",
    type: "document",
    icon: Store,
    fields:[
        defineField({
            name: "name",
            type: "string",
            title: "Name",
        }),
        defineField({
            name: "slug",
            type: "slug",
            title: "Slug",
            options: {
                source: "name",
            }
        }),
        defineField({
            name: "description",
            title: "Description",
            type: "markdown"
        }),
        defineField({
            name: "homeurl",
            title: "Home URL",
            type: "url",
        }),
        defineField({
            name: "affiliate",
            title: "Affiliate URL",
            type: "url",
        }),
        defineField({
            name: "metatitle",
            title: "Meta Title",
            type: "string",
        }),
        defineField({
            name: "metadescription",
            title: "Meta Description",
            type: "markdown",
        }),
        defineField({
            name: "metakeywords",
            title: "Meta Keywords",
            type: "string",
        }),
        defineField({
            name: "country",
            type: "reference",
            title: "Country",
            to: [{type: "country"}],
        }),
        defineField({
            name: "category",
            type: "reference",
            title: "Category",
            to: [{ type: "category" }],
        }),
        defineField({
            name: "images",
            type: "array",
            title: "Images",
            of: [{ type: "image" }],
        }),
    ]
})