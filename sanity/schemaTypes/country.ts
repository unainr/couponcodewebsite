import { Globe } from "lucide-react";
import { defineField } from "sanity";

export default {
    name: 'country',
    title: 'Country',
    type: 'document',
    icon: Globe,
    fields: [
        defineField({
            name: 'name',
            title: 'Country Name',
            type: 'string',
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
            }
        })

    ],
}