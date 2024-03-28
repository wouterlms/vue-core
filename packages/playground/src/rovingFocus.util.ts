export type Orientation = 'horizontal' | 'vertical'
export type Direction = 'ltr' | 'rtl'

export const ENTRY_FOCUS = 'rovingFocusGroup.onEntryFocus'
export const EVENT_OPTIONS = {
  bubbles: false,
  cancelable: true,
}

export const MAP_KEY_TO_FOCUS_INTENT: Record<string, FocusIntent> = {
  ArrowDown: 'next',
  ArrowLeft: 'prev',
  ArrowRight: 'next',
  ArrowUp: 'prev',
  End: 'last',
  Home: 'first',
  PageDown: 'last',
  PageUp: 'first',
}

export function getDirectionAwareKey(key: string, dir?: Direction) {
  if (dir !== 'rtl') {
    return key
  }
  return key === 'ArrowLeft'
    ? 'ArrowRight'
    : key === 'ArrowRight'
      ? 'ArrowLeft'
      : key
}

type FocusIntent = 'first' | 'last' | 'next' | 'prev'

export function getFocusIntent(
  event: KeyboardEvent,
  orientation?: Orientation,
  dir?: Direction,
) {
  const key = getDirectionAwareKey(event.key, dir)
  if (orientation === 'vertical' && [
    'ArrowLeft',
    'ArrowRight',
  ].includes(key)) { return undefined }
  if (orientation === 'horizontal' && [
    'ArrowDown',
    'ArrowUp',
  ].includes(key)) { return undefined }

  return MAP_KEY_TO_FOCUS_INTENT[key]
}

export function focusFirst(candidates: HTMLElement[]) {
  const PREVIOUSLY_FOCUSED_ELEMENT = document.activeElement
  for (const candidate of candidates) {
    // if focus is already where we want to go, we don't want to keep going through the candidates
    if (candidate === PREVIOUSLY_FOCUSED_ELEMENT) {
      return
    }
    candidate.focus()
    if (document.activeElement !== PREVIOUSLY_FOCUSED_ELEMENT) {
      return
    }
  }
}

/**
 * Wraps an array around itself at a given start index
 * Example: `wrapArray(['a', 'b', 'c', 'd'], 2) === ['c', 'd', 'a', 'b']`
 */
export function wrapArray<T>(array: T[], startIndex: number) {
  return array.map((_, index) => array[(startIndex + index) % array.length])
}
