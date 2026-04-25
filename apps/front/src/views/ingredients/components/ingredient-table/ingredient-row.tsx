import { useState } from "react";
import { Trash2, Check, X } from "lucide-react";
import { Button } from "@heroui/react/button";
import { Input } from "@heroui/react/input";
import { NumberField } from "@heroui/react/number-field";
import { Select } from "@heroui/react/select";
import { Table } from "@heroui/react/table";
import { ListBox } from "@heroui/react/list-box";
import { ListBoxItem } from "@heroui/react/list-box-item";
import type { CreateIngredient, Ingredient, Unit } from "@fc/shared";

type EditState = {
  name: string;
  unit: Unit;
  unitDisplay: string;
  fiberPerUnit: number;
  defaultQuantity: number;
};

type IngredientRowProps = {
  ingredient: Ingredient;
  onEdit: (id: string, data: CreateIngredient) => void;
  onDelete: (id: string) => void;
};

export const IngredientRow = ({
  ingredient,
  onEdit,
  onDelete,
}: IngredientRowProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValues, setEditValues] = useState<EditState | null>(null);

  const startEdit = () => {
    setIsEditing(true);
    setEditValues({
      name: ingredient.name,
      unit: ingredient.unit,
      unitDisplay: ingredient.unitDisplay ?? "",
      fiberPerUnit: ingredient.fiberPerUnit,
      defaultQuantity: ingredient.defaultQuantity,
    });
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditValues(null);
  };

  const confirmEdit = () => {
    if (!editValues) return;
    onEdit(ingredient.id, {
      name: editValues.name.trim(),
      unit: editValues.unit,
      unitDisplay: editValues.unitDisplay.trim() || null,
      fiberPerUnit: editValues.fiberPerUnit,
      defaultQuantity: editValues.defaultQuantity,
    });
    cancelEdit();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") confirmEdit();
    if (e.key === "Escape") cancelEdit();
  };

  return (
    <Table.Row
      id={ingredient.id}
      className={
        isEditing
          ? "bg-surface-secondary"
          : "group cursor-pointer transition-colors hover:bg-surface-secondary"
      }
      onAction={isEditing ? undefined : startEdit}
    >
      <Table.Cell>
        {isEditing ? (
          <Input
            autoFocus
            value={editValues!.name}
            onChange={(e) =>
              setEditValues((v) => v && { ...v, name: e.target.value })
            }
            onKeyDown={handleKeyDown}
          />
        ) : (
          <span className="font-medium">{ingredient.name}</span>
        )}
      </Table.Cell>
      <Table.Cell>
        {isEditing ? (
          <Select
            aria-label="Unité"
            selectedKey={editValues!.unit}
            onSelectionChange={(key) =>
              setEditValues((v) => v && { ...v, unit: key as Unit })
            }
          >
            <Select.Trigger>
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover>
              <ListBox>
                <ListBoxItem id="PIECE" textValue="Pièce">
                  Pièce
                </ListBoxItem>
                <ListBoxItem id="HUNDRED_G" textValue="100g">
                  100g
                </ListBoxItem>
              </ListBox>
            </Select.Popover>
          </Select>
        ) : (
          <span className="text-muted">
            {ingredient.unit === "HUNDRED_G" ? "100g" : "Pièce"}
          </span>
        )}
      </Table.Cell>
      <Table.Cell>
        {isEditing ? (
          <Input
            value={editValues!.unitDisplay}
            placeholder="—"
            onChange={(e) =>
              setEditValues((v) => v && { ...v, unitDisplay: e.target.value })
            }
            onKeyDown={handleKeyDown}
          />
        ) : (
          <span className="text-muted">{ingredient.unitDisplay ?? "—"}</span>
        )}
      </Table.Cell>
      <Table.Cell>
        {isEditing ? (
          <NumberField
            aria-label="Fibres par unité"
            value={editValues!.fiberPerUnit}
            onChange={(val) =>
              setEditValues(
                (v) => v && { ...v, fiberPerUnit: isNaN(val) ? 0 : val },
              )
            }
            minValue={0}
            step={0.1}
          >
            <NumberField.Group>
              <NumberField.DecrementButton>−</NumberField.DecrementButton>
              <NumberField.Input />
              <NumberField.IncrementButton>+</NumberField.IncrementButton>
            </NumberField.Group>
          </NumberField>
        ) : (
          <span>{ingredient.fiberPerUnit}g</span>
        )}
      </Table.Cell>
      <Table.Cell>
        {isEditing ? (
          <NumberField
            aria-label="Quantité par défaut"
            value={editValues!.defaultQuantity}
            onChange={(val) =>
              setEditValues(
                (v) => v && { ...v, defaultQuantity: isNaN(val) ? 1 : val },
              )
            }
            minValue={0.5}
            step={0.5}
          >
            <NumberField.Group>
              <NumberField.DecrementButton>−</NumberField.DecrementButton>
              <NumberField.Input />
              <NumberField.IncrementButton>+</NumberField.IncrementButton>
            </NumberField.Group>
          </NumberField>
        ) : (
          <span>{ingredient.defaultQuantity}</span>
        )}
      </Table.Cell>
      <Table.Cell>
        {isEditing ? (
          <div className="flex items-center gap-1">
            <Button
              size="sm"
              variant="ghost"
              aria-label="Confirmer"
              onPress={confirmEdit}
            >
              <Check className="h-4 w-4 text-success" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              aria-label="Annuler"
              onPress={cancelEdit}
            >
              <X className="h-4 w-4 text-muted" />
            </Button>
          </div>
        ) : (
          <div className="flex items-center justify-end gap-1 opacity-0 transition-opacity group-hover:opacity-100">
            <Button
              size="sm"
              variant="ghost"
              aria-label="Supprimer"
              onPress={() => onDelete(ingredient.id)}
            >
              <Trash2 className="h-3.5 w-3.5 text-muted" />
            </Button>
          </div>
        )}
      </Table.Cell>
    </Table.Row>
  );
};
