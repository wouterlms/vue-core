import type { RouteLocationNamedRaw } from 'vue-router'

export interface BreadcrumbRoute {
  label: string
  to: RouteLocationNamedRaw
  type: 'route'
}

export interface BreadcrumbEllipsis {
  items: BreadcrumbRoute[]
  type: 'ellipsis'
}

export interface BreadcrumbCurrentRoute {
  label: string
  type: 'page'
}

export type BreadcrumbItem = BreadcrumbCurrentRoute | BreadcrumbEllipsis | BreadcrumbRoute
