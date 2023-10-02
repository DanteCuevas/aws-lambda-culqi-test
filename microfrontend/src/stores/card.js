import { reactive, ref } from "vue";
import { defineStore } from "pinia";
 
export const useCard = defineStore("card", () => {
  const errors = reactive({});
  const loading = ref(false);
  const form = reactive({
    card_number: "",
    cvv: "",
    expiration_month: "",
    expiration_year: "",
    email: "",
  });
 
  function resetForm() {
    form.card_number = "";
    form.cvv = "";
    form.expiration_month = "";
    form.expiration_year = "";
    form.email = "";
  }
 
  async function handleSubmit() {
    if (loading.value) return;
 
    loading.value = true;
    errors.value = {};
 
    return window.axios
      .post("token", form)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        if (error.response.status === 422) {
          console.log(error.response.data);
          errors.value = error.response.data.errors;
        }
      })
      .finally(() => {
        form.cvv = "";
        loading.value = false;
      });
  }
 
  return { form, errors, loading, resetForm, handleSubmit };
});