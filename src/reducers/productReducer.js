import { EDIT_PRODUCT, SELECTED_PRODUCT } from "../actions/types";
const initialState = {
  products: [
    {
      id: 1,
      name: "Micromax A57",
      pricingTier: "budget",
      priceRange: "5k-8k",
      weight: 200,
      availability: 100,
      productUrl: "https://e...content-available-to-author-only...e.com/mma57",
      isEditable: true
    },
    {
      id: 2,
      name: "OnePlus 6T",
      pricingTier: "premier",
      priceRange: "35k-45k",
      weight: 200,
      availability: 30,
      productUrl: "https://e...content-available-to-author-only...e.com/op6t",
      isEditable: true
    },
    {
      id: 3,
      name: "Redmi Ultra",
      pricingTier: "budget",
      priceRange: "8k-11k",
      weight: 150,
      availability: 50,
      productUrl: "https://e...content-available-to-author-only...e.com/redmiu",
      isEditable: true
    }
  ],

  pricingInfo: {
    budget: ["4k-6k", "5k-8k", "8k-11k"],
    premier: ["23k-28k", "30k-34k", "35k-45k"]
  }
};
export default function(state = initialState, action) {
  switch (action.type) {
    case SELECTED_PRODUCT: {
      return {
        ...state,
        currSelectedProduct: action.payload
      };
    }
    case EDIT_PRODUCT: {
      const products = [...state.products];
      const product = action.payload;
      const updatedProductList = [];
      products.map(prod => {
        if (prod.id === product.id) {
          prod = { ...product };
          updatedProductList.push(prod);
        } else {
          updatedProductList.push(prod);
        }
      });
      return {
        ...state,
        products: [...updatedProductList],
        currSelectedProduct: undefined
      };
    }
    default:
      return state;
  }
}
