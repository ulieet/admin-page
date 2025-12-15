// components/admin/blocks/ImageCardListEditor.tsx

import React from "react"
import { ImageCardListBlock, ImageCardBlock } from "@/lib/types/blocks"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Trash2, ChevronDown } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { ImageUpload } from "@/components/admin/image-upload" 

interface ImageCardListEditorProps {
  data: ImageCardListBlock["datos"] & { variant?: string }
  onChange: (field: keyof ImageCardListBlock["datos"] | "variant", value: any) => void
}

const defaultNewCard: ImageCardBlock["datos"] = {
    imagenUrl: "/placeholder.jpg",
    altTexto: "Nueva Tarjeta",
    etiqueta: "Nuevo",
    titulo: "Nueva Tarjeta Destacada",
    descripcion: "Añade una descripción aquí.",
    linkTexto: "Ver",
    linkUrl: "#"
};


const ImageCardItemEditor = ({ card, index, onCardChange, onRemove }: {
    card: ImageCardBlock["datos"];
    index: number;
    onCardChange: (index: number, field: keyof ImageCardBlock["datos"], value: any) => void;
    onRemove: (index: number) => void;
}) => {
    const [isOpen, setIsOpen] = React.useState(false);

    React.useEffect(() => {
        if (index === 0) setIsOpen(true)
        if (index > 0 && card.titulo === defaultNewCard.titulo) setIsOpen(true);
    }, [index, card.titulo]);
    

    return (
        <div className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-800 space-y-3">
            <div 
                className="flex items-center justify-between cursor-pointer" 
                onClick={() => setIsOpen(!isOpen)}
            >
                <h4 className="text-md font-semibold text-primary">{card.titulo || `Tarjeta ${index + 1}`}</h4>
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
                    
                    {/* Imagen */}
                    <div className="space-y-2">
                        <Label>Imagen</Label>
                        <ImageUpload 
                            value={card.imagenUrl} 
                            onChange={(url) => onCardChange(index, "imagenUrl", url)} 
                            placeholder="URL de la imagen"
                        />
                        <Input
                            value={card.altTexto || ""}
                            onChange={(e) => onCardChange(index, "altTexto", e.target.value)}
                            placeholder="Texto alternativo (Alt)"
                        />
                    </div>
                    
                    {/* Etiqueta y Título */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Etiqueta</Label>
                            <Input
                                value={card.etiqueta}
                                onChange={(e) => onCardChange(index, "etiqueta", e.target.value)}
                                placeholder="Ej: Residential"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Título</Label>
                            <Input
                                value={card.titulo}
                                onChange={(e) => onCardChange(index, "titulo", e.target.value)}
                                placeholder="Ej: Hogares Veres"
                            />
                        </div>
                    </div>

                    {/* Descripción */}
                    <div className="space-y-2">
                        <Label>Descripción</Label>
                        <Textarea
                            value={card.descripcion}
                            onChange={(e) => onCardChange(index, "descripcion", e.target.value)}
                            placeholder="Texto descriptivo de la tarjeta"
                        />
                    </div>

                    {/* Link */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Texto del Enlace</Label>
                            <Input
                                value={card.linkTexto}
                                onChange={(e) => onCardChange(index, "linkTexto", e.target.value)}
                                placeholder="Ej: Explorar proyectos"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>URL del Enlace</Label>
                            <Input
                                value={card.linkUrl}
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

    const handleCardChange = (index: number, field: keyof ImageCardBlock["datos"], value: any) => {
        if (!Array.isArray(data.cards)) return;

        const newCards = data.cards.map((card, i) => {
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
        if (!Array.isArray(data.cards)) return;
        
        const newCards = data.cards.filter((_, i) => i !== index);
        handleDataChange("cards", newCards);
    };

    return (
        <div className="space-y-6 p-4">
            <h3 className="text-lg font-semibold">Configuración de la Lista de Tarjetas</h3>
            
            {/* Título y Subtítulo */}
            <div className="space-y-2">
                <Label htmlFor="titulo">Título de la Sección</Label>
                <Input
                    id="titulo"
                    value={data.titulo}
                    onChange={(e) => handleDataChange("titulo", e.target.value)}
                    placeholder="Ej: Proyectos Finalizados"
                />
            </div>
            <div className="space-y-2">
                <Label htmlFor="subtitulo">Subtítulo</Label>
                <Input
                    id="subtitulo"
                    value={data.subtitulo}
                    onChange={(e) => handleDataChange("subtitulo", e.target.value)}
                    placeholder="Ej: Una mirada a nuestras construcciones más recientes."
                />
            </div>

            {/* Selector de Columnas */}
            <div className="space-y-2">
                <Label htmlFor="columnas">Número de Columnas</Label>
                <Select 
                    value={String(data.columnas || 3)} 
                    onValueChange={(value) => handleDataChange("columnas", parseInt(value) as 3 | 4)}
                >
                    <SelectTrigger id="columnas" className="w-[180px]">
                        <SelectValue placeholder="Selecciona columnas" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="3">3 Columnas (Espacioso)</SelectItem>
                        <SelectItem value="4">4 Columnas (Compacto)</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <Separator />

            {/* Editor de Tarjetas Individuales */}
            <div className="space-y-4">
                <h4 className="font-semibold">Tarjetas ({data.cards?.length || 0})</h4>
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