import { Module } from '@nestjs/common'
import { IngredientsModule } from './ingredients/ingredients.module'
import { MealsModule } from './meals/meals.module'

@Module({ imports: [MealsModule, IngredientsModule] })
export class AppModule {}
