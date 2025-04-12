import { client } from "@/sanity/lib/client";
import { ALL_CATEGORIES_QUERY, ALL_COUPON_TYPES_QUERY, ALL_SEASONS_QUERY } from "@/sanity/lib/queries";
import NavBar from "./NavBar";

// Add this query to your queries file or define it inlin

const ServerNavbar = async () => {
  // Fetch categories from Sanity
  const categories = await client.fetch(ALL_CATEGORIES_QUERY);
  const couponTypes = await client.fetch(ALL_COUPON_TYPES_QUERY)
  const season = await client.fetch(ALL_SEASONS_QUERY)
  return (
    <header>
      <NavBar categories={categories} couponTypes={couponTypes} season={season} />
    </header>
  );
};

export default ServerNavbar;
