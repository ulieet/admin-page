export type BlockType = "hero" | "text-image" | "gallery" | "features" | "contact" | "testimonials" | "stats" | "cta"

export interface BaseBlock {
  id: string
  type: BlockType
  order: number
  active: boolean
}

export interface HeroBlock extends BaseBlock {
  type: "hero"
  data: {
    title: string
    subtitle: string
    ctaText: string
    ctaLink: string
    backgroundImage?: string
    layout: "center" | "left"
  }
}

export interface TextImageBlock extends BaseBlock {
  type: "text-image"
  data: {
    title: string
    description: string
    image: string
    imagePosition: "left" | "right"
    ctaText?: string
    ctaLink?: string
  }
}

export interface GalleryBlock extends BaseBlock {
  type: "gallery"
  data: {
    title: string
    description?: string
    images: Array<{
      url: string
      title: string
      description?: string
    }>
    columns: 2 | 3 | 4
  }
}

export interface FeaturesBlock extends BaseBlock {
  type: "features"
  data: {
    title: string
    description?: string
    features: Array<{
      icon: string
      title: string
      description: string
    }>
  }
}

export interface ContactBlock extends BaseBlock {
  type: "contact"
  data: {
    title: string
    description?: string
    email: string
    phone: string
    address?: string
  }
}

export interface TestimonialsBlock extends BaseBlock {
  type: "testimonials"
  data: {
    title: string
    testimonials: Array<{
      name: string
      role: string
      content: string
      avatar?: string
    }>
  }
}

export interface StatsBlock extends BaseBlock {
  type: "stats"
  data: {
    title?: string
    stats: Array<{
      value: string
      label: string
    }>
  }
}

export interface CTABlock extends BaseBlock {
  type: "cta"
  data: {
    title: string
    description: string
    buttonText: string
    buttonLink: string
    backgroundColor?: string
  }
}

export type Block =
  | HeroBlock
  | TextImageBlock
  | GalleryBlock
  | FeaturesBlock
  | ContactBlock
  | TestimonialsBlock
  | StatsBlock
  | CTABlock
