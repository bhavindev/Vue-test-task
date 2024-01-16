
<script>
import axios from "axios";
import { reactive, ref, watch, onMounted } from "vue";
import { debounce } from "lodash";
import StarRating from "vue-star-rating";
import { useRouter } from 'vue-router';


export default {
    components: {
        StarRating,
    },
    setup() {
      const router = useRouter();
    const allProductdata = ref("");
    const fetchAllProduct = debounce(async () => {
      allProductdata.value = "";
      await axios
        .get(
          `https://gist.githubusercontent.com/benfranke/c33280a8df5f4f9db2e63ad45cab26a4/raw/f3ad6c00ff520c2667305103d5705bcbb57a7778/products.json`
        )
        .then((response) => {
          console.log(response, "responseresponseresponse");
          allProductdata.value = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    });

    const goToProduct = debounce(async (id) => {
        
      router.push({ name: "OneProduct", params: { id: id } });
    });

    onMounted(() => {
      fetchAllProduct();
    });
    return {
        goToProduct,
      fetchAllProduct,
      allProductdata,
    };
  },
};
</script>
<template>
  <div
    class="py-2 bg-[#D1C4E9] w-full text-center px-2 text-white text-xl font-medium"
  >
    Test APP
  </div>
  <div class="flex justify-between bg-gray-300 py-2 w-full px-5">
    <div v-for="(item, index) in allProductdata.filters" :key="index">
      <p class="text-base font-bold">{{ item }}</p>
    </div>
  </div>

  <div class="container">
    <div class="text-left w-full px-5 py-2">
      <p class="text-lg font-bold">
        {{ allProductdata.header ? allProductdata.header.headerTitle : "-" }}
      </p>
      <p class="text-lg text-gray-500">
        {{
          allProductdata.header ? allProductdata.header.headerDescription : "-"
        }}
      </p>
    </div>
    <div v-for="product in allProductdata.products" :key="product.id">
      <div
        class="border p-3 flex gap-2 items-center my-2 mx-5"
        v-if="product.id % 2 === 0"
      >
        <div
          class="p-[30px] bg-[#D1C4E9] flex justify-center items-center mr-2"
        >
        <p class="text-white" @click="goToProduct(product.id)">Bild</p>
    </div>
        <div>
          <div class="flex justify-between">
            <p class="font-bold text-base">{{ product.name }}</p>
            <p class="font-medium text-gray-400 text-base">{{product.releaseDate}}</p>
          </div>
          <p class="text-gray-400 text-base font-medium">
            {{ product.description }}
          </p>
          <div class="flex items-center justify-between">
            <p class="text-gray-70000 text-base">
              Price:
              <span class="text-gray-500 text-base"
                >{{ product.price.value }} {{ product.price.currency }}</span
              >
            </p>
            <div class="flex">
              <star-rating
                :increment="0.01"
                :rating="product.rating"
                :show-rating="false"
                :star-size="20"
              ></star-rating>
            </div>
          </div>
        </div>
      </div>

      <div class="border p-3 flex gap-2 items-center my-2 mx-5" v-else>
        <div>
          <div>
            <p class="font-bold text-base">{{ product.name }}</p>
          </div>
          <p class="text-gray-400 text-base font-medium">
            {{ product.description }}
          </p>
          <div class="flex items-center justify-between">
            <p class="text-gray-70000 text-base">
              Price:
              <span class="text-gray-500 text-base"
                >{{ product.price.value }} {{ product.price.currency }}</span
              >
            </p>
            <div class="flex">
              <star-rating
                :increment="0.01"
                :rating="product.rating"
                :show-rating="false"
                :star-size="20"
              ></star-rating>
            </div>
          </div>
        </div>
        <div class="p-[30px] bg-[#D1C4E9] flex justify-center items-center">
          <p class="text-white" @click="goToProduct(product.id)">Bild</p>
        </div>
      </div>
    </div>
    <div class="text-left w-full px-5">
      <p class="text-gray-500 text-left">Footer Text....</p>
    </div>
  </div>

  <div class="flex justify-between bg-gray-300 py-2 w-full px-5 fixed bottom-0">
    <div v-for="(item, index) in allProductdata.filters" :key="index">
      <p class="text-base font-bold">{{ item }}</p>
    </div>
  </div>
</template>
