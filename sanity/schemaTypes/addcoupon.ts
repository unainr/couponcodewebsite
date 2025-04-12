import { Tag } from "lucide-react";
import { defineField, defineType } from "sanity";

export const addCoupon = defineType({
    name: "addCoupon",
    title: "Add Coupon",
    type: "document",
    icon: Tag,
    fields:[
        defineField({
            name: "coupontitle",
            title: "Coupon Title",
            type: "string",
        }),
        defineField({
            name: "description",
            title: "Description",
            type: "markdown"
        }),
        defineField({
            name: "couponurl",
            title: "Coupon URL",
            type: "url",
        }),
        defineField({
            name: "couponcode",
            title: "Coupon Code",
            type: "string",
        }),
        defineField({
            name: "coupontype",
            type: "reference",
            title: "Coupon Type",
            to: [{type: "coupontype"}],
        }),
        defineField({
            name: "store",
            type: "reference",
            title: "Store",
            to: [{type: "storeAdd"}],
        }),
        defineField({
            name: "seasonal",
            type: "reference",
            title: "Seasonal",
            to: [{type: "seasonal"}],
        }),
        defineField({
            name: "publishdate",
            type: "datetime",
            title: "Publish Date",

        }),
        defineField({
            name: "expiredate",
            type: "datetime",
            title: "Expire Date",

        }),
        defineField({
            name: "featured",
            type: "reference",
            title: "featured",
            to: [{ type: "featured" }],
        }),
    
    ]
})