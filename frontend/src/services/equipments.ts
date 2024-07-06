import { Equipment } from '@/pages/app/dashboard/equipments'
import { api } from './api'
import { AverageChartData } from '@/pages/app/dashboard/averageValue-chart'

export function getEquipments() {
  return api.get<Equipment[]>('/equipments')
}

export function getEquipmentsReadingsAverage(equipmentId: string) {
  return api.get<AverageChartData[]>(
    `/statistics/equipment?equipmentId=${equipmentId}`,
  )
}
