<template>
  <div
    class="py-2 bg-[#D1C4E9] w-full text-center px-2 text-white text-xl font-medium"
  >
    App title...
  </div>

  <div class="container mx-auto">
    <div class="p-3 flex gap-2 items-center my-2 w-full px-5">
      <div
        class="w-[100px] h-[100px] bg-[#D1C4E9] flex justify-center items-center mr-2 text-white text-lg"
      >
        <p>Bild</p>
      </div>
      <div class="">
        <div>
          <p class="font-bold text-base">{{ product_detail.name }}</p>
          <p class="text-gray-70000 text-base">
            Price:
            <span class="text-gray-500 text-base"
              >{{ product_detail ? product_detail.price.value : "-" }}
              {{ product_detail ? product_detail.price.currency : "-" }}</span
            >
          </p>
        </div>
        <div class="flex items-center justify-between">
          <div class="flex flex-row">
            <star-rating
              :increment="0.01"
              :rating="product_detail.rating"
              :show-rating="false"
              :star-size="20"
            ></star-rating>
          </div>
          <div>
            <p>{{product_detail.releaseDate}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="px-5">
      <p class="text-gray-400 text-base font-medium">
        {{ product_detail.description }}
      </p>
    </div>
    <div class="w-full my-5 px-5">
      <button class="text-white bg-[#D1C4E9] py-2 w-full text-xl">
        Vormerken
      </button>
    </div>
    <div class="px-5">
      <p class="text-lg font-bold">Beschreibung</p>
      <p class="text-gray-400 text-base font-medium">
        {{ product_detail.longDescription }}

      </p>
      <p class="text-gray-400 text-base font-medium">...</p>
      <p class="text-gray-400 text-base font-medium">...</p>
    </div>
    <div class="px-5 mt-5">
      <p class="text-gray-400 text-base font-medium">Footer Text...</p>
    </div>
  </div>
</template>
  <script>
import axios from "axios";

import { debounce } from "lodash";
import { reactive, ref, watch, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import StarRating from "vue-star-rating";

export default {
  components: {
    StarRating,
  },
  setup() {
    const router = useRouter();
    const route = useRoute(); // Access route object
    const id = ref("");
    const product_detail = ref("");
    id.value = route.params.id;
    const fetchProduct = debounce(async () => {
      await axios
        .get(
          `https://gist.githubusercontent.com/benfranke/c33280a8df5f4f9db2e63ad45cab26a4/raw/f3ad6c00ff520c2667305103d5705bcbb57a7778/products.json`
        )
        .then((response) => {
          product_detail.value = response.data.products.find(
            (product) => product.id == id.value
          );
          console.log(product_detail.value, "responseresponseresponse");
        })
        .catch((error) => {
          console.error(error);
        });
    });

    onMounted(() => {
      fetchProduct();
    });
    return {
      product_detail,
    };
  },
};
</script>