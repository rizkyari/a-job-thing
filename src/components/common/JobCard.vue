<template>
    <Card class="shadow-sm">
        <div class="">
            <div class="flex-1">
                <div class="p-4 flex flex-wrap items-center gap-x-3 gap-y-1">
                    <div class="h-10 w-10 rounded-tl-2xl rounded-br-2xl bg-emerald-500 text-white flex items-center justify-center font-bold overflow-hidden">
                        <img v-if="job.company?.logo" :src="job.company.logo" alt="company-logo.jpg" class="h-full w-full object-contain" loading="lazy" />
                        <span v-else>{{ job.company?.name?.[0] ?? '-' }}</span>
                    </div>
                    <div>
                        <h3 class="font-semibold">
                            {{ job.title }}
                        </h3>
                        <p class="text-sm text-gray-600 mt-0.5">
                            {{ job.company?.name }}
                        </p>
                    </div>
                </div>
                <div class="pl-4 pr-4 mt-2 grid grid-cols-2 gap-4 text-sm text-gray-700">
                    <span class="inline-flex items-center gap-1">
                        <img :src='IconMoney' alt="money-icon.svg" class="h-4 w-4" aria-hidden="true"/>
                        {{ job.salary?.currency ?? 'RM' }}{{ job.salary?.min ?? '—' }} - {{ job.salary?.max ?? '—' }}
                    </span>
                    <span class="inline-flex items-center gap-1">
                        <img :src='BriefCase' alt="briefcase.svg" class="h-4 w-4" aria-hidden="true"/>
                        {{ job.job_type || 'Full Time' }}
                    </span>
                </div>
                <span class="pl-4 pr-4 inline-flex items-center gap-1">
                    <img :src='PinLocation' alt="pin-location.svg" class="h-4 w-4" aria-hidden="true"/>
                    {{ job.location?.state || job.location?.city }}
                </span>

                <p class="pl-4 pr-4 mt-3 line-clamp-2 text-sm text-gray-600">
                    {{ job.descriptions?.requirements || job.descriptions?.reponsibilities || '' }}
                </p>

                <div class="mt-3 pt-1 pb-1 grid grid-cols-2 items-center gap-4 text-sm border-t-4 border-brand-bg">
                    <Button variant="ghost" class="hover:bg-red-50"><img :src="Heart" class="h-4 w-4 mr-2"/>{{ t('filters.save') }}</Button>
                    <Button variant="ghost" class="hover:bg-gray-50" @click="$router.push(`/jobs/${job.id}`)"><img :src="Download" class="h-4 w-4 mr-2"/>{{ t('filters.apply') }}</Button>
                </div> 
            </div>
        </div>
    </Card>
</template>

<script setup lang="ts">
import Card from '@/components/ui/Card.vue'
import Button from '@/components/ui/Button.vue'
import type { Job } from '@/types/job'
import { useI18n } from 'vue-i18n';

import IconMoney from '@/assets/icons/money.svg'
import PinLocation from '@/assets/icons/location.svg'
import BriefCase from '@/assets/icons/briefcase.svg'
import Heart from '@/assets/icons/heart.svg'
import Download from '@/assets/icons/downloads.svg'

defineProps<{ job: Job }>()
const { t } = useI18n()
</script>

