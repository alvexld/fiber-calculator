import { Card } from '@heroui/react/card'

type FiberKpiProps = {
  totalFiberGrams: number
}

export const FiberKpi = ({ totalFiberGrams }: FiberKpiProps) => (
  <Card>
    <Card.Header>
      <Card.Title>Fibres totales</Card.Title>
      <Card.Description>Somme de tous les ingrédients du menu</Card.Description>
    </Card.Header>
    <Card.Content>
      <p className="text-4xl font-bold tabular-nums">
        {totalFiberGrams.toFixed(1)}
        <span className="ml-2 text-lg font-normal text-gray-500">g de fibres</span>
      </p>
    </Card.Content>
  </Card>
)
