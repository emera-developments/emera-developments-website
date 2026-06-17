<template>
  <div class="pt-20 min-h-screen">
    <!-- Hero -->
    <section class="bg-gray-950 py-20 lg:py-28">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-3xl">
          <p class="text-gold-400 text-sm font-semibold tracking-widest uppercase mb-3">
            {{ isAr ? 'من نحن' : 'About Us' }}
          </p>
          <h1 class="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            {{ isAr ? 'نبني مستقبل مصر حجراً حجراً' : 'Building Egypt\'s Future, Stone by Stone' }}
          </h1>
          <p class="text-gray-300 text-lg leading-relaxed">
            {{ isAr
              ? 'إيميرا للتطوير العقاري شركة رائدة تأسست على قيم الجودة والنزاهة والابتكار، وتسعى لإعادة تعريف معايير العمارة والعقارات في مصر.'
              : 'Emera Developments is a leading company founded on values of quality, integrity, and innovation — committed to redefining standards of architecture and real estate in Egypt.' }}
          </p>
        </div>
      </div>
    </section>

    <!-- Story -->
    <section class="py-16 lg:py-24 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div ref="storyText">
          <h2 class="section-title mb-4">{{ isAr ? 'قصتنا' : 'Our Story' }}</h2>
          <div class="space-y-4 text-gray-600 leading-relaxed">
            <p>
              {{ isAr
                ? 'بدأت إيميرا للتطوير العقاري في عام 2021 برؤية واضحة: بناء مجتمعات لا مجرد مبانٍ. على مدار 5 أعوام، نفّذنا أكثر من 5 مشاريع ضخمه وسلّمنا أكثر من 80 وحدة سكنية وتجارية في أرقى مناطق مصر.'
                : 'Emera Developments began in 2021 with a clear vision: to build communities, not just buildings. Over 5 years, we have delivered more than 5 landmark projects and over 80 residential and commercial units across Egypt\'s most prestigious locations.' }}
            </p>
            <p>
              {{ isAr
                ? 'فريقنا من المهندسين والمعماريين والمطورين يجمع بين الخبرة العالمية والفهم العميق للسوق المصري، مما يتيح لنا تقديم مشاريع ترقى لأعلى المعايير الدولية.'
                : 'Our team of engineers, architects, and developers combines global expertise with a deep understanding of the Egyptian market, enabling us to deliver projects that meet the highest international standards.' }}
            </p>
          </div>
        </div>
        <div ref="storyImg" class="relative">
          <img
            src="/images/projects/placeholder-1.svg"
            alt="Emera Developments"
            class="rounded-2xl w-full shadow-xl"
          />
          <div class="absolute -bottom-4 -start-4 bg-gold-500 text-white rounded-2xl p-6 shadow-lg w-40">
            <p class="text-4xl font-bold">5+</p>
            <p class="text-sm text-white/80 mt-1">{{ isAr ? 'سنة خبرة' : 'Years Experience' }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Values -->
    <section class="py-16 lg:py-24 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref="valuesHeader" class="text-center mb-12">
          <h2 class="section-title">{{ isAr ? 'قيمنا' : 'Our Values' }}</h2>
        </div>
        <div ref="valuesGrid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="v in values"
            :key="v.icon"
            class="bg-white rounded-2xl p-6 text-center shadow-sm border border-gray-100"
          >
            <div class="text-4xl mb-4">{{ v.icon }}</div>
            <h3 class="font-semibold text-gray-900 mb-2">{{ v.title }}</h3>
            <p class="text-gray-500 text-sm leading-relaxed">{{ v.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="bg-gray-950 py-16">
      <div class="max-w-4xl mx-auto px-4 text-center">
        <h2 class="font-display text-3xl font-bold text-white mb-4">
          {{ isAr ? 'تعاون معنا' : 'Partner With Us' }}
        </h2>
        <p class="text-gray-300 mb-8">
          {{ isAr ? 'سواء كنت مستثمراً أو مشترياً — نحن هنا لنساعدك.' : 'Whether you\'re an investor or a buyer — we\'re here to help.' }}
        </p>
        <NuxtLink :to="localePath('/contact')" class="inline-block px-8 py-4 bg-gold-500 text-white font-semibold rounded-full hover:bg-gold-600 transition-colors duration-200">
          {{ t('nav.contact') }}
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { initScrollAnimations, killScrollTriggers } from '~/utils/animations'

const { t, locale } = useI18n()
const localePath = useLocalePath()
const isAr = computed(() => locale.value === 'ar')

const storyText = ref<HTMLElement | null>(null)
const storyImg = ref<HTMLElement | null>(null)
const valuesHeader = ref<HTMLElement | null>(null)
const valuesGrid = ref<HTMLElement | null>(null)

const values = computed(() => isAr.value ? [
  { icon: '💎', title: 'الجودة', desc: 'لا نقبل بأقل من الامتياز في كل تفصيلة.' },
  { icon: '🤝', title: 'النزاهة', desc: 'الشفافية والأمانة في كل تعامل.' },
  { icon: '🌱', title: 'الاستدامة', desc: 'نبني بمسؤولية تجاه البيئة والمجتمع.' },
  { icon: '🚀', title: 'الابتكار', desc: 'نتبنى أحدث تقنيات البناء والتصميم.' },
] : [
  { icon: '💎', title: 'Quality', desc: 'We accept nothing less than excellence in every detail.' },
  { icon: '🤝', title: 'Integrity', desc: 'Transparency and honesty in every transaction.' },
  { icon: '🌱', title: 'Sustainability', desc: 'Building with responsibility toward our environment and community.' },
  { icon: '🚀', title: 'Innovation', desc: 'Embracing the latest construction and design technologies.' },
])

onMounted(async () => {
  await initScrollAnimations({
    fadeUp: [storyText.value, storyImg.value, valuesHeader.value].filter(Boolean) as Element[],
    stagger: [valuesGrid.value].filter(Boolean) as Element[],
  })
})

onUnmounted(killScrollTriggers)

useHead({ title: `${isAr.value ? 'عن الشركة' : 'About Us'} — Emera Developments` })
</script>
