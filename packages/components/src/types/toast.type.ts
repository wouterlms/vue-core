import type { ComputedRef, Ref } from 'vue'

import type { Icon } from '../icons/icons'

export type ToastType = 'error' | 'info' | 'success'

export interface ToastAction {
  icon?: Icon
  isLoading?: ComputedRef<boolean> | Ref<boolean>
  label: string
  onClick: (onClose: () => void) => void
}

export interface Toast {
  action?: ToastAction
  description?: string
  duration?: number
  icon: Icon
  title: string
  type: ToastType
}
