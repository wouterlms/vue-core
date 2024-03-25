import './styles/index.scss'

// Badge
export { default as AppBadge } from './components/badge/AppBadge.vue'

// Button
export type { AppButtonProps } from './components/button/AppButton.vue'
export { default as AppButton } from './components/button/AppButton.vue'
export { default as AppIconButton } from './components/button/AppIconButton.vue'
export { default as AppRouterLinkButton } from './components/button/AppRouterLinkButton.vue'
export * from './components/button/button.style'

// Checkbox
export { default as FormCheckbox } from './components/checkbox/FormCheckbox.vue'
export { default as FormCheckboxGroup } from './components/checkbox/FormCheckboxGroup.vue'

// Container
export { default as AppContainer } from './components/container/AppContainer.vue'

// Combobox
export { default as AppCombobox } from './components/combobox/AppCombobox.vue'
export { default as AppMultiCombobox } from './components/combobox/AppMultiCombobox.vue'
export { default as FormCombobox } from './components/combobox/FormCombobox.vue'
export { default as FormMultiCombobox } from './components/combobox/FormMultiCombobox.vue'

// Dialog
export { default as AppDialog } from './components/dialog/AppDialog.vue'
export { default as AppDialogCloseButton } from './components/dialog/AppDialogCloseButton.vue'
export { default as AppDialogContainer } from './components/dialog/AppDialogContainer.vue'
export { default as AppDialogDescription } from './components/dialog/AppDialogDescription.vue'
export { default as AppDialogTitle } from './components/dialog/AppDialogTitle.vue'

// Dropdown menu
export { default as AppDropdownMenu } from './components/dropdown-menu/AppDropdownMenu.vue'

// Form error
export { default as FormError } from './components/form-error/FormError.vue'

// Form Group
export { default as FormGroup } from './components/form-group/FormGroup.vue'

// Form input container
export { default as FormInputContainer } from './components/form-input-container/FormInputContainer.vue'

// Form label
export { default as FormLabel } from './components/form-label/FormLabel.vue'

// Icon
export { default as AppIcon } from './components/icon/AppIcon.vue'

// Input
export { default as AppInput } from './components/input/AppInput.vue'
export { default as AppNumberInput } from './components/input/AppNumberInput.vue'
export { default as FormInput } from './components/input/FormInput.vue'
export { default as FormNumberInput } from './components/input/FormNumberInput.vue'
export { default as FormPasswordInput } from './components/input/FormPasswordInput.vue'
export { default as FormPhoneNumberInput } from './components/input/FormPhoneNumberInput.vue'

// Keyboard
export { default as AppKeyboardCommand } from './components/keyboard/AppKeyboardCommand.vue'
export { default as AppKeyboardKey } from './components/keyboard/AppKeyboardKey.vue'

// Loader
export { default as AppLoader } from './components/loader/AppLoader.vue'

// Popover
export { default as AppPopover } from './components/popover/AppPopover.vue'

// Radio group
export { default as FormRadioGroup } from './components/radio-group/FormRadioGroup.vue'
export { default as FormRadioGroupIndicator } from './components/radio-group/FormRadioGroupIndicator.vue'
export { default as FormRadioGroupItem } from './components/radio-group/FormRadioGroupItem.vue'
export { default as FormRadioGroupRoot } from './components/radio-group/FormRadioGroupRoot.vue'

// Select
export { default as AppSelect } from './components/select/AppSelect.vue'
export { default as FormSelect } from './components/select/FormSelect.vue'

// Switch
export { default as FormSwitch } from './components/switch/FormSwitch.vue'

// Text
export { default as AppText } from './components/text/AppText.vue'
export * from './components/text/text.style'

// Toast
export { default as AppToastContainer } from './components/toast/AppToastContainer.vue'

// Toggle
export { default as AppToggle } from './components/toggle/AppToggle.vue'

// Tooltip
export { default as AppTooltip } from './components/tooltip/AppTooltip.vue'

// Composables
export { useDialog } from './composables/dialog.composable'
export { useKeyboardCommand } from './composables/keyboardCommand.composable'
export { useToast } from './composables/toast.composable'

// Types
export type { Icon, Icons } from './icons/icons'
export type { ComboboxItem } from './types/comboboxItem.type'
export type { DropdownMenuItem } from './types/dropdownMenuItem.type'
export type { FormFieldErrors } from './types/formFieldErrors.type'
export type { Routes } from './types/routes.type'
export type { SelectItem } from './types/selectItem.type'

// Other
export { extendIcons } from './icons/icons'
