<template>
  <div class="pt-20 min-h-screen bg-gray-50">
    <!-- Header -->
    <section class="bg-gray-950 py-16 lg:py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="font-display text-4xl sm:text-5xl font-bold text-white mb-4">{{ t('contact.title') }}</h1>
        <p class="text-gray-300 text-lg max-w-xl mx-auto">{{ t('contact.subtitle') }}</p>
      </div>
    </section>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div class="grid grid-cols-1 lg:grid-cols-5 gap-12">
        <!-- Form -->
        <div ref="formEl" class="lg:col-span-3 bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h2 class="font-display text-2xl font-semibold text-gray-900 mb-6">
            {{ isAr ? 'أرسل لنا رسالة' : 'Send Us a Message' }}
          </h2>
          <ContactForm />
        </div>

        <!-- Contact info + map -->
        <div ref="infoEl" class="lg:col-span-2 space-y-4">
          <!-- Info cards -->
          <div
            v-for="item in contactInfo"
            :key="item.label"
            class="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex gap-4 items-start"
          >
            <div class="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center shrink-0">
              <component :is="item.icon" class="w-5 h-5 text-gold-500" />
            </div>
            <div class="min-w-0">
              <p class="text-xs text-gray-500 uppercase tracking-wide mb-0.5">{{ item.label }}</p>
              <component
                :is="item.href ? 'a' : 'p'"
                v-bind="item.href ? { href: item.href, target: item.external ? '_blank' : undefined, rel: item.external ? 'noopener noreferrer' : undefined } : {}"
                class="font-medium text-gray-900 break-words"
                :class="item.href ? 'hover:text-gold-500 transition-colors duration-150' : ''"
              >
                {{ item.value }}
              </component>
            </div>
          </div>

          <!-- Google Maps embed -->
          <div class="rounded-2xl overflow-hidden shadow-sm border border-gray-100 h-52">
            <iframe
              title="Emera Developments office location"
              :src="`https://maps.google.com/maps?q=30.792874,30.990704&z=17&output=embed&hl=${locale}`"
              width="100%"
              height="100%"
              style="border:0"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              allowfullscreen
            />
          </div>

          <!-- Open in Maps link -->
          <a
            href="https://maps.google.com/?q=30.792874,30.990704"
            target="_blank"
            rel="noopener noreferrer"
            class="flex items-center justify-center gap-2 text-sm text-gold-500 hover:text-gold-600 font-medium transition-colors duration-150"
          >
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            {{ isAr ? 'فتح في خرائط جوجل' : 'Open in Google Maps' }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { initScrollAnimations, killScrollTriggers } from '~/utils/animations'

const { t, locale } = useI18n()
const isAr = computed(() => locale.value === 'ar')

const formEl = ref<HTMLElement | null>(null)
const infoEl = ref<HTMLElement | null>(null)

// SVG icon components inline
const IconPin = defineComponent({
  render: () => h('svg', { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' }, [
    h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' }),
    h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M15 11a3 3 0 11-6 0 3 3 0 016 0z' }),
  ]),
})
const IconPhone = defineComponent({
  render: () => h('svg', { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' }, [
    h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z' }),
  ]),
})
const IconMail = defineComponent({
  render: () => h('svg', { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' }, [
    h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' }),
  ]),
})
const IconWhatsApp = defineComponent({
  render: () => h('svg', { fill: 'currentColor', viewBox: '0 0 24 24' }, [
    h('path', { d: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z' }),
  ]),
})
const IconClock = defineComponent({
  render: () => h('svg', { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor' }, [
    h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' }),
  ]),
})

const contactInfo = computed(() => [
  {
    icon: IconPin,
    label: isAr.value ? 'العنوان' : 'Address',
    value: isAr.value ? 'شارع الفاتح ٢٤، طنطا، الغربية، مصر' : '24 El Fateh St, Tanta, Al Gharbiyah, Egypt',
    href: 'https://maps.google.com/?q=30.792874,30.990704',
    external: true,
  },
  {
    icon: IconPhone,
    label: isAr.value ? 'الهاتف' : 'Phone',
    value: '+2010 03144282',
    href: 'tel:+201003144282',
    external: false,
  },
  {
    icon: IconWhatsApp,
    label: 'WhatsApp',
    value: '+2010 03144282',
    href: 'https://wa.me/201003144282',
    external: true,
  },
  {
    icon: IconMail,
    label: isAr.value ? 'البريد الإلكتروني' : 'Email',
    value: 'emera.developments@gmail.com',
    href: 'mailto:emera.developments@gmail.com',
    external: false,
  },
  {
    icon: IconClock,
    label: isAr.value ? 'ساعات العمل' : 'Working Hours',
    value: isAr.value ? 'الأحد – الخميس، ٩ص – ٦م' : 'Sun – Thu, 9am – 6pm',
    href: null,
    external: false,
  },
])

onMounted(async () => {
  await initScrollAnimations({
    fadeUp: [formEl.value, infoEl.value].filter(Boolean) as Element[],
  })
})

onUnmounted(killScrollTriggers)

useHead({ title: `${t('contact.title')} — Emera Developments` })
</script>
