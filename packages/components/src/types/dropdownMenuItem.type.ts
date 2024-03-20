import type { Icon } from '../icons/icons'

export interface DropdownMenuDivider {
  type: 'divider'
}

export interface DropdownMenuLabel {
  label: string
  type: 'label'
}

export interface DropdownMenuTrigger {
  icon: Icon
  items: DropdownMenuItem[]
  label: string
  type: 'trigger'
}

export interface DropdownMenuGroup {
  items: DropdownMenuItem[]
  type: 'group'

}

export interface DropdownMenuOption {
  icon: Icon
  label: string
  onSelect: () => void
  type: 'option'
}

export type DropdownMenuItem = DropdownMenuDivider
  | DropdownMenuGroup
  | DropdownMenuLabel
  | DropdownMenuOption
  | DropdownMenuTrigger
