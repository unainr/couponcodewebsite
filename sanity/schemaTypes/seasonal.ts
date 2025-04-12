import { Snowflake } from "lucide-react";
import { defineField } from "sanity";

export default {
    name: 'seasonal',
    title: 'seasonal',
    type: 'document',
    icon: Snowflake,
    fields: [
        defineField({
            name: 'name',
            title: 'seasonal',
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