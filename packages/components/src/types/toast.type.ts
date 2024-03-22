import type { Icon } from '@/icons/icons'

export type ToastType = 'error' | 'info' | 'success'

export interface Toast {
  description?: string
  icon: Icon
  title: string
  type: ToastType
}
