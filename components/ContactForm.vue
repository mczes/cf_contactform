<template>
  <div class="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto mt-8 p-8 bg-white rounded-lg shadow-lg transition-all duration-300 ease-in-out hover:shadow-xl">
    <h2 class="text-3xl font-bold mb-6 text-center text-gray-800">Get in Touch</h2>
    <form @submit.prevent="submitForm" class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="relative">
          <input
            type="text"
            id="name"
            v-model="form.name"
            required
            class="peer w-full p-4 border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-indigo-600 placeholder-transparent transition-all duration-300"
            placeholder="Your Name"
          />
          <label for="name" class="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Your Name</label>
          <p v-if="errors.name" class="text-red-500 text-xs mt-1">{{ errors.name }}</p>
        </div>
        <div class="relative">
          <input
            type="email"
            id="email"
            v-model="form.email"
            required
            class="peer w-full p-4 border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-indigo-600 placeholder-transparent transition-all duration-300"
            placeholder="Your Email"
          />
          <label for="email" class="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Your Email</label>
          <p v-if="errors.email" class="text-red-500 text-xs mt-1">{{ errors.email }}</p>
        </div>
      </div>
      <div class="relative">
        <textarea
          id="message"
          v-model="form.message"
          rows="4"
          required
          class="peer w-full p-4 border-2 border-gray-300 rounded-md text-gray-900 focus:outline-none focus:border-indigo-600 placeholder-transparent transition-all duration-300"
          placeholder="Your Message"
        ></textarea>
        <label for="message" class="absolute left-2 -top-3 bg-white px-2 text-gray-600 text-sm transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-focus:-top-3 peer-focus:text-gray-600 peer-focus:text-sm">Your Message</label>
        <p v-if="errors.message" class="text-red-500 text-xs mt-1">{{ errors.message }}</p>
      </div>
      <div>
        <button
          type="submit"
          :disabled="!isFormValid"
          class="w-full md:w-auto md:px-8 flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Send Message
        </button>
      </div>
    </form>
    <transition name="fade">
      <div v-if="showSuccessMessage" class="mt-4 p-4 bg-green-100 text-green-700 rounded-md">
        Thank you for your message! We'll get back to you soon.
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from 'vue'

const form = reactive({
  name: '',
  email: '',
  message: ''
})

const errors = reactive({
  name: '',
  email: '',
  message: ''
})

const showSuccessMessage = ref(false)

const isFormValid = computed(() => {
  return form.name.length > 0 && form.email.length > 0 && form.message.length > 0 &&
         Object.values(errors).every(error => error === '')
})

const validateForm = () => {
  errors.name = form.name.length < 2 ? 'Name must be at least 2 characters long' : ''
  errors.email = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) ? 'Please enter a valid email address' : ''
  errors.message = form.message.length < 10 ? 'Message must be at least 10 characters long' : ''
}

const submitForm = () => {
  validateForm()
  if (isFormValid.value) {
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', form)
    
    // Show success message
    showSuccessMessage.value = true

    // Reset form after submission
    form.name = ''
    form.email = ''
    form.message = ''

    // Hide success message after 5 seconds
    setTimeout(() => {
      showSuccessMessage.value = false
    }, 5000)
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
