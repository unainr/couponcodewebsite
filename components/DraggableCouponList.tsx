"use client";

import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import { CouponProps } from "@/lib/types";
import Coupon from "./Coupon";
import { client } from "@/sanity/lib/client";

interface DraggableCouponListProps {
  initialCoupons: (CouponProps & { _id: string; order: number })[];
  storeSlug?: string;
}

const DraggableCouponList = ({ initialCoupons, storeSlug }: DraggableCouponListProps) => {
  const [coupons, setCoupons] = useState(initialCoupons);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleDragEnd = async (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(coupons);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // Update local state immediately for better UX
    setCoupons(items);

    // Update order values based on new positions
    const updatedItems = items.map((item, index) => ({
      ...item,
      order: index
    }));

    // Update Sanity with new order
    try {
      const updatePromises = updatedItems.map((item, index) =>
        client
          .patch(item._id)
          .set({ order: index })
          .commit()
      );

      await Promise.all(updatePromises);
      console.log("Coupon order updated successfully");
    } catch (error) {
      console.error("Error updating coupon order:", error);
      // Revert local state if update fails
      setCoupons(initialCoupons);
    }
  };

  if (!isClient) {
    return (
      <div className="space-y-4">
        {coupons.map((coupon) => (
          <Coupon
            key={coupon._id}
            code={coupon.code}
            description={coupon.description}
            expiryDate={coupon.expiryDate}
            updateDate={coupon.updateDate}
            storeImage={coupon.storeImage}
            couponTitle={coupon.couponTitle}
            featured={coupon.featured}
            coupontype={coupon.coupontype}
            couponurl={coupon.couponurl}
            slug={coupon.slug}
            id={coupon.id}
          />
        ))}
      </div>
    );
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="coupons">
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={`space-y-4 ${
              snapshot.isDraggingOver ? "bg-gray-50 rounded-lg p-2" : ""
            }`}
          >
            {coupons.map((coupon, index) => (
              <Draggable key={coupon._id} draggableId={coupon._id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`${
                      snapshot.isDragging
                        ? "shadow-lg rotate-2 scale-105"
                        : "hover:shadow-md"
                    } transition-all duration-200 cursor-move`}
                    style={{
                      ...provided.draggableProps.style,
                    }}
                  >
                    <div className="relative">
                      {/* Drag indicator */}
                      <div className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10">
                        <div className="flex flex-col space-y-1">
                          <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                          <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                          <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                          <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                          <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                          <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                        </div>
                      </div>
                      
                      <Coupon
                        code={coupon.code}
                        description={coupon.description}
                        expiryDate={coupon.expiryDate}
                        updateDate={coupon.updateDate}
                        storeImage={coupon.storeImage}
                        couponTitle={coupon.couponTitle}
                        featured={coupon.featured}
                        coupontype={coupon.coupontype}
                        couponurl={coupon.couponurl}
                        slug={coupon.slug}
                        id={coupon.id}
                      />
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DraggableCouponList;