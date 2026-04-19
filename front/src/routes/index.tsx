import { createFileRoute } from '@tanstack/react-router'
import { MenuCalculatorView } from '../views/menu-calculator/menu-calculator.view'

export const Route = createFileRoute('/')({
  component: MenuCalculatorView,
})
