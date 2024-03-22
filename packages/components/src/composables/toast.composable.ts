import { h } from 'vue'
import { toast as vueSonnerToast } from 'vue-sonner'

import AppToast from '@/components/toast/AppToast.vue'
import type { Toast } from '@/types/toast.type'

interface UseToastReturnType {
  showErrorToast: (toast: Omit<Toast, 'icon'>) => void
  showSuccessToast: (toast: Omit<Toast, 'icon'>) => void
  showToast: (toast: Toast) => void
}

export function useToast(): UseToastReturnType {
  const TOAST_DURATION = 10000

  function showToast(toast: Toast) {
    vueSonnerToast.custom(h(AppToast, {
      description: toast.description,
      icon: toast.icon,
      title: toast.title,
      type: toast.type,
    }), {
      duration: TOAST_DURATION,
    })
  }

  function showErrorToast(toast: Omit<Toast, 'icon' | 'type'>) {
    vueSonnerToast.custom(h(AppToast, {
      description: toast.description,
      icon: 'close',
      title: toast.title,
      type: 'error',
    }), {
      duration: TOAST_DURATION,
    })
  }

  function showSuccessToast(toast: Omit<Toast, 'icon' | 'type'>) {
    vueSonnerToast.custom(h(AppToast, {
      description: toast.description,
      icon: 'checkmark',
      title: toast.title,
      type: 'success',
    }), {
      duration: TOAST_DURATION,
    })
  }

  return {
    showErrorToast,
    showSuccessToast,
    showToast,
  }
}
