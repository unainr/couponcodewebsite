import { Type } from "lucide-react";
import { defineField } from "sanity";

export default {
    name: 'coupontype',
    title: 'Coupon Type',
    type: 'document',
    icon: Type,
    fields: [
        defineField({
            name: 'name',
            title: 'coupon type',
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