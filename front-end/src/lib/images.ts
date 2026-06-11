/**
 * Central image registry. All visuals on the site resolve through here,
 * so swapping placeholders for final brand photography (or GLB renders)
 * only requires replacing files in /public/images or editing this map.
 */
export const IMG = {
  avocadoToast: "/images/avocado-toast.jpg",
  saladBowls: "/images/salad-bowls.jpg",
  salmonSkillet: "/images/salmon-skillet.jpg",
  steakPlates: "/images/steak-plates.jpg",
  grillPlatter: "/images/grill-platter.jpg",
  greenSalad: "/images/green-salad.jpg",
  fineDining: "/images/fine-dining.jpg",
  eventTables: "/images/event-tables.jpg",
  chefPrep: "/images/chef-prep.jpg",
  dessert: "/images/dessert.jpg",
  bread: "/images/bread.jpg",
  croissants: "/images/croissants.jpg",
  coffee: "/images/coffee.jpg",
  herbs: "/images/herbs.jpg",
  veggies: "/images/veggies.jpg",
  cheeseBoard: "/images/cheese-board.jpg",
  canapes: "/images/canapes.jpg",
  fruit: "/images/fruit.jpg",
} as const;

export type ImageKey = keyof typeof IMG;
