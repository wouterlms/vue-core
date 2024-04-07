<script setup lang="ts">
import { computed, ref } from 'vue'

interface Toast {
  id: string
  message: string
}

const toasts = ref<Toast[]>([])
const isHovered = ref<boolean>(false)

const toastRef = ref<HTMLElement[]>([])

const MAX_TOASTS = 3
const TOAST_GAP = 14 // px

const visibleToasts = computed<Toast[]>(() => {
  return toasts.value.slice(-MAX_TOASTS)
})

function addToast(): void {
  // Generate a random message with a random length between 10 and 30 characters
  const msg = Array.from({ length: Math.floor(Math.random() * 40) + 20 }, () => String.fromCharCode(Math.floor(Math.random() * 26) + 97)).join('')

  toasts.value.push({
    id: String(Date.now()),
    message: `Hello ${toasts.value.length} ${msg}`,
  })

  setTimeout(() => {
    // toasts.value = toasts.value.slice(1)
  }, 2000)
}

function onRemoveToast(toast: Toast): void {
  // toasts.value = toasts.value.filter(t => t.id !== toast.id)
  toasts.value = toasts.value.filter(t => t.id !== toast.id)
}

function onMouseEnter(): void {
  isHovered.value = true
}

function onMouseLeave(): void {
  isHovered.value = false
}

function onClearAll(): void {
  toasts.value.forEach((toast, i) => {
    setTimeout(() => {
      onRemoveToast(toast)
    }, i * 20)
  })
}

function getToastOffset(toast: Toast, isHovered: boolean): string {
  // const toastIndex = visibleToasts.value.findIndex(t => t.id === toast.id)

  // let baseValue

  // if (isHovered) {
  //   baseValue = (visibleToasts.value.length - toastIndex - 1) * 3.5
  // }
  // else {
  //   baseValue = (visibleToasts.value.length - 1 - toastIndex) * 0.9
  // }

  // const nextToast = toastRef.value[toastIndex]

  // let nextToastHeight = 0

  // if (nextToast !== undefined) {
  //   nextToastHeight = nextToast.clientHeight
  // }

  // // console.log(`index: ${toastIndex}`, `-${baseValue + nextToastHeight}px`)

  // return `-${baseValue + nextToastHeight}px`

  const value = 0

  const toastIndex = visibleToasts.value.findIndex(t => t.id === toast.id)

  // get all next toasts and calculate their height with a reduce
  const nextToastHeight = visibleToasts.value.slice(toastIndex + 1).reduce((acc, t) => {
    const toastIndex = visibleToasts.value.findIndex(toast => toast.id === t.id)

    const nextToast = toastRef.value[toastIndex]

    if (nextToast !== undefined) {
      return acc + nextToast.clientHeight
    }

    return acc
  }, 0)

  return `-${value + nextToastHeight + toasts.value.length - toastIndex * TOAST_GAP}px`
}

function getToastScale(toast: Toast, isHovered: boolean): number {
  const toastIndex = visibleToasts.value.findIndex(t => t.id === toast.id)

  let value

  if (isHovered) {
    value = 1
  }
  else {
    value = 1 - (visibleToasts.value.length - 1 - toastIndex) * 0.05
  }

  return value
}

function onLeave(el: Element): void {
  const element = el as HTMLElement

  const id = element.getAttribute('data-id')
  const toastIndex = toasts.value.findIndex(t => t.id === id)
  const shouldAnimateOffset = isHovered.value || (toastIndex === toasts.value.length - 1 || toasts.value.length <= MAX_TOASTS)

  if (shouldAnimateOffset) {
    const offset = getComputedStyle(el).getPropertyValue('--toast-offset')
    element.style.setProperty('--toast-offset', `calc(${offset} + ${isHovered.value || toasts.value.length === 0 ? '3' : '1'}rem)`)
  }
  else {
    element.style.scale = '0.95'

    const offset = getComputedStyle(el).getPropertyValue('--toast-offset')
    element.style.setProperty('--toast-offset', `calc(${offset} - 1rem)`)
  }

  element.style.opacity = '0'
}

// Before enter transition should appear from the bottom and fade in
function onBeforeEnter(el: Element): void {
  const element = el as HTMLElement

  const id = element.getAttribute('data-id')

  const toastIndex = toasts.value.findIndex(t => t.id === id)
  const toast = toasts.value[toastIndex]

  const offset = getToastOffset(toast, isHovered.value)

  const shouldAnimateOffset = toastIndex === toasts.value.length - 1

  element.style.opacity = '0'

  if (shouldAnimateOffset) {
    element.style.setProperty('--toast-offset', '2rem')
  }
  else {
    element.style.setProperty('--toast-offset', `calc(${offset} - 3rem)`)
  }

  setTimeout(() => {
    element.style.opacity = '1'

    // if (shouldAnimateOffset) {
    element.style.setProperty('--toast-offset', offset)
    // }
  }, 0)
}
</script>

<template>
  <div class="relative h-screen overflow-hidden p-24">
    <button @click="addToast">
      Add
    </button>

    <button @click="onClearAll">
      Clear all
    </button>

    <div
      class="absolute bottom-8 right-8 h-[50vh] w-[22rem] bg-red-200"
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
    >
      <TransitionGroup
        leave-active-class="duration-[400ms]"
        @before-enter="onBeforeEnter"
        @leave="onLeave"
      >
        <div
          v-for="(toast) in visibleToasts"
          :key="toast.id"
          ref="toastRef"
          :data-id="toast.id"
          :style="{
            '--toast-offset': getToastOffset(toast, isHovered),
            '--toast-scale': getToastScale(toast, isHovered),
            // 'transform': `translateY(var(--toast-offset)) scale(var(--toast-scale))`,
            'transform': `translateY(var(--toast-offset))`,
          }"
          class="pointer-events-auto absolute bottom-0 right-0 w-[22rem] rounded-popover border border-solid border-neutral-100 bg-popover p-4 shadow-toast-shadow duration-[400ms]"
          @click="onRemoveToast(toast)"
        >
          {{ toast.message }}
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>
