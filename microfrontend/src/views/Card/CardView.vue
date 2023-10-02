<script setup>
import { onBeforeUnmount } from "vue";
import { useCard } from "@/stores/card";
 
const store = useCard();
 
onBeforeUnmount(store.resetForm);
</script>
 
<template>
  <form @submit.prevent="store.handleSubmit" novalidate>
		<div class="max-w-sm mx-auto bg-white rounded-md shadow-md overflow-hidden">
			<div class="px-6 py-4 bg-gray-900 text-white">
				<h1 class="text-lg font-bold">Credit Card</h1>
			</div>
			<div class="px-6 py-4">

				<div class="mb-4">
					<label class="block text-gray-700 font-bold mb-2" for="card-number">
							Card Number
					</label>
					<input
						v-model="store.form.card_number"
						class="appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						id="card-number"
						type="text"
						placeholder="**** **** **** ****"
					/>
					<ValidationError :errors="store.errors" field="card_number" />
				</div>

				<div class="mb-4">
					<label class="block text-gray-700 font-bold mb-2" for="expiration_month">
							Expiration Month
					</label>
					<input
						v-model="store.form.expiration_month"
						class="appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						id="expiration_month"
						type="text"
						placeholder="MM"
					/>
					<ValidationError :errors="store.errors" field="expiration_month" />
				</div>

				<div class="mb-4">
					<label class="block text-gray-700 font-bold mb-2" for="expiration_year">
							Expiration Year
					</label>
					<input
						v-model="store.form.expiration_year"
						class="appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						id="expiration_year"
						type="text"
						placeholder="YYYY"
					/>
					<ValidationError :errors="store.errors" field="expiration_year" />
				</div>

				<div class="mb-4">
					<label class="block text-gray-700 font-bold mb-2" for="cvv">
							CVV
					</label>
					<input
						v-model="store.form.cvv"
						class="appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						id="cvv"
						type="text"
						placeholder="***"
					>
					<ValidationError :errors="store.errors" field="cvv" />
				</div>

				<div class="mb-4">
					<label class="block text-gray-700 font-bold mb-2" for="email">
							Email
					</label>
					<input
						v-model="store.form.email"
						class="appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						id="email"
						type="text"
						placeholder="Email"
					>
					<ValidationError :errors="store.errors" field="email" />
				</div>

				<div class="border-t h-[1px] my-6"></div>

				<div class="flex flex-col gap-2">
					<button type="submit" class="btn btn-primary" :disabled="store.loading">
						<IconSpinner v-show="store.loading" />
						Add Card
					</button>
				</div>
			</div>
		</div>

  </form>
</template>