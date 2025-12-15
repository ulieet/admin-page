// components/admin/color-picker.tsx

import React from 'react';
import { Input } from '@/components/ui/input';

interface ColorPickerProps {
    value: string;
    onChange: (color: string) => void;
    className?: string;
}

export default function ColorPicker({ value, onChange, className }: ColorPickerProps) {
    return (
        <div className="flex gap-2 items-center">
            {/* Input de color visual */}
            <input
                type="color"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-8 h-8 p-0 border-none rounded-md cursor-pointer overflow-hidden"
                style={{ background: 'transparent' }}
            />
            {/* Input de texto para código HEX */}
            <Input
                value={value.toUpperCase()}
                onChange={(e) => {
                    // Permite códigos HEX válidos o código parcial
                    const newValue = e.target.value;
                    if (newValue.match(/^#?([0-9A-F]{1,6})$/i) || newValue === '#') {
                        onChange(newValue);
                    }
                }}
                maxLength={7}
                className="w-32 font-mono text-xs"
            />
        </div>
    );
}