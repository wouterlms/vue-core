import {
  computed,
  type ComputedRef,
  useAttrs,
} from 'vue'

interface UseComponentAttrsReturnType {
  classAttr: ComputedRef<string>
  otherAttrs: ComputedRef<Record<string, unknown>>
}

export function useComponentAttrs(): UseComponentAttrsReturnType {
  const attrs = useAttrs()

  const classAttr = computed<string>(() => attrs.class as string)

  const otherAttrs = computed<Record<string, unknown>>(() => {
    const { class: _, ...otherAttrs } = attrs
    return otherAttrs
  })

  return {
    classAttr,
    otherAttrs,
  }
}
