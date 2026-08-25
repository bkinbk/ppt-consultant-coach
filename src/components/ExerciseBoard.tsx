"use client";

import { useState, useTransition } from "react";
import { ExerciseData } from "@/content/types";
import { submitExercise } from "@/lib/actions";

const CANVAS_H = 56.25;

function pctH(v: number) {
  return (v / CANVAS_H) * 100;
}

export function ExerciseBoard({
  exerciseSlug,
  data,
  explanation,
}: {
  exerciseSlug: string;
  data: ExerciseData;
  explanation: string;
}) {
  const [placement, setPlacement] = useState<Record<string, string | null>>(() =>
    Object.fromEntries(data.chips.map((c) => [c.id, null]))
  );
  const [selectedChip, setSelectedChip] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);
  const [isPending, startTransition] = useTransition();

  const allPlaced = data.chips.every((c) => placement[c.id] !== null);
  const allCorrect = data.chips.every((c) => placement[c.id] === c.correctZoneId);

  function placeChip(chipId: string, zoneId: string | null) {
    if (checked) return;
    setPlacement((p) => ({ ...p, [chipId]: zoneId }));
    setSelectedChip(null);
  }

  function handleChipClick(chipId: string) {
    if (checked) return;
    setSelectedChip((cur) => (cur === chipId ? null : chipId));
  }

  function handleZoneClick(zoneId: string) {
    if (checked) return;
    if (selectedChip) {
      placeChip(selectedChip, zoneId);
      return;
    }
    // If the zone already holds a chip, clicking it sends that chip back to the tray.
    const occupant = data.chips.find((c) => placement[c.id] === zoneId);
    if (occupant) placeChip(occupant.id, null);
  }

  function handleDrop(zoneId: string | null, e: React.DragEvent) {
    e.preventDefault();
    const chipId = e.dataTransfer.getData("text/plain");
    if (chipId) placeChip(chipId, zoneId);
  }

  function handleCheck() {
    setChecked(true);
    startTransition(async () => {
      await submitExercise(exerciseSlug, allCorrect);
    });
  }

  function handleReset() {
    setPlacement(Object.fromEntries(data.chips.map((c) => [c.id, null])));
    setSelectedChip(null);
    setChecked(false);
  }

  function chipStyle(chipId: string, isInZone: boolean) {
    const base = "text-sm px-3 py-2 rounded-md border cursor-pointer transition-colors select-none";
    if (checked) {
      const chip = data.chips.find((c) => c.id === chipId)!;
      const correct = placement[chipId] === chip.correctZoneId;
      return `${base} ${correct ? "border-good bg-good/10 text-good" : "border-bad bg-bad/10 text-bad"} cursor-default`;
    }
    if (selectedChip === chipId) return `${base} border-brand bg-brand text-brand-foreground`;
    return `${base} ${isInZone ? "border-brand bg-background" : "border-border bg-surface hover:border-brand"}`;
  }

  const tray = data.chips.filter((c) => placement[c.id] === null);

  return (
    <div className="flex flex-col gap-5">
      <div>
        <p className="text-xs font-semibold text-muted mb-2">
          ชิ้นส่วนที่เหลือ ({tray.length}) — คลิกเพื่อเลือก แล้วคลิกโซนที่ต้องการวาง หรือลากไปวางได้เลย
        </p>
        <div className="flex flex-wrap gap-2 min-h-12 rounded-lg border border-dashed border-border p-3">
          {tray.length === 0 && <p className="text-sm text-muted">วางครบทุกชิ้นแล้ว</p>}
          {tray.map((chip) => (
            <div
              key={chip.id}
              draggable
              onDragStart={(e) => e.dataTransfer.setData("text/plain", chip.id)}
              onClick={() => handleChipClick(chip.id)}
              className={chipStyle(chip.id, false)}
            >
              {chip.label}
            </div>
          ))}
        </div>
      </div>

      {data.layout === "canvas" ? (
        <div
          className="w-full aspect-video bg-background border border-border rounded-lg relative overflow-hidden"
          onDragOver={(e) => e.preventDefault()}
        >
          {data.axisLabels?.map((a, i) => (
            <span
              key={i}
              className="absolute text-[9px] font-medium text-muted pointer-events-none"
              style={{ left: `${a.x}%`, top: `${pctH(a.y)}%`, width: a.w ? `${a.w}%` : undefined }}
            >
              {a.label}
            </span>
          ))}
          {data.zones.map((zone) => {
            const occupant = data.chips.find((c) => placement[c.id] === zone.id);
            return (
              <div
                key={zone.id}
                onClick={() => handleZoneClick(zone.id)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleDrop(zone.id, e)}
                className="absolute border-2 border-dashed border-muted rounded-md flex flex-col items-center justify-center gap-1 p-1 text-center cursor-pointer"
                style={{
                  left: `${zone.x}%`,
                  top: `${pctH(zone.y ?? 0)}%`,
                  width: `${zone.w}%`,
                  height: `${pctH(zone.h ?? 0)}%`,
                }}
              >
                {(checked || zone.alwaysShowLabel) && (
                  <span className="text-[9px] text-muted absolute top-1 left-1">{zone.label}</span>
                )}
                {occupant && (
                  <div
                    draggable
                    onDragStart={(e) => e.dataTransfer.setData("text/plain", occupant.id)}
                    className={`${chipStyle(occupant.id, true)} text-[10px] mt-3`}
                  >
                    {occupant.label}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : data.layout === "row" ? (
        <div className="flex gap-3">
          {data.zones.map((zone) => {
            const occupant = data.chips.find((c) => placement[c.id] === zone.id);
            return (
              <div
                key={zone.id}
                onClick={() => handleZoneClick(zone.id)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleDrop(zone.id, e)}
                className="flex-1 min-h-24 border-2 border-dashed border-muted rounded-md p-2 flex flex-col items-center justify-center gap-2 cursor-pointer"
              >
                <span className="text-[11px] text-muted">{zone.label}</span>
                {occupant && (
                  <div
                    draggable
                    onDragStart={(e) => e.dataTransfer.setData("text/plain", occupant.id)}
                    className={chipStyle(occupant.id, true)}
                  >
                    {occupant.label}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {data.zones.map((zone) => {
            const occupant = data.chips.find((c) => placement[c.id] === zone.id);
            return (
              <div
                key={zone.id}
                onClick={() => handleZoneClick(zone.id)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleDrop(zone.id, e)}
                className="flex items-center gap-3 border-2 border-dashed border-muted rounded-md p-2 cursor-pointer"
              >
                <span className="text-sm font-medium w-40 shrink-0">{zone.label}</span>
                <div className="flex-1 min-h-10 flex items-center">
                  {occupant && (
                    <div
                      draggable
                      onDragStart={(e) => e.dataTransfer.setData("text/plain", occupant.id)}
                      className={chipStyle(occupant.id, true)}
                    >
                      {occupant.label}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {!checked ? (
        <button
          disabled={!allPlaced || isPending}
          onClick={handleCheck}
          className="px-4 py-2 rounded-md bg-brand text-brand-foreground text-sm font-medium hover:opacity-90 disabled:opacity-40 w-fit"
        >
          ตรวจคำตอบ
        </button>
      ) : (
        <div className="rounded-3xl bg-surface shadow-sm p-5 flex flex-col gap-3">
          <p className={`font-semibold ${allCorrect ? "text-good" : "text-bad"}`}>
            {allCorrect ? "ถูกต้องทั้งหมด!" : "ยังไม่ถูกทั้งหมด ลองดูคำอธิบายด้านล่าง"}
          </p>
          <p className="text-sm text-muted">{explanation}</p>
          <button
            onClick={handleReset}
            className="px-4 py-2 rounded-md border border-brand text-brand text-sm font-medium hover:bg-background w-fit"
          >
            ลองใหม่
          </button>
        </div>
      )}
    </div>
  );
}
