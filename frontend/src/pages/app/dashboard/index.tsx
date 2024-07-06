import { useCallback, useEffect, useState } from 'react'
import { Equipments } from './equipments'
import {
  getEquipments,
  getEquipmentsReadingsAverage,
} from '@/services/equipments'
import { useOnMount } from '@/hooks/useEffectHacks'
import { AverageChartData, StatisticsChart } from './averageValue-chart'

type Equipment = {
  equipmentId: string
}

export function Dashboard() {
  const [fetchedEquipments, setFetchedEquipments] = useState<Equipment[]>([])
  const [chartAverageDate, setChartAverageDate] = useState<AverageChartData[]>([])

  const handleFetchSensorReading = useCallback(
    async (equipmentId: string) => {
      if (!equipmentId) return
      const { data: equipmentAverageData } = await getEquipmentsReadingsAverage(equipmentId)
      setChartAverageDate(equipmentAverageData)
    },
    [],
  )

  async function fetchEquipments() {
    const { data: equipmentsData } = await getEquipments()
    setFetchedEquipments(equipmentsData)
  }

  useOnMount(() => {
    fetchEquipments()
  })

  useEffect(() => {
    handleFetchSensorReading("")
  }, [handleFetchSensorReading])
  return (
    <>
      <div className='flex flex-col gap-4'>
        <h1 className='text-3xl font-bold tracking-tight'>Dashboard</h1>

        <div className='flex w-full gap-4'>
          <Equipments
            equipments={fetchedEquipments}
            selectEquip={handleFetchSensorReading}
          />
          <StatisticsChart averages={chartAverageDate}/>
        </div>
      </div>
    </>
  )
}
