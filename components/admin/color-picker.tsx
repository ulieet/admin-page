import React from 'react';
import { Input } from '@/components/ui/input';

interface ColorPickerProps {
    value?: string; // Hacemos opcional el valor para evitar crashes
    onChange: (color: string) => void;
    className?: string;
}

export default function ColorPicker({ value, onChange, className }: ColorPickerProps) {
    // Si el valor es undefined, nulo o vacío, usamos blanco por defecto
    const safeValue = value || "#ffffff";

    return (
        <div className="flex gap-2 items-center">
            <input
                type="color"
                value={safeValue}
                onChange={(e) => onChange(e.target.value)}
                className="w-8 h-8 p-0 border-none rounded-md cursor-pointer overflow-hidden"
                style={{ background: 'transparent' }}
            />
            <Input
                value={safeValue.toUpperCase()}
                onChange={(e) => {
                    const newValue = e.target.value;
                    if (newValue.match(/^#?([0-9A-F]{1,6})$/i) || newValue === '#') {
                        onChange(newValue);
                    }
                }}
                maxLength={7}
                className="w-28 font-mono text-xs uppercase"
            />
        </div>
    );
}