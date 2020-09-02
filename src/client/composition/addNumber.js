import { computed, ref, reactive } from 'vue';

export function addNumber(){
  const count = ref(0)

  const state = reactive({
    message: 'Vue3'
  })

  const doubleCount = computed(() => count.value * 2)

  const increment = e => {
    console.log(e)
    count.value += 10
    state.message = 'Vue3. GoGoGo!'
  }

  return {
    count,
    state,
    doubleCount,
    increment
  }
}