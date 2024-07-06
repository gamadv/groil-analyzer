import { Cuboid } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export type Equipment = {
  equipmentId: string
}

export type EquipmentsProps = {
  equipments?: Equipment[]
  selectEquip?: (equipmentId: string) => void
}

export function Equipments(props: EquipmentsProps) {
  const { equipments, selectEquip } = props
  const total = equipments?.length || 0
  return (
    <section className='flex flex-col items-start h-auto'>
      <Card>
        <CardHeader className='flex-row items-center justify-between space-y-0 pb-2 gap-2'>
          <CardTitle className='text-base font-semibold'>Equipments</CardTitle>
          <Cuboid className='h-4 w-4 text-muted-foreground' />
        </CardHeader>
        <CardContent className='space-y-1'>
          <span className='text-2xl font-bold tracking-tight'>{total}</span>
          <div className='mt-8'>
            {equipments && equipments.length > 0 ? (
              <>
                <Select onValueChange={selectEquip} defaultValue={""}>
                  <SelectTrigger className='h-8 w-[180px]'>
                    <SelectValue placeholder='Select Equipment' />
                  </SelectTrigger>
                  <SelectContent>
                    {equipments.map((equipment) => (
                      <SelectItem
                        key={equipment.equipmentId}
                        value={equipment.equipmentId}
                      >
                        {equipment.equipmentId}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </>
            ) : (
              false
            )}
          </div>
        </CardContent>
      </Card>
    </section>
  )
}
