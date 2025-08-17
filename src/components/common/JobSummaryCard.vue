<template>
    <div>
        <div class="h-50 w-full rounded-2xl bg-brand-muted/30 overflow-hidden">
            <img
            v-if="job?.company?.logo"
            :src="job.company.logo"
            alt="company-logo.jpg"
            class="w-full h-full object-contain"
            loading="lazy"
            />
        </div>

        <Card class="-mt-5 relative z-10">
            <div class="p-4">
                <div class="flex items-start gap-3">
                    <div class="h-12 w-14 rounded-tl-2xl rounded-br-2xl bg-emerald-500 text-white flex items-center justify-center font-bold overflow-hidden">
                        <img v-if="job?.company?.logo" :src="job.company.logo" alt="company-logo.jpg" class="h-full w-full object-contain" />
                        <span v-else>{{ job?.company?.name?.[0] ?? '-' }}</span>
                    </div>

                    <div class="flex-1">
                        <h1 class="text-xl font-semibold">{{ job?.title }}</h1>
                        <p class="text-sm text-gray-600">{{ job?.company?.name }}</p>

                        <div class="mt-4 grid grid-cols-2 gap-4 text-sm text-gray-700">
                            <span class="inline-flex items-center gap-1">
                                <img :src="IconMoney" alt="" class="h-4 w-4" aria-hidden="true" />
                                {{ job?.salary?.currency ?? 'RM' }}{{ job?.salary?.min ?? '—' }} - {{ job?.salary?.max ?? '—' }}
                            </span>
                            <span class="inline-flex items-center gap-1">
                                <img :src="BriefCase" alt="" class="h-4 w-4" aria-hidden="true" />
                                {{ job.job_type || 'Full Time' }}
                            </span>
                        </div>
                        <div class="mt-2 grid grid-flow-col auto-cols-fr gap-4 text-sm text-gray-700">
                            <span class="inline-flex items-center gap-1">
                                <img :src="PinLocation" alt="" class="h-4 w-4" aria-hidden="true" />
                                {{ job?.location?.state || job?.location?.city }}
                            </span>
                            <span class="inline-flex items-center gap-1">
                                <img :src="Share" alt="" class="h-4 w-4" aria-hidden="true" />
                                {{ t('common.share') }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        
            <div class="mt-3 pt-1 pb-1 grid grid-cols-2 items-center gap-4 text-sm border-t-4 border-brand-bg">
                <Button variant="ghost" class="hover:bg-red-50"><img :src="Heart" class="h-4 w-4 mr-2"/>{{ t('filters.save') }}</Button>
                <Button variant="ghost" class="hover:bg-gray-50"><img :src="Download" class="h-4 w-4 mr-2"/>{{ t('filters.apply') }}</Button>
            </div> 
        </Card>
    </div>
</template>

<script setup lang="ts">
import Card from '@/components/ui/Card.vue'
import Button from '@/components/ui/Button.vue'
import type { Job } from '@/types/job'
import IconMoney from '@/assets/icons/money.svg'
import PinLocation from '@/assets/icons/location.svg'
import BriefCase from '@/assets/icons/briefcase.svg'
import Heart from '@/assets/icons/heart.svg'
import Download from '@/assets/icons/downloads.svg'
import Share from '@/assets/icons/share.svg'
import { useI18n } from 'vue-i18n';

const { t } = useI18n()

defineProps<{ job: Job }>()
</script>