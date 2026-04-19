import { useState } from 'react'
import { Button } from '@heroui/react/button'
import { Input } from '@heroui/react/input'

type SaveMealProps = {
    isDisabled: boolean
    onSave: (name: string) => void
}

export const SaveMeal = ({ isDisabled, onSave }: SaveMealProps) => {
    const [name, setName] = useState('')

    const handleSave = () => {
        if (!name.trim() || isDisabled) return
        onSave(name.trim())
        setName('')
    }

    return (
        <div className="flex gap-2">
            <Input
                placeholder="Nom du repas (ex : Déjeuner)…"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isDisabled}
                onKeyDown={(e) => e.key === 'Enter' && handleSave()}
            />
            <Button onPress={handleSave} isDisabled={isDisabled || !name.trim()}>
                Sauvegarder
            </Button>
        </div>
    )
}
