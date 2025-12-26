// components/admin/blocks/ImageCardListEditor.tsx

import React from "react"
import { ImageCardListBlock } from "@/lib/types/blocks"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2, ChevronDown } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { ImageUpload } from "@/components/admin/image-upload" 

type CardData = NonNullable<ImageCardListBlock["datos"]["cards"]>[number];

interface ImageCardListEditorProps {
  data: ImageCardListBlock["datos"] & { variant?: string }
  onChange: (field: keyof ImageCardListBlock["datos"] | "variant", value: any) => void
}

const defaultNewCard: CardData = {
    imagenUrl: "/placeholder.jpg",
    altTexto: "Nueva Tarjeta",
    etiqueta: "Nuevo",
    titulo: "Nueva Tarjeta Destacada",
    descripcion: "Añade una descripción aquí.",
    linkTexto: "Ver",
    linkUrl: "#"
};

const ImageCardItemEditor = ({ card, index, onCardChange, onRemove }: {
    card: CardData;
    index: number;
    onCardChange: (index: number, field: keyof CardData, value: any) => void;
    onRemove: (index: number) => void;
}) => {
    const [isOpen, setIsOpen] = React.useState(false);

    React.useEffect(() => {
        if (index === 0) setIsOpen(true)
        if (card.titulo === defaultNewCard.titulo) setIsOpen(true);
    }, [index, card.titulo]);
    
    return (
        <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800 space-y-3">
            <div 
                className="flex items-center justify-between cursor-pointer" 
                onClick={() => setIsOpen(!isOpen)}
            >
                <h4 className="text-md font-semibold text-primary truncate max-w-48">
                    {card.titulo || `Tarjeta ${index + 1}`}
                </h4>
                <div className="flex items-center gap-2">
                    <Button 
                        type="button" 
                        variant="destructive" 
                        size="icon" 
                        onClick={(e) => { e.stopPropagation(); onRemove(index); }}
                        className="w-8 h-8"
                    >
                        <Trash2 className="w-4 h-4" />
                    </Button>
                    <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : 'rotate-0'}`} />
                </div>
            </div>

            {isOpen && (
                <div className="space-y-4 pt-3">
                    <Separator />
                    
                    <div className="space-y-2">
                        <Label>Imagen</Label>
                        <ImageUpload 
                            value={card.imagenUrl || ""} 
                            onChange={(url) => onCardChange(index, "imagenUrl", url)} 
                        />
                        <Input
                            value={card.altTexto || ""}
                            onChange={(e) => onCardChange(index, "altTexto", e.target.value)}
                            placeholder="Texto alternativo (Alt)"
                        />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Etiqueta</Label>
                            <Input
                                value={card.etiqueta || ""}
                                onChange={(e) => onCardChange(index, "etiqueta", e.target.value)}
                                placeholder="Ej: Residencial"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Título</Label>
                            <Input
                                value={card.titulo || ""}
                                onChange={(e) => onCardChange(index, "titulo", e.target.value)}
                                placeholder="Ej: Hogares Verdes"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Descripción</Label>
                        <Textarea
                            value={card.descripcion || ""}
                            onChange={(e) => onCardChange(index, "descripcion", e.target.value)}
                            placeholder="Texto descriptivo de la tarjeta"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Texto del Enlace</Label>
                            <Input
                                value={card.linkTexto || ""}
                                onChange={(e) => onCardChange(index, "linkTexto", e.target.value)}
                                placeholder="Ej: Ver más"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>URL del Enlace</Label>
                            <Input
                                value={card.linkUrl || ""}
                                onChange={(e) => onCardChange(index, "linkUrl", e.target.value)}
                                placeholder="/proyectos"
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export function ImageCardListEditor({ data, onChange }: ImageCardListEditorProps) {
    
    const handleDataChange = (field: keyof ImageCardListBlock["datos"], value: any) => {
        onChange(field, value);
    };

    const handleCardChange = (index: number, field: keyof CardData, value: any) => {
        const currentCards = Array.isArray(data.cards) ? data.cards : [];
        
        const newCards = currentCards.map((card, i) => {
            if (i === index) {
                return { ...card, [field]: value };
            }
            return card;
        });
        
        handleDataChange("cards", newCards);
    };

    const handleAddCard = () => {
        const existingCards = Array.isArray(data.cards) ? data.cards : [];
        handleDataChange("cards", [...existingCards, defaultNewCard]);
    };

    const handleRemoveCard = (index: number) => {
        const currentCards = Array.isArray(data.cards) ? data.cards : [];
        const newCards = currentCards.filter((_, i) => i !== index);
        handleDataChange("cards", newCards);
    };

    return (
        <div className="space-y-6 p-4">
            <h3 className="text-lg font-semibold">Configuración de la Lista de Tarjetas</h3>
            
            <div className="space-y-2">
                <Label htmlFor="titulo">Título de la Sección</Label>
                <Input
                    id="titulo"
                    value={data.titulo || ""}
                    onChange={(e) => handleDataChange("titulo", e.target.value)}
                    placeholder="Ej: Proyectos Finalizados"
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="subtitulo">Subtítulo</Label>
                <Input
                    id="subtitulo"
                    value={data.subtitulo || ""}
                    onChange={(e) => handleDataChange("subtitulo", e.target.value)}
                    placeholder="Ej: Una mirada a nuestras construcciones."
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="columnas">Número de Columnas</Label>
                <Select 
                    value={String(data.columnas || 3)} 
                    onValueChange={(value) => handleDataChange("columnas", parseInt(value))}
                >
                    <SelectTrigger id="columnas" className="w-48">
                        <SelectValue placeholder="Selecciona columnas" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="2">2 Columnas (Muy amplio)</SelectItem>
                        <SelectItem value="3">3 Columnas (Estándar)</SelectItem>
                        <SelectItem value="4">4 Columnas (Compacto)</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <Separator />

            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <h4 className="font-semibold">Tarjetas ({(data.cards || []).length})</h4>
                </div>
                
                {(data.cards || []).map((card, index) => (
                    <ImageCardItemEditor
                        key={index}
                        card={card}
                        index={index}
                        onCardChange={handleCardChange}
                        onRemove={handleRemoveCard}
                    />
                ))}
                
                <Button type="button" onClick={handleAddCard} className="w-full" variant="outline">
                    <Plus className="w-4 h-4 mr-2" /> Agregar Tarjeta
                </Button>
            </div>
        </div>
    );
}