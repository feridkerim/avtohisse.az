"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

// DND Kit Importları
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// Tip təyinləri
type ImageFile = {
  id: string;
  file: File;
  preview: string;
  rotation: number;
};

// Sürüşdürülə bilən tək şəkil komponenti
function SortablePhoto({
  image,
  index,
  onDelete,
  onRotate,
}: {
  image: ImageFile;
  index: number;
  onDelete: (id: string) => void;
  onRotate: (id: string) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: image.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 20 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "relative aspect-square rounded-xl overflow-hidden border-2 group touch-none bg-slate-100",
        isDragging
          ? "border-red-500 opacity-50 shadow-2xl"
          : "border-slate-200",
      )}
    >
      {/* Şəkil və Fırlanma Animasiyası */}
      <div
        className="relative w-full h-full transition-transform duration-300 ease-in-out"
        style={{ transform: `rotate(${image.rotation}deg)` }}
      >
        <Image
          src={image.preview}
          alt={`Upload ${index + 1}`}
          fill
          className="object-cover"
          unoptimized // Blob URL-lər üçün Next.js optimizasiyasını keçmək olar
        />
      </div>

      {/* Sürüşdürmə sahəsi (Handle) */}
      <div
        {...attributes}
        {...listeners}
        className="absolute inset-0 cursor-move"
      />

      {/* İdarəetmə Düymələri */}
      <div className="absolute top-1 right-1 flex gap-1 z-30 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          type="button"
          onClick={() => onRotate(image.id)}
          className="bg-white/90 text-slate-700 rounded-full p-1.5 hover:bg-white shadow-sm transition-colors"
        >
          <Icon icon="ph:arrow-clockwise-bold" className="text-sm" />
        </button>

        <button
          type="button"
          onClick={() => onDelete(image.id)}
          className="bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 shadow-sm transition-colors"
        >
          <Icon icon="ph:x-bold" className="text-sm" />
        </button>
      </div>

      {/* İndeks Badge */}
      <div className="absolute top-1 left-1 bg-slate-900/70 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold z-10">
        {index + 1}
      </div>
    </div>
  );
}

export function ImageUpload() {
  const [images, setImages] = useState<ImageFile[]>([]);

  // 1. Hook-lar mütləq şərtsiz və ən yuxarıda olmalıdır
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  // Hydration mismatch-in qarşısını almaq üçün effekt

  // 2. Funksiyalar
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newImages = files.map((file) => ({
      id: crypto.randomUUID(), // Math.random() yerinə daha etibarlı ID
      file,
      preview: URL.createObjectURL(file),
      rotation: 0,
    }));
    setImages((prev) => [...prev, ...newImages]);
  };

  const handleDelete = (id: string) => {
    setImages((prev) => {
      const target = prev.find((img) => img.id === id);
      if (target) URL.revokeObjectURL(target.preview); // Yaddaş təmizliyi
      return prev.filter((img) => img.id !== id);
    });
  };

  const handleRotate = (id: string) => {
    setImages((prev) =>
      prev.map((img) =>
        img.id === id ? { ...img, rotation: img.rotation + 90 } : img,
      ),
    );
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setImages((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  // 3. Əgər hələ mount olmayıbsa (Server tərəfidirsə), render etmə

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label className="font-bold text-orange-600 flex items-center gap-1">
          <Icon icon="ph:info-bold" /> Foto İpucu
        </Label>
        <div className="text-xs text-slate-500 bg-orange-50 p-3 rounded-xl border border-orange-100">
          Hissənin hər iki tərəfini və üzərindəki <b>kodu</b> mütləq çəkin.
        </div>
      </div>

      {/* Yükləmə Sahəsi */}
      <label className="h-32 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center border-slate-200 hover:border-red-500 cursor-pointer transition-all bg-slate-50 hover:bg-slate-100 group">
        <Icon
          icon="ph:camera-plus-bold"
          className="text-3xl text-slate-300 group-hover:text-red-400 transition-colors"
        />
        <p className="text-xs text-slate-400 mt-2">
          Şəkil yükləmək üçün klikləyin
        </p>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileSelect}
          className="hidden"
        />
      </label>

      {/* Şəkil Qalereyası */}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={images.map((i) => i.id)}
          strategy={rectSortingStrategy}
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {images.map((image, index) => (
              <SortablePhoto
                key={image.id}
                image={image}
                index={index}
                onDelete={handleDelete}
                onRotate={handleRotate}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
