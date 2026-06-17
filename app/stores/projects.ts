import { defineStore } from 'pinia'

export interface Project {
  id: string
  title: string
  title_ar?: string
  description: string
  description_ar?: string
  location: string
  location_ar?: string
  price: number | null
  status: 'available' | 'sold' | 'coming_soon'
  images: string[]
  specifications: Record<string, string>
  specifications_ar?: Record<string, string>
  created_at: string
}

// Seed data used until Phase 3 API is wired up
const MOCK_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Nile View Residences',
    title_ar: 'مساكن إطلالة النيل',
    description: 'A luxurious residential compound overlooking the Nile, featuring 120 units with world-class amenities including a rooftop infinity pool, private gym, and landscaped gardens.',
    description_ar: 'مجمع سكني فاخر يطل على النيل، يضم 120 وحدة بمرافق عالمية المستوى تشمل مسبحاً لانهائياً على السطح وصالة لياقة خاصة وحدائق منسقة.',
    location: 'Zamalek, Cairo',
    location_ar: 'الزمالك، القاهرة',
    price: 4500000,
    status: 'available',
    images: [
      '/images/projects/placeholder-3.svg',
      '/images/projects/placeholder-1.svg',
      '/images/projects/placeholder-4.svg',
    ],
    specifications: {
      'Units': '120',
      'Area': '180 – 320 m²',
      'Floors': '22',
      'Year': '2024',
      'Parking': '2 per unit',
    },
    specifications_ar: {
      'الوحدات': '120',
      'المساحة': '180 – 320 م²',
      'الطوابق': '22',
      'السنة': '2024',
      'المواقف': '2 لكل وحدة',
    },
    created_at: '2024-01-15T00:00:00Z',
  },
  {
    id: '2',
    title: 'Palm Heights Villas',
    title_ar: 'فيلات بالم هايتس',
    description: 'Exclusive standalone villas in New Cairo featuring private pools, spacious gardens, and a gated community with 24/7 security. Each villa is a masterpiece of modern architecture.',
    description_ar: 'فيلات مستقلة حصرية في القاهرة الجديدة تتميز بمسابح خاصة وحدائق واسعة ومجتمع مسوّر بحراسة على مدار الساعة. كل فيلا تحفة فنية من العمارة الحديثة.',
    location: 'New Cairo, 5th Settlement',
    location_ar: 'القاهرة الجديدة، التجمع الخامس',
    price: 12000000,
    status: 'available',
    images: [
      '/images/projects/placeholder-2.svg',
      '/images/projects/placeholder-1.svg',
      '/images/projects/placeholder-3.svg',
    ],
    specifications: {
      'Villas': '40',
      'Area': '450 – 800 m²',
      'Bedrooms': '4 – 6',
      'Year': '2023',
      'Pool': 'Private',
    },
    specifications_ar: {
      'الفيلات': '40',
      'المساحة': '450 – 800 م²',
      'غرف النوم': '4 – 6',
      'السنة': '2023',
      'المسبح': 'خاص',
    },
    created_at: '2023-06-01T00:00:00Z',
  },
  {
    id: '3',
    title: 'Downtown Business Tower',
    title_ar: 'برج الأعمال وسط المدينة',
    description: 'A 30-floor commercial tower in the heart of downtown Cairo offering premium office spaces, retail on ground floors, and panoramic city views from every floor.',
    description_ar: 'برج تجاري من 30 طابقاً في قلب وسط القاهرة يوفر مساحات مكتبية فاخرة ومحلات تجارية في الطوابق الأرضية وإطلالات بانورامية على المدينة.',
    location: 'Downtown Cairo',
    location_ar: 'وسط القاهرة',
    price: 8500000,
    status: 'sold',
    images: [
      '/images/projects/placeholder-1.svg',
      '/images/projects/placeholder-4.svg',
      '/images/projects/placeholder-3.svg',
    ],
    specifications: {
      'Floors': '30',
      'Units': '200 offices',
      'Area': '80 – 500 m²',
      'Year': '2022',
      'Parking': 'Multi-level',
    },
    specifications_ar: {
      'الطوابق': '30',
      'الوحدات': '200 مكتب',
      'المساحة': '80 – 500 م²',
      'السنة': '2022',
      'المواقف': 'متعددة الطوابق',
    },
    created_at: '2022-03-10T00:00:00Z',
  },
  {
    id: '4',
    title: 'Emera Sky Residences',
    title_ar: 'إيميرا سكاي ريزيدنسز',
    description: 'Our flagship upcoming development — a twin-tower luxury complex on the New Administrative Capital waterfront, featuring 350 smart homes, a marina, and premium retail.',
    description_ar: 'مشروعنا الرائد القادم — مجمع فاخر ببرجين توأم على واجهة العاصمة الإدارية الجديدة، يضم 350 منزلاً ذكياً ومارينا ومحلات تجارية فاخرة.',
    location: 'New Administrative Capital',
    location_ar: 'العاصمة الإدارية الجديدة',
    price: null,
    status: 'coming_soon',
    images: [
      '/images/projects/placeholder-4.svg',
      '/images/projects/placeholder-1.svg',
      '/images/projects/placeholder-2.svg',
    ],
    specifications: {
      'Units': '350',
      'Towers': '2',
      'Floors': '40 each',
      'Expected': '2026',
      'Smart Home': 'Yes',
    },
    specifications_ar: {
      'الوحدات': '350',
      'الأبراج': '2',
      'الطوابق': '40 لكل برج',
      'التسليم': '2026',
      'منزل ذكي': 'نعم',
    },
    created_at: '2024-09-01T00:00:00Z',
  },
  {
    id: '5',
    title: 'Maadi Green Compound',
    title_ar: 'كمبوند ماعدي الأخضر',
    description: 'An eco-conscious residential community in Maadi with 80 apartments surrounded by lush greenery. Solar-powered common areas, EV charging stations, and a community farm.',
    description_ar: 'مجتمع سكني واعٍ بيئياً في المعادي يضم 80 شقة محاطة بالخضرة. مناطق مشتركة تعمل بالطاقة الشمسية ومحطات شحن للسيارات الكهربائية ومزرعة مجتمعية.',
    location: 'Maadi, Cairo',
    location_ar: 'المعادي، القاهرة',
    price: 3200000,
    status: 'available',
    images: [
      '/images/projects/placeholder-2.svg',
      '/images/projects/placeholder-3.svg',
      '/images/projects/placeholder-1.svg',
    ],
    specifications: {
      'Units': '80',
      'Area': '120 – 240 m²',
      'Floors': '6',
      'Year': '2024',
      'Green': 'LEED Certified',
    },
    specifications_ar: {
      'الوحدات': '80',
      'المساحة': '120 – 240 م²',
      'الطوابق': '6',
      'السنة': '2024',
      'الشهادة': 'LEED',
    },
    created_at: '2024-04-20T00:00:00Z',
  },
  {
    id: '6',
    title: 'Marina Bay Apartments',
    title_ar: 'شقق مارينا باي',
    description: 'Waterfront apartments on the North Coast with direct beach access, private marina for yacht owners, and resort-style facilities open year-round.',
    description_ar: 'شقق على الواجهة البحرية للساحل الشمالي مع وصول مباشر للشاطئ ومارينا خاصة لأصحاب اليخوت ومرافق على طراز المنتجعات طوال العام.',
    location: 'North Coast, Alexandria',
    location_ar: 'الساحل الشمالي، الإسكندرية',
    price: 5800000,
    status: 'sold',
    images: [
      '/images/projects/placeholder-3.svg',
      '/images/projects/placeholder-2.svg',
      '/images/projects/placeholder-4.svg',
    ],
    specifications: {
      'Units': '220',
      'Area': '100 – 280 m²',
      'Beachfront': '500m',
      'Year': '2023',
      'Marina': '60 berths',
    },
    specifications_ar: {
      'الوحدات': '220',
      'المساحة': '100 – 280 م²',
      'الشاطئ': '500م',
      'السنة': '2023',
      'المارينا': '60 رسواً',
    },
    created_at: '2023-08-15T00:00:00Z',
  },
]

export const useProjectsStore = defineStore('projects', () => {
  const projects = ref<Project[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchProjects() {
    loading.value = true
    error.value = null
    try {
      // Phase 3: replace with $fetch('/api/projects')
      await new Promise(r => setTimeout(r, 300))
      projects.value = MOCK_PROJECTS
    } catch (e: unknown) {
      error.value = e instanceof Error ? e.message : 'Failed to load projects'
    } finally {
      loading.value = false
    }
  }

  function getById(id: string) {
    return projects.value.find(p => p.id === id) ?? null
  }

  return { projects, loading, error, fetchProjects, getById }
})
